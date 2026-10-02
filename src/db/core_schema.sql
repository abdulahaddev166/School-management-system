-- ============================================================================
-- School Management System - Core Database Schema Migration
-- Compatible with Supabase PostgreSQL & Row Level Security (RLS)
-- Location: src/db/core_schema.sql
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function to extract user role from Supabase Auth JWT
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text LANGUAGE sql STABLE AS $$
  SELECT COALESCE(
    auth.jwt() -> 'user_metadata' ->> 'role',
    auth.jwt() -> 'app_metadata' ->> 'role',
    'anon'
  );
$$;

-- ============================================================================
-- 1. CLASSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.classes (
  id text PRIMARY KEY,
  name text NOT NULL,
  grade text NOT NULL,
  section text NOT NULL,
  batch text,
  academic_year text,
  class_teacher text,
  room_number text,
  student_count integer DEFAULT 0,
  capacity integer DEFAULT 35,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 2. PARENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.parents (
  id text PRIMARY KEY,
  parent_id text,
  first_name text,
  last_name text,
  name text NOT NULL,
  email text,
  phone text,
  occupation text,
  children_names text[] DEFAULT '{}',
  address text,
  relationship text DEFAULT 'Guardian',
  status text DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 3. STUDENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.students (
  id text PRIMARY KEY,
  student_id text,
  roll_number text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  gender text DEFAULT 'Other',
  dob text,
  class_id text REFERENCES public.classes(id) ON DELETE SET NULL,
  grade text,
  section text,
  batch text,
  parent_id text REFERENCES public.parents(id) ON DELETE SET NULL,
  parent_name text,
  parent_phone text,
  parent_email text,
  address text,
  admission_date text,
  status text DEFAULT 'Active',
  fee_status text DEFAULT 'Pending',
  avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 4. TEACHERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.teachers (
  id text PRIMARY KEY,
  teacher_id text,
  emp_id text,
  first_name text,
  last_name text,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  department text,
  designation text,
  qualification text,
  address text,
  subjects text[] DEFAULT '{}',
  status text DEFAULT 'Active',
  joining_date text,
  avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 5. SUPPORT STAFF TABLE (Including Drivers, Canteen, Peons)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.support_staff (
  id text PRIMARY KEY,
  staff_id text,
  first_name text,
  last_name text,
  name text NOT NULL,
  role text NOT NULL,
  department text,
  phone text,
  email text,
  cnic text,
  address text,
  joining_date text,
  status text DEFAULT 'Active',
  salary numeric DEFAULT 0,
  shift text DEFAULT 'Full Day',
  emergency_contact text,
  avatar text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 6. FEE INVOICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.fee_invoices (
  id text PRIMARY KEY,
  student_id text REFERENCES public.students(id) ON DELETE CASCADE,
  student_name text,
  invoice_no text NOT NULL,
  invoice_number text,
  grade text,
  fee_type text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  total_amount numeric DEFAULT 0,
  paid_amount numeric DEFAULT 0,
  remaining_amount numeric DEFAULT 0,
  due_date text NOT NULL,
  paid_date text,
  status text NOT NULL DEFAULT 'Pending',
  payment_method text,
  fine numeric DEFAULT 0,
  academic_year text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 7. FEES / PAYMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.fees (
  id text PRIMARY KEY,
  invoice_id text REFERENCES public.fee_invoices(id) ON DELETE CASCADE,
  student_id text REFERENCES public.students(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  payment_date text NOT NULL,
  payment_method text NOT NULL,
  transaction_reference text,
  receipt_number text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 8. SALARIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.salaries (
  id text PRIMARY KEY,
  employee_id text NOT NULL,
  employee_type text NOT NULL DEFAULT 'Teacher',
  employee_email text,
  basic_salary numeric NOT NULL DEFAULT 0,
  allowances numeric NOT NULL DEFAULT 0,
  deductions numeric NOT NULL DEFAULT 0,
  net_salary numeric NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'Pending',
  payment_date text,
  salary_month text NOT NULL,
  salary_year integer,
  payslip_reference text,
  payment_method text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 9. ATTENDANCE TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.attendance (
  id text PRIMARY KEY,
  student_id text REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id text REFERENCES public.teachers(id) ON DELETE SET NULL,
  student_name text,
  roll_number text,
  class_id text REFERENCES public.classes(id) ON DELETE SET NULL,
  date text NOT NULL,
  status text NOT NULL,
  remarks text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_student_attendance_date UNIQUE (student_id, date)
);

-- ============================================================================
-- 10. NOTICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notices (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  content text,
  audience text NOT NULL DEFAULT 'All',
  category text DEFAULT 'General',
  priority text DEFAULT 'Normal',
  author text,
  date text,
  publish_date text,
  expiry_date text,
  status text DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 11. SCHOOL SETTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.school_settings (
  id text PRIMARY KEY DEFAULT 'current',
  school_name text NOT NULL DEFAULT 'Oakridge International Academy',
  tagline text,
  logo text,
  logo_url text,
  primary_color text DEFAULT '#2E6640',
  theme_primary text DEFAULT '#2E6640',
  email text,
  phone text,
  address text,
  website text,
  academic_year text,
  current_term text,
  timezone text,
  currency text DEFAULT '$',
  email_notifications boolean DEFAULT true,
  sms_notifications boolean DEFAULT false,
  auto_backup boolean DEFAULT true,
  security_mfa boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) ACTIVATION
-- ============================================================================
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- 1. CLASSES POLICIES
CREATE POLICY "classes_select_policy" ON public.classes
  FOR SELECT USING (true);

CREATE POLICY "classes_admin_all" ON public.classes
  FOR ALL USING (
    public.current_user_role() = 'admin' OR auth.role() = 'service_role'
  );

-- 2. PARENTS POLICIES
CREATE POLICY "parents_select_policy" ON public.parents
  FOR SELECT USING (
    public.current_user_role() IN ('admin', 'accountant', 'teacher')
    OR email = auth.jwt() ->> 'email'
    OR auth.role() = 'service_role'
  );

CREATE POLICY "parents_admin_all" ON public.parents
  FOR ALL USING (
    public.current_user_role() = 'admin' OR auth.role() = 'service_role'
  );

-- 3. STUDENTS POLICIES
CREATE POLICY "students_select_policy" ON public.students
  FOR SELECT USING (
    public.current_user_role() IN ('admin', 'accountant', 'teacher')
    OR email = auth.jwt() ->> 'email'
    OR parent_email = auth.jwt() ->> 'email'
    OR auth.role() = 'service_role'
  );

CREATE POLICY "students_admin_all" ON public.students
  FOR ALL USING (
    public.current_user_role() = 'admin' OR auth.role() = 'service_role'
  );

-- 4. TEACHERS POLICIES
CREATE POLICY "teachers_select_policy" ON public.teachers
  FOR SELECT USING (true);

CREATE POLICY "teachers_admin_all" ON public.teachers
  FOR ALL USING (
    public.current_user_role() = 'admin' OR auth.role() = 'service_role'
  );

-- 5. SUPPORT STAFF POLICIES
CREATE POLICY "support_staff_select_policy" ON public.support_staff
  FOR SELECT USING (
    public.current_user_role() IN ('admin', 'accountant', 'teacher')
    OR auth.role() = 'service_role'
  );

CREATE POLICY "support_staff_admin_all" ON public.support_staff
  FOR ALL USING (
    public.current_user_role() = 'admin' OR auth.role() = 'service_role'
  );

-- 6. FEE INVOICES POLICIES
CREATE POLICY "fee_invoices_staff_select" ON public.fee_invoices
  FOR SELECT USING (
    public.current_user_role() IN ('admin', 'accountant')
    OR auth.role() = 'service_role'
  );

CREATE POLICY "fee_invoices_student_parent_select" ON public.fee_invoices
  FOR SELECT USING (
    (public.current_user_role() = 'student' AND student_id IN (
      SELECT id FROM public.students WHERE email = auth.jwt() ->> 'email'
    ))
    OR
    (public.current_user_role() = 'parent' AND student_id IN (
      SELECT id FROM public.students WHERE parent_email = auth.jwt() ->> 'email'
    ))
  );

CREATE POLICY "fee_invoices_admin_accountant_manage" ON public.fee_invoices
  FOR ALL USING (
    public.current_user_role() IN ('admin', 'accountant')
    OR auth.role() = 'service_role'
  );

-- 7. FEES / PAYMENTS POLICIES
CREATE POLICY "fees_staff_select" ON public.fees
  FOR SELECT USING (
    public.current_user_role() IN ('admin', 'accountant')
    OR auth.role() = 'service_role'
  );

CREATE POLICY "fees_student_parent_select" ON public.fees
  FOR SELECT USING (
    (public.current_user_role() = 'student' AND student_id IN (
      SELECT id FROM public.students WHERE email = auth.jwt() ->> 'email'
    ))
    OR
    (public.current_user_role() = 'parent' AND student_id IN (
      SELECT id FROM public.students WHERE parent_email = auth.jwt() ->> 'email'
    ))
  );

CREATE POLICY "fees_admin_accountant_manage" ON public.fees
  FOR ALL USING (
    public.current_user_role() IN ('admin', 'accountant')
    OR auth.role() = 'service_role'
  );

-- 8. SALARIES POLICIES
CREATE POLICY "salaries_admin_accountant_all" ON public.salaries
  FOR ALL USING (
    public.current_user_role() IN ('admin', 'accountant')
    OR auth.role() = 'service_role'
  );

CREATE POLICY "salaries_teacher_own_select" ON public.salaries
  FOR SELECT USING (
    public.current_user_role() = 'teacher'
    AND employee_email = auth.jwt() ->> 'email'
  );

-- 9. ATTENDANCE POLICIES
CREATE POLICY "attendance_staff_select" ON public.attendance
  FOR SELECT USING (
    public.current_user_role() IN ('admin', 'accountant', 'teacher')
    OR auth.role() = 'service_role'
  );

CREATE POLICY "attendance_student_parent_select" ON public.attendance
  FOR SELECT USING (
    (public.current_user_role() = 'student' AND student_id IN (
      SELECT id FROM public.students WHERE email = auth.jwt() ->> 'email'
    ))
    OR
    (public.current_user_role() = 'parent' AND student_id IN (
      SELECT id FROM public.students WHERE parent_email = auth.jwt() ->> 'email'
    ))
  );

CREATE POLICY "attendance_teacher_admin_write" ON public.attendance
  FOR ALL USING (
    public.current_user_role() IN ('admin', 'teacher')
    OR auth.role() = 'service_role'
  );

-- 10. NOTICES POLICIES
CREATE POLICY "notices_select_policy" ON public.notices
  FOR SELECT USING (
    audience = 'All'
    OR LOWER(audience) = LOWER(public.current_user_role())
    OR public.current_user_role() IN ('admin', 'teacher')
    OR auth.role() = 'service_role'
  );

CREATE POLICY "notices_admin_teacher_manage" ON public.notices
  FOR ALL USING (
    public.current_user_role() IN ('admin', 'teacher')
    OR auth.role() = 'service_role'
  );

-- 11. SCHOOL SETTINGS POLICIES
CREATE POLICY "school_settings_select_policy" ON public.school_settings
  FOR SELECT USING (true);

CREATE POLICY "school_settings_admin_manage" ON public.school_settings
  FOR ALL USING (
    public.current_user_role() = 'admin'
    OR auth.role() = 'service_role'
  );
