export type UserRole = 'admin' | 'accountant' | 'teacher' | 'student' | 'parent';

export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
  title: string;
  avatar: string;
}

export type NavigationItem = 
  | 'dashboard'
  | 'all-students'
  | 'add-student'
  | 'admissions'
  | 'all-teachers'
  | 'support-staff'
  | 'departments'
  | 'classes'
  | 'subjects'
  | 'timetable'
  | 'homework'
  | 'attendance'
  | 'examination'
  | 'fees'
  | 'accounts'
  | 'salary'
  | 'transport'
  | 'student-transport'
  | 'teacher-transport'
  | 'activities'
  | 'parents'
  | 'notice-board'
  | 'reports'
  | 'settings'
  | 'subscription'
  | 'profile';

export interface ActivityImage {
  id: string;
  url: string;
  title: string;
  category?: string;
  caption?: string;
}

export interface ActivityEvent {
  id: string;
  title: string;
  category: 'Sports' | 'Academic' | 'Cultural' | 'Celebration' | 'Field Trip';
  date: string;
  coverImage: string;
  shortDescription: string;
  location: string;
  participantCount: string;
  gallery: ActivityImage[];
}

export interface Student {
  id: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  section: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  admissionDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  avatar?: string;
  address: string;
}

export interface Teacher {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  joinDate: string;
  subjects: string[];
  status: 'Active' | 'On Leave' | 'Inactive';
  avatar?: string;
}

export interface SupportStaff {
  id: string;
  staffId: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email?: string;
  cnic?: string;
  address: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  salary: number;
  shift: 'Morning' | 'Evening' | 'Night' | 'Full Day';
  emergencyContact: string;
  avatar?: string;
  notes?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headTeacher: string;
  teacherCount: number;
  studentCount: number;
  budget: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  section: string;
  classTeacher: string;
  roomNumber: string;
  studentCount: number;
  capacity: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  grade: string;
  teacherName: string;
  credits: number;
  weeklyHours: number;
  batch?: string;
}

export interface TimetableSlot {
  id: string;
  classId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  timeSlot: string;
  subjectName: string;
  teacherName: string;
  roomNumber: string;
}

export interface Homework {
  id: string;
  classId: string;
  className: string;
  subject: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  teacherName: string;
  submissionsCount: number;
  totalStudents: number;
  status: 'Active' | 'Closed' | 'Draft';
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  classId: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface Exam {
  id: string;
  title: string;
  grade: string;
  subject: string;
  examDate: string;
  duration: string;
  totalMarks: number;
  passMarks: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  roomNumber: string;
}

export interface ExamMark {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  remarks: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  grade: string;
  amount: number;
  feeType: 'Tuition' | 'Admission' | 'Exam' | 'Transport' | 'Library';
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paymentMethod?: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Online Gateway';
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  childrenNames: string[];
  address: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'General' | 'Academic' | 'Sports' | 'Exam' | 'Emergency';
  audience: 'All' | 'Students' | 'Teachers' | 'Parents';
  priority: 'Normal' | 'High' | 'Urgent';
  author: string;
}

export interface SchoolSettings {
  schoolName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  academicYear: string;
  currentTerm: string;
  timezone: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoBackup: boolean;
  securityMfa: boolean;
  themePrimary: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  recommended: boolean;
  description: string;
  features: string[];
  maxStudents: number;
  maxTeachers: number;
  storage: string;
  support: string;
  modulesIncluded: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export interface StudentTransport {
  id: string;
  studentId: string;
  studentName: string;
  admissionId: string;
  batch: string;
  className: string;
  timingShift: 'Morning Shift' | 'Second Shift' | 'Senior Shift';
  schoolOffTime: string; // e.g. "11:00 AM", "01:00 PM", "02:00 PM"
  pickupPoint: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  vehicleNumber: string;
  driverId: string; // SupportStaff ID (Role = Driver)
  driverName: string;
  driverPhone: string;
  departureTime: string;
  dropTime: string;
  status: 'Assigned' | 'Active' | 'Pending' | 'Suspended';
  parentContact: string;
}

export interface TeacherTransport {
  id: string;
  teacherId: string;
  teacherName: string;
  empId: string;
  department: string;
  pickupLocation: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  vehicleNumber: string;
  driverId: string; // SupportStaff ID (Role = Driver)
  driverName: string;
  driverPhone: string;
  pickupTime: string;
  dropTime: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface TransportVehicle {
  id: string;
  vehicleName: string;
  vehicleNumber: string;
  type: 'Bus' | 'Coaster' | 'Van' | 'Car';
  capacity: number;
  assignedDriverId?: string;
  assignedDriverName?: string;
  routeId?: string;
  routeName?: string;
  status: 'Active' | 'Under Maintenance' | 'Inactive';
}

export interface TransportRoute {
  id: string;
  routeName: string;
  pickupPoints: string;
  schoolArrivalTime: string;
  schoolDepartureTime: string;
  monthlyFare?: number;
}
