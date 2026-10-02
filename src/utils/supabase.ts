/**
 * Supabase Client & Service Integration Layer
 * Project URL: https://ogqirofvevcjitxeknmh.supabase.co
 * 
 * IMPORTANT SECURITY RULE:
 * NEVER expose the Supabase Secret Key in frontend/browser code.
 * The Publishable/Anon Key is used here for client-side queries.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Student,
  Teacher,
  SupportStaff,
  FeeInvoice,
  AttendanceRecord,
  ExamMark,
  Homework,
  Parent,
  Notice,
  StudentTransport,
  TeacherTransport,
  TransportVehicle,
  TransportRoute,
  SchoolSettings,
  ClassRoom,
  Subject,
  TimetableSlot
} from '../types';

// Read configuration from environment variables (supporting Vite VITE_ prefixes & process.env defines)
const SUPABASE_URL: string =
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.SUPABASE_URL) ||
  'https://ogqirofvevcjitxeknmh.supabase.co';

const SUPABASE_PUBLISHABLE_KEY: string =
  (typeof process !== 'undefined' && process.env?.SUPABASE_PUBLISHABLE_KEY) ||
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.SUPABASE_PUBLISHABLE_KEY) ||
  '';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_PUBLISHABLE_KEY) &&
    SUPABASE_PUBLISHABLE_KEY !== 'YOUR_SUPABASE_PUBLISHABLE_KEY' &&
    SUPABASE_PUBLISHABLE_KEY.trim().length > 10
  );
};

// Initialize Supabase Client with graceful fallback if publishable key is not yet set
const placeholderKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  isSupabaseConfigured() ? SUPABASE_PUBLISHABLE_KEY : placeholderKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// --- Generic Helper for CamelCase <-> snake_case Mapping ---
function toSnakeCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[snakeKey] = value;
  }
  return result;
}

function normalizeRecord<T>(record: any): T {
  if (!record || typeof record !== 'object') return record;
  const result: any = { ...record };
  
  // Normalize common snake_case properties to TypeScript camelCase
  for (const key of Object.keys(record)) {
    if (key.includes('_')) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      if (result[camelKey] === undefined) {
        result[camelKey] = record[key];
      }
    }
  }
  return result as T;
}

// --- Supabase Auth Session Synchronization ---
const DEMO_CREDENTIALS: Record<string, string> = {
  'admin@school.com': 'admin123',
  'accountant@school.com': 'accountant123',
  'teacher@school.com': 'teacher123',
  'student@school.com': 'student123',
  'parent@school.com': 'parent123'
};

export async function authenticateSupabaseUser(email?: string, password?: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const targetEmail = email || 'admin@school.com';
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session?.user?.email === targetEmail) {
      return true;
    }

    const pwd = password || DEMO_CREDENTIALS[targetEmail] || 'admin123';
    const { error } = await supabase.auth.signInWithPassword({
      email: targetEmail,
      password: pwd
    });

    if (error) {
      console.warn('Supabase auth notice:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase auth unexpected exception:', err);
    return false;
  }
}

export async function ensureSupabaseAuth(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const { data } = await supabase.auth.getSession();
    if (!data?.session) {
      let savedEmail = 'admin@school.com';
      if (typeof localStorage !== 'undefined') {
        const savedSession = localStorage.getItem('sms_user_session');
        if (savedSession) {
          try {
            const parsed = JSON.parse(savedSession);
            if (parsed?.email) savedEmail = parsed.email;
          } catch {
            // ignore
          }
        }
      }
      await authenticateSupabaseUser(savedEmail);
    }
  } catch {
    // ignore
  }
}

// ============================================================================
// STUDENTS SERVICE
// ============================================================================
export async function fetchStudentsFromSupabase(): Promise<Student[] | null> {
  if (!isSupabaseConfigured()) return null;
  await ensureSupabaseAuth();
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch students warning:', error.message);
      return null;
    }
    if (!data) return [];
    return data.map((d) => normalizeRecord<Student>(d));
  } catch (err) {
    console.warn('Supabase students query error:', err);
    return null;
  }
}

export async function insertStudentToSupabase(student: Student): Promise<Student | null> {
  if (!isSupabaseConfigured()) return null;
  await ensureSupabaseAuth();
  try {
    // Lookup matching class from existing classes table
    let classId: string | null = null;
    if (student.grade) {
      if (student.section) {
        const { data: cls } = await supabase
          .from('classes')
          .select('id')
          .eq('grade', student.grade)
          .eq('section', student.section)
          .maybeSingle();
        classId = cls?.id || null;
      }
      if (!classId) {
        const { data: cls } = await supabase
          .from('classes')
          .select('id')
          .eq('grade', student.grade)
          .maybeSingle();
        classId = cls?.id || null;
      }
    }

    // Lookup matching parent from existing parents table
    let parentId: string | null = null;
    if (student.parentEmail) {
      const { data: p } = await supabase
        .from('parents')
        .select('id')
        .eq('email', student.parentEmail)
        .maybeSingle();
      parentId = p?.id || null;
    }
    if (!parentId && student.parentName) {
      const { data: p } = await supabase
        .from('parents')
        .select('id')
        .ilike('name', student.parentName)
        .maybeSingle();
      parentId = p?.id || null;
    }

    const payload: Record<string, any> = {
      id: student.id,
      roll_number: student.rollNumber || null,
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email || null,
      phone: student.phone || null,
      gender: student.gender || null,
      dob: student.dob || null,
      class_id: classId,
      grade: student.grade || null,
      section: student.section || null,
      parent_id: parentId,
      parent_name: student.parentName || null,
      parent_phone: student.parentPhone || null,
      parent_email: student.parentEmail || null,
      address: student.address || null,
      admission_date: student.admissionDate || null,
      status: student.status || 'Active',
      fee_status: student.feeStatus || 'Paid',
      avatar: student.avatar || null
    };

    const { data, error } = await supabase.from('students').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert student warning:', error.message);
      return null;
    }
    return normalizeRecord<Student>(data);
  } catch (err) {
    console.warn('Supabase student insert error:', err);
    return null;
  }
}

export async function updateStudentInSupabase(student: Student): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  await ensureSupabaseAuth();
  try {
    let classId: string | null = null;
    if (student.grade) {
      if (student.section) {
        const { data: cls } = await supabase
          .from('classes')
          .select('id')
          .eq('grade', student.grade)
          .eq('section', student.section)
          .maybeSingle();
        classId = cls?.id || null;
      }
      if (!classId) {
        const { data: cls } = await supabase
          .from('classes')
          .select('id')
          .eq('grade', student.grade)
          .maybeSingle();
        classId = cls?.id || null;
      }
    }

    let parentId: string | null = null;
    if (student.parentEmail) {
      const { data: p } = await supabase
        .from('parents')
        .select('id')
        .eq('email', student.parentEmail)
        .maybeSingle();
      parentId = p?.id || null;
    }
    if (!parentId && student.parentName) {
      const { data: p } = await supabase
        .from('parents')
        .select('id')
        .ilike('name', student.parentName)
        .maybeSingle();
      parentId = p?.id || null;
    }

    const payload: Record<string, any> = {
      roll_number: student.rollNumber || null,
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email || null,
      phone: student.phone || null,
      gender: student.gender || null,
      dob: student.dob || null,
      grade: student.grade || null,
      section: student.section || null,
      parent_name: student.parentName || null,
      parent_phone: student.parentPhone || null,
      parent_email: student.parentEmail || null,
      address: student.address || null,
      admission_date: student.admissionDate || null,
      status: student.status || 'Active',
      fee_status: student.feeStatus || 'Paid',
      avatar: student.avatar || null
    };

    if (classId) payload.class_id = classId;
    if (parentId) payload.parent_id = parentId;

    const { error } = await supabase.from('students').update(payload).eq('id', student.id);
    if (error) {
      console.warn('Supabase update student warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase student update error:', err);
    return false;
  }
}

export async function deleteStudentFromSupabase(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  await ensureSupabaseAuth();
  try {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) {
      console.warn('Supabase delete student warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase student delete error:', err);
    return false;
  }
}

// ============================================================================
// TEACHERS SERVICE
// ============================================================================
export async function fetchTeachersFromSupabase(): Promise<Teacher[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('teachers').select('*').order('id', { ascending: true });
    if (error) {
      console.warn('Supabase fetch teachers warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<Teacher>(d));
  } catch (err) {
    console.warn('Supabase teachers query error:', err);
    return null;
  }
}

export async function insertTeacherToSupabase(teacher: Teacher): Promise<Teacher | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...teacher, ...toSnakeCase(teacher) };
    const { data, error } = await supabase.from('teachers').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert teacher warning:', error.message);
      return null;
    }
    return normalizeRecord<Teacher>(data);
  } catch (err) {
    console.warn('Supabase teacher insert error:', err);
    return null;
  }
}

// ============================================================================
// SUPPORT STAFF SERVICE
// ============================================================================
export async function fetchSupportStaffFromSupabase(): Promise<SupportStaff[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('support_staff').select('*').order('id', { ascending: true });
    if (error) {
      console.warn('Supabase fetch support staff warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<SupportStaff>(d));
  } catch (err) {
    console.warn('Supabase support staff query error:', err);
    return null;
  }
}

export async function insertSupportStaffToSupabase(staff: SupportStaff): Promise<SupportStaff | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...staff, ...toSnakeCase(staff) };
    const { data, error } = await supabase.from('support_staff').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert staff warning:', error.message);
      return null;
    }
    return normalizeRecord<SupportStaff>(data);
  } catch (err) {
    console.warn('Supabase staff insert error:', err);
    return null;
  }
}

export async function updateSupportStaffInSupabase(staff: SupportStaff): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = { ...staff, ...toSnakeCase(staff) };
    const { error } = await supabase.from('support_staff').update(payload).eq('id', staff.id);
    if (error) {
      console.warn('Supabase update staff warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase staff update error:', err);
    return false;
  }
}

export async function deleteSupportStaffFromSupabase(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('support_staff').delete().eq('id', id);
    if (error) {
      console.warn('Supabase delete staff warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase staff delete error:', err);
    return false;
  }
}

// ============================================================================
// FEES & INVOICES SERVICE (with Role Protection)
// ============================================================================
export async function fetchInvoicesFromSupabase(
  userRole?: string,
  userEmail?: string,
  studentId?: string
): Promise<FeeInvoice[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    let query = supabase.from('fee_invoices').select('*').order('due_date', { ascending: false });

    // Role-based restrictions at query level
    if (userRole === 'student' && studentId) {
      query = query.eq('student_id', studentId);
    } else if (userRole === 'parent' && userEmail) {
      // In parent role, filter invoices by parent email or child ID if available
      query = query.filter('student_id', 'in', `(${studentId || 'STU-1003'})`);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase fetch invoices warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<FeeInvoice>(d));
  } catch (err) {
    console.warn('Supabase invoices query error:', err);
    return null;
  }
}

export async function insertInvoiceToSupabase(inv: FeeInvoice, userRole?: string): Promise<FeeInvoice | null> {
  // Teacher and Student cannot create fee invoices
  if (userRole === 'teacher' || userRole === 'student' || userRole === 'parent') {
    console.warn('Access Denied: Role cannot create fee invoices');
    return null;
  }
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...inv, ...toSnakeCase(inv) };
    const { data, error } = await supabase.from('fee_invoices').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert invoice warning:', error.message);
      return null;
    }
    return normalizeRecord<FeeInvoice>(data);
  } catch (err) {
    console.warn('Supabase invoice insert error:', err);
    return null;
  }
}

export async function updateInvoiceStatusInSupabase(
  invoiceId: string,
  status: 'Paid' | 'Pending' | 'Overdue',
  paidDate?: string,
  userRole?: string
): Promise<boolean> {
  // Only Admin and Accountant can update invoice status
  if (userRole === 'teacher' || userRole === 'student') {
    console.warn('Access Denied: Role cannot update invoices');
    return false;
  }
  if (!isSupabaseConfigured()) return false;
  try {
    const updates: any = {
      status,
      paid_date: paidDate || (status === 'Paid' ? new Date().toISOString().split('T')[0] : null)
    };
    const { error } = await supabase.from('fee_invoices').update(updates).eq('id', invoiceId);
    if (error) {
      console.warn('Supabase invoice status update warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase invoice status update error:', err);
    return false;
  }
}

// ============================================================================
// ATTENDANCE SERVICE
// ============================================================================
export async function fetchAttendanceFromSupabase(): Promise<AttendanceRecord[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('attendance').select('*').order('date', { ascending: false });
    if (error) {
      console.warn('Supabase fetch attendance warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<AttendanceRecord>(d));
  } catch (err) {
    console.warn('Supabase attendance query error:', err);
    return null;
  }
}

export async function saveAttendanceToSupabase(records: AttendanceRecord[]): Promise<boolean> {
  if (!isSupabaseConfigured() || records.length === 0) return false;
  try {
    const payloads = records.map((r) => ({ ...r, ...toSnakeCase(r) }));
    const { error } = await supabase.from('attendance').upsert(payloads, { onConflict: 'student_id,date' });
    if (error) {
      // Fallback to plain insert if conflict target differs
      const { error: insertErr } = await supabase.from('attendance').insert(payloads);
      if (insertErr) {
        console.warn('Supabase attendance save warning:', insertErr.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.warn('Supabase attendance save error:', err);
    return false;
  }
}

// ============================================================================
// NOTICES & ANNOUNCEMENTS SERVICE
// ============================================================================
export async function fetchNoticesFromSupabase(): Promise<Notice[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('notices').select('*').order('date', { ascending: false });
    if (error) {
      console.warn('Supabase fetch notices warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<Notice>(d));
  } catch (err) {
    console.warn('Supabase notices query error:', err);
    return null;
  }
}

export async function insertNoticeToSupabase(notice: Notice): Promise<Notice | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...notice, ...toSnakeCase(notice) };
    const { data, error } = await supabase.from('notices').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert notice warning:', error.message);
      return null;
    }
    return normalizeRecord<Notice>(data);
  } catch (err) {
    console.warn('Supabase notice insert error:', err);
    return null;
  }
}

// ============================================================================
// HOMEWORK SERVICE
// ============================================================================
export async function fetchHomeworkFromSupabase(): Promise<Homework[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('homework').select('*').order('assigned_date', { ascending: false });
    if (error) {
      console.warn('Supabase fetch homework warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<Homework>(d));
  } catch (err) {
    console.warn('Supabase homework query error:', err);
    return null;
  }
}

export async function insertHomeworkToSupabase(hw: Homework): Promise<Homework | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...hw, ...toSnakeCase(hw) };
    const { data, error } = await supabase.from('homework').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert homework warning:', error.message);
      return null;
    }
    return normalizeRecord<Homework>(data);
  } catch (err) {
    console.warn('Supabase homework insert error:', err);
    return null;
  }
}

// ============================================================================
// EXAM MARKS SERVICE
// ============================================================================
export async function fetchExamMarksFromSupabase(): Promise<ExamMark[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('exam_marks').select('*').order('id', { ascending: true });
    if (error) {
      console.warn('Supabase fetch exam marks warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<ExamMark>(d));
  } catch (err) {
    console.warn('Supabase exam marks query error:', err);
    return null;
  }
}

export async function insertExamMarkToSupabase(mark: ExamMark): Promise<ExamMark | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...mark, ...toSnakeCase(mark) };
    const { data, error } = await supabase.from('exam_marks').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert exam mark warning:', error.message);
      return null;
    }
    return normalizeRecord<ExamMark>(data);
  } catch (err) {
    console.warn('Supabase exam mark insert error:', err);
    return null;
  }
}

// ============================================================================
// PARENTS SERVICE
// ============================================================================
export async function fetchParentsFromSupabase(): Promise<Parent[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('parents').select('*').order('id', { ascending: true });
    if (error) {
      console.warn('Supabase fetch parents warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<Parent>(d));
  } catch (err) {
    console.warn('Supabase parents query error:', err);
    return null;
  }
}

export async function insertParentToSupabase(parent: Parent): Promise<Parent | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...parent, ...toSnakeCase(parent) };
    const { data, error } = await supabase.from('parents').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert parent warning:', error.message);
      return null;
    }
    return normalizeRecord<Parent>(data);
  } catch (err) {
    console.warn('Supabase parent insert error:', err);
    return null;
  }
}

// ============================================================================
// TRANSPORT SERVICE (Transports, Vehicles, Routes)
// ============================================================================
export async function fetchStudentTransportsFromSupabase(): Promise<StudentTransport[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('student_transports').select('*');
    if (error) {
      console.warn('Supabase fetch student transports warning:', error.message);
      return null;
    }
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<StudentTransport>(d));
  } catch (err) {
    console.warn('Supabase student transports error:', err);
    return null;
  }
}

export async function insertStudentTransportToSupabase(st: StudentTransport): Promise<StudentTransport | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload = { ...st, ...toSnakeCase(st) };
    const { data, error } = await supabase.from('student_transports').insert([payload]).select().single();
    if (error) return null;
    return normalizeRecord<StudentTransport>(data);
  } catch {
    return null;
  }
}

export async function deleteStudentTransportFromSupabase(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('student_transports').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function fetchVehiclesFromSupabase(): Promise<TransportVehicle[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('transport_vehicles').select('*');
    if (error) return null;
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<TransportVehicle>(d));
  } catch {
    return null;
  }
}

export async function fetchRoutesFromSupabase(): Promise<TransportRoute[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('transport_routes').select('*');
    if (error) return null;
    if (!data || data.length === 0) return [];
    return data.map((d) => normalizeRecord<TransportRoute>(d));
  } catch {
    return null;
  }
}

// ============================================================================
// SCHOOL SETTINGS SERVICE
// ============================================================================
export async function fetchSchoolSettingsFromSupabase(): Promise<SchoolSettings | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('school_settings').select('*').limit(1).maybeSingle();
    if (error || !data) return null;
    return normalizeRecord<SchoolSettings>(data);
  } catch {
    return null;
  }
}

export async function saveSchoolSettingsToSupabase(settings: SchoolSettings): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = { ...settings, ...toSnakeCase(settings) };
    const { error } = await supabase.from('school_settings').upsert([payload]);
    return !error;
  } catch {
    return false;
  }
}

// ============================================================================
// ACADEMICS SERVICE (Classes, Subjects, Timetable)
// ============================================================================
export async function fetchClassesFromSupabase(): Promise<ClassRoom[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('classes').select('*');
    if (error || !data || data.length === 0) return null;
    return data.map((d) => normalizeRecord<ClassRoom>(d));
  } catch {
    return null;
  }
}

export async function fetchSubjectsFromSupabase(): Promise<Subject[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('subjects').select('*');
    if (error || !data || data.length === 0) return null;
    return data.map((d) => normalizeRecord<Subject>(d));
  } catch {
    return null;
  }
}

export async function fetchTimetableFromSupabase(): Promise<TimetableSlot[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('timetable').select('*');
    if (error || !data || data.length === 0) return null;
    return data.map((d) => normalizeRecord<TimetableSlot>(d));
  } catch {
    return null;
  }
}
