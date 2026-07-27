import {
  Student,
  Teacher,
  SupportStaff,
  Department,
  ClassRoom,
  Subject,
  TimetableSlot,
  Homework,
  AttendanceRecord,
  Exam,
  ExamMark,
  FeeInvoice,
  Parent,
  Notice,
  SchoolSettings,
  SubscriptionPlan,
  StudentTransport,
  TeacherTransport,
  TransportVehicle,
  TransportRoute
} from '../types';

export const INITIAL_SETTINGS: SchoolSettings = {
  schoolName: 'Horizon Academy',
  tagline: 'Empowering minds, building futures',
  logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
  email: 'admin@horizonacademy.edu',
  phone: '+1 (555) 234-5678',
  address: '100 Knowledge Avenue, San Francisco, CA 94107',
  website: 'https://horizonacademy.edu',
  academicYear: '2026 - 2027',
  currentTerm: 'Fall Semester',
  timezone: 'PST (UTC-8)',
  currency: '$',
  emailNotifications: true,
  smsNotifications: true,
  autoBackup: true,
  securityMfa: false,
  themePrimary: '#2C633E'
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-1001',
    rollNumber: '101',
    firstName: 'Alexander',
    lastName: 'Wright',
    email: 'alexander.w@horizon.edu',
    phone: '+1 (555) 019-2831',
    grade: 'Grade 10',
    section: 'A',
    gender: 'Male',
    dob: '2010-04-12',
    parentName: 'David Wright',
    parentPhone: '+1 (555) 019-2800',
    parentEmail: 'david.wright@example.com',
    admissionDate: '2024-09-01',
    status: 'Active',
    feeStatus: 'Paid',
    address: '42 Pine Street, San Francisco, CA'
  },
  {
    id: 'STU-1002',
    rollNumber: '102',
    firstName: 'Sophia',
    lastName: 'Chen',
    email: 'sophia.c@horizon.edu',
    phone: '+1 (555) 019-2832',
    grade: 'Grade 10',
    section: 'A',
    gender: 'Female',
    dob: '2010-08-22',
    parentName: 'Marcus Chen',
    parentPhone: '+1 (555) 019-2801',
    parentEmail: 'marcus.chen@example.com',
    admissionDate: '2024-09-01',
    status: 'Active',
    feeStatus: 'Paid',
    address: '88 Oak Avenue, San Francisco, CA'
  },
  {
    id: 'STU-1003',
    rollNumber: '103',
    firstName: 'Ethan',
    lastName: 'Miller',
    email: 'ethan.m@horizon.edu',
    phone: '+1 (555) 019-2833',
    grade: 'Grade 10',
    section: 'B',
    gender: 'Male',
    dob: '2010-02-15',
    parentName: 'Sarah Miller',
    parentPhone: '+1 (555) 019-2802',
    parentEmail: 'sarah.miller@example.com',
    admissionDate: '2024-09-01',
    status: 'Active',
    feeStatus: 'Pending',
    address: '12 Maple Drive, San Francisco, CA'
  },
  {
    id: 'STU-1004',
    rollNumber: '104',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.d@horizon.edu',
    phone: '+1 (555) 019-2834',
    grade: 'Grade 11',
    section: 'A',
    gender: 'Female',
    dob: '2009-11-05',
    parentName: 'Robert Davis',
    parentPhone: '+1 (555) 019-2803',
    parentEmail: 'robert.davis@example.com',
    admissionDate: '2023-09-01',
    status: 'Active',
    feeStatus: 'Paid',
    address: '305 Sunset Blvd, San Francisco, CA'
  },
  {
    id: 'STU-1005',
    rollNumber: '105',
    firstName: 'Lucas',
    lastName: 'Garcia',
    email: 'lucas.g@horizon.edu',
    phone: '+1 (555) 019-2835',
    grade: 'Grade 11',
    section: 'A',
    gender: 'Male',
    dob: '2009-06-19',
    parentName: 'Elena Garcia',
    parentPhone: '+1 (555) 019-2804',
    parentEmail: 'elena.garcia@example.com',
    admissionDate: '2023-09-01',
    status: 'Active',
    feeStatus: 'Overdue',
    address: '77 Cedar Lane, San Francisco, CA'
  },
  {
    id: 'STU-1006',
    rollNumber: '106',
    firstName: 'Olivia',
    lastName: 'Taylor',
    email: 'olivia.t@horizon.edu',
    phone: '+1 (555) 019-2836',
    grade: 'Grade 12',
    section: 'A',
    gender: 'Female',
    dob: '2008-01-30',
    parentName: 'James Taylor',
    parentPhone: '+1 (555) 019-2805',
    parentEmail: 'james.taylor@example.com',
    admissionDate: '2022-09-01',
    status: 'Active',
    feeStatus: 'Paid',
    address: '501 Willow Way, San Francisco, CA'
  },
  {
    id: 'STU-1007',
    rollNumber: '107',
    firstName: 'Liam',
    lastName: 'Johnson',
    email: 'liam.j@horizon.edu',
    phone: '+1 (555) 019-2837',
    grade: 'Grade 9',
    section: 'A',
    gender: 'Male',
    dob: '2011-03-14',
    parentName: 'Michael Johnson',
    parentPhone: '+1 (555) 019-2806',
    parentEmail: 'michael.j@example.com',
    admissionDate: '2025-09-01',
    status: 'Active',
    feeStatus: 'Paid',
    address: '19 High St, San Francisco, CA'
  },
  {
    id: 'STU-1008',
    rollNumber: '108',
    firstName: 'Isabella',
    lastName: 'Martinez',
    email: 'isabella.m@horizon.edu',
    phone: '+1 (555) 019-2838',
    grade: 'Grade 9',
    section: 'B',
    gender: 'Female',
    dob: '2011-09-08',
    parentName: 'Carlos Martinez',
    parentPhone: '+1 (555) 019-2807',
    parentEmail: 'carlos.m@example.com',
    admissionDate: '2025-09-01',
    status: 'Pending',
    feeStatus: 'Pending',
    address: '64 Hillside Rd, San Francisco, CA'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'TCH-201',
    empId: 'EMP-01',
    name: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@horizon.edu',
    phone: '+1 (555) 432-1001',
    department: 'Mathematics',
    designation: 'Head of Department',
    qualification: 'Ph.D. in Pure Mathematics (Stanford)',
    joinDate: '2019-08-15',
    subjects: ['Advanced Calculus', 'Algebra II'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-202',
    empId: 'EMP-02',
    name: 'Prof. Marcus Brody',
    email: 'marcus.brody@horizon.edu',
    phone: '+1 (555) 432-1002',
    department: 'Sciences',
    designation: 'Senior Lecturer',
    qualification: 'M.Sc. Physics (MIT)',
    joinDate: '2020-01-10',
    subjects: ['Physics', 'Chemistry'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-203',
    empId: 'EMP-03',
    name: 'Clara Harrison',
    email: 'clara.h@horizon.edu',
    phone: '+1 (555) 432-1003',
    department: 'Computer Science',
    designation: 'Lead STEM Instructor',
    qualification: 'B.S. Software Engineering (UC Berkeley)',
    joinDate: '2021-06-01',
    subjects: ['Computer Science', 'Web Development'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-204',
    empId: 'EMP-04',
    name: 'Jonathan Sterling',
    email: 'jonathan.s@horizon.edu',
    phone: '+1 (555) 432-1004',
    department: 'Humanities',
    designation: 'Department Head',
    qualification: 'M.A. World History (Oxford)',
    joinDate: '2018-09-01',
    subjects: ['World History', 'Civics'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-205',
    empId: 'EMP-05',
    name: 'Samantha Reed',
    email: 'samantha.r@horizon.edu',
    phone: '+1 (555) 432-1005',
    department: 'Languages',
    designation: 'English Literature Lead',
    qualification: 'M.A. English Literature (Columbia)',
    joinDate: '2022-02-14',
    subjects: ['English Literature', 'Creative Writing'],
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'DEP-1',
    name: 'Mathematics',
    code: 'MATH',
    headTeacher: 'Dr. Evelyn Vance',
    teacherCount: 6,
    studentCount: 320,
    budget: '$45,000'
  },
  {
    id: 'DEP-2',
    name: 'Sciences',
    code: 'SCI',
    headTeacher: 'Prof. Marcus Brody',
    teacherCount: 8,
    studentCount: 380,
    budget: '$62,000'
  },
  {
    id: 'DEP-3',
    name: 'Computer Science',
    code: 'CS',
    headTeacher: 'Clara Harrison',
    teacherCount: 4,
    studentCount: 240,
    budget: '$85,000'
  },
  {
    id: 'DEP-4',
    name: 'Humanities',
    code: 'HUM',
    headTeacher: 'Jonathan Sterling',
    teacherCount: 5,
    studentCount: 310,
    budget: '$35,000'
  },
  {
    id: 'DEP-5',
    name: 'Languages',
    code: 'LANG',
    headTeacher: 'Samantha Reed',
    teacherCount: 5,
    studentCount: 350,
    budget: '$30,000'
  }
];

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    id: 'CLS-9A',
    name: 'Grade 9 - Section A',
    grade: 'Grade 9',
    section: 'A',
    classTeacher: 'Jonathan Sterling',
    roomNumber: 'Room 101',
    studentCount: 28,
    capacity: 32
  },
  {
    id: 'CLS-9B',
    name: 'Grade 9 - Section B',
    grade: 'Grade 9',
    section: 'B',
    classTeacher: 'Samantha Reed',
    roomNumber: 'Room 102',
    studentCount: 26,
    capacity: 32
  },
  {
    id: 'CLS-10A',
    name: 'Grade 10 - Section A',
    grade: 'Grade 10',
    section: 'A',
    classTeacher: 'Dr. Evelyn Vance',
    roomNumber: 'Room 201',
    studentCount: 30,
    capacity: 30
  },
  {
    id: 'CLS-10B',
    name: 'Grade 10 - Section B',
    grade: 'Grade 10',
    section: 'B',
    classTeacher: 'Prof. Marcus Brody',
    roomNumber: 'Room 202',
    studentCount: 29,
    capacity: 32
  },
  {
    id: 'CLS-11A',
    name: 'Grade 11 - Section A',
    grade: 'Grade 11',
    section: 'A',
    classTeacher: 'Clara Harrison',
    roomNumber: 'Lab 301',
    studentCount: 25,
    capacity: 30
  },
  {
    id: 'CLS-12A',
    name: 'Grade 12 - Section A',
    grade: 'Grade 12',
    section: 'A',
    classTeacher: 'Dr. Evelyn Vance',
    roomNumber: 'Room 401',
    studentCount: 24,
    capacity: 28
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'SUB-101',
    code: 'MATH-10',
    name: 'Algebra II & Geometry',
    grade: 'Grade 10',
    teacherName: 'Dr. Evelyn Vance',
    credits: 4,
    weeklyHours: 5
  },
  {
    id: 'SUB-102',
    code: 'PHY-10',
    name: 'Physics Principles',
    grade: 'Grade 10',
    teacherName: 'Prof. Marcus Brody',
    credits: 4,
    weeklyHours: 4
  },
  {
    id: 'SUB-103',
    code: 'CS-11',
    name: 'Intro to Computer Science',
    grade: 'Grade 11',
    teacherName: 'Clara Harrison',
    credits: 3,
    weeklyHours: 4
  },
  {
    id: 'SUB-104',
    code: 'HIST-09',
    name: 'World Civilization & History',
    grade: 'Grade 9',
    teacherName: 'Jonathan Sterling',
    credits: 3,
    weeklyHours: 3
  },
  {
    id: 'SUB-105',
    code: 'ENG-11',
    name: 'American Literature',
    grade: 'Grade 11',
    teacherName: 'Samantha Reed',
    credits: 3,
    weeklyHours: 4
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  {
    id: 'TT-1',
    classId: 'CLS-10A',
    day: 'Monday',
    period: 1,
    timeSlot: '08:30 AM - 09:20 AM',
    subjectName: 'Algebra II & Geometry',
    teacherName: 'Dr. Evelyn Vance',
    roomNumber: 'Room 201'
  },
  {
    id: 'TT-2',
    classId: 'CLS-10A',
    day: 'Monday',
    period: 2,
    timeSlot: '09:25 AM - 10:15 AM',
    subjectName: 'Physics Principles',
    teacherName: 'Prof. Marcus Brody',
    roomNumber: 'Science Lab A'
  },
  {
    id: 'TT-3',
    classId: 'CLS-10A',
    day: 'Monday',
    period: 3,
    timeSlot: '10:30 AM - 11:20 AM',
    subjectName: 'Intro to Computer Science',
    teacherName: 'Clara Harrison',
    roomNumber: 'CS Lab 301'
  },
  {
    id: 'TT-4',
    classId: 'CLS-10A',
    day: 'Tuesday',
    period: 1,
    timeSlot: '08:30 AM - 09:20 AM',
    subjectName: 'World Civilization',
    teacherName: 'Jonathan Sterling',
    roomNumber: 'Room 201'
  },
  {
    id: 'TT-5',
    classId: 'CLS-10A',
    day: 'Tuesday',
    period: 2,
    timeSlot: '09:25 AM - 10:15 AM',
    subjectName: 'Algebra II & Geometry',
    teacherName: 'Dr. Evelyn Vance',
    roomNumber: 'Room 201'
  }
];

export const INITIAL_HOMEWORK: Homework[] = [
  {
    id: 'HW-501',
    classId: 'CLS-10A',
    className: 'Grade 10 - Section A',
    subject: 'Algebra II & Geometry',
    title: 'Quadratic Equations Practice Set #4',
    description: 'Complete problems 1 to 15 on page 142 of the textbook. Show all work clearly.',
    assignedDate: '2026-07-24',
    dueDate: '2026-07-28',
    teacherName: 'Dr. Evelyn Vance',
    submissionsCount: 22,
    totalStudents: 30,
    status: 'Active'
  },
  {
    id: 'HW-502',
    classId: 'CLS-11A',
    className: 'Grade 11 - Section A',
    subject: 'Intro to Computer Science',
    title: 'Python Array Manipulation Lab',
    description: 'Implement a script that filters and sorts list data according to student IDs.',
    assignedDate: '2026-07-22',
    dueDate: '2026-07-29',
    teacherName: 'Clara Harrison',
    submissionsCount: 18,
    totalStudents: 25,
    status: 'Active'
  },
  {
    id: 'HW-503',
    classId: 'CLS-10A',
    className: 'Grade 10 - Section A',
    subject: 'Physics Principles',
    title: 'Kinematics Motion Worksheet',
    description: 'Solve vector momentum problems and submit calculations via portal.',
    assignedDate: '2026-07-20',
    dueDate: '2026-07-25',
    teacherName: 'Prof. Marcus Brody',
    submissionsCount: 30,
    totalStudents: 30,
    status: 'Closed'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'ATT-1',
    date: '2026-07-25',
    studentId: 'STU-1001',
    studentName: 'Alexander Wright',
    rollNumber: '101',
    classId: 'CLS-10A',
    status: 'Present'
  },
  {
    id: 'ATT-2',
    date: '2026-07-25',
    studentId: 'STU-1002',
    studentName: 'Sophia Chen',
    rollNumber: '102',
    classId: 'CLS-10A',
    status: 'Present'
  },
  {
    id: 'ATT-3',
    date: '2026-07-25',
    studentId: 'STU-1003',
    studentName: 'Ethan Miller',
    rollNumber: '103',
    classId: 'CLS-10A',
    status: 'Late',
    notes: 'Arrived 15 mins late due to bus traffic'
  },
  {
    id: 'ATT-4',
    date: '2026-07-25',
    studentId: 'STU-1004',
    studentName: 'Emma Davis',
    rollNumber: '104',
    classId: 'CLS-11A',
    status: 'Present'
  },
  {
    id: 'ATT-5',
    date: '2026-07-25',
    studentId: 'STU-1005',
    studentName: 'Lucas Garcia',
    rollNumber: '105',
    classId: 'CLS-11A',
    status: 'Absent',
    notes: 'Sick leave call received'
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'EXM-801',
    title: 'Mid-Term Mathematics Assessment',
    grade: 'Grade 10',
    subject: 'Algebra II & Geometry',
    examDate: '2026-08-10',
    duration: '2 Hours',
    totalMarks: 100,
    passMarks: 40,
    status: 'Upcoming',
    roomNumber: 'Main Hall A'
  },
  {
    id: 'EXM-802',
    title: 'Physics Practical & Theory Test',
    grade: 'Grade 10',
    subject: 'Physics Principles',
    examDate: '2026-08-12',
    duration: '1.5 Hours',
    totalMarks: 75,
    passMarks: 30,
    status: 'Upcoming',
    roomNumber: 'Science Lab 2'
  },
  {
    id: 'EXM-803',
    title: 'Unit 1 Computer Programming Exam',
    grade: 'Grade 11',
    subject: 'Intro to Computer Science',
    examDate: '2026-07-15',
    duration: '1 Hour',
    totalMarks: 50,
    passMarks: 20,
    status: 'Completed',
    roomNumber: 'CS Lab 301'
  }
];

export const INITIAL_EXAM_MARKS: ExamMark[] = [
  {
    id: 'MRK-1',
    examId: 'EXM-803',
    studentId: 'STU-1004',
    studentName: 'Emma Davis',
    rollNumber: '104',
    marksObtained: 48,
    totalMarks: 50,
    grade: 'A+',
    remarks: 'Outstanding logical reasoning & clean code'
  },
  {
    id: 'MRK-2',
    examId: 'EXM-803',
    studentId: 'STU-1005',
    studentName: 'Lucas Garcia',
    rollNumber: '105',
    marksObtained: 38,
    totalMarks: 50,
    grade: 'B+',
    remarks: 'Good effort, review recursion'
  }
];

export const INITIAL_INVOICES: FeeInvoice[] = [
  {
    id: 'INV-9001',
    invoiceNo: 'HA-2026-0891',
    studentId: 'STU-1001',
    studentName: 'Alexander Wright',
    grade: 'Grade 10',
    amount: 1250,
    feeType: 'Tuition',
    dueDate: '2026-08-01',
    paidDate: '2026-07-10',
    status: 'Paid',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'INV-9002',
    invoiceNo: 'HA-2026-0892',
    studentId: 'STU-1002',
    studentName: 'Sophia Chen',
    grade: 'Grade 10',
    amount: 1250,
    feeType: 'Tuition',
    dueDate: '2026-08-01',
    paidDate: '2026-07-12',
    status: 'Paid',
    paymentMethod: 'Online Gateway'
  },
  {
    id: 'INV-9003',
    invoiceNo: 'HA-2026-0893',
    studentId: 'STU-1003',
    studentName: 'Ethan Miller',
    grade: 'Grade 10',
    amount: 1250,
    feeType: 'Tuition',
    dueDate: '2026-08-01',
    status: 'Pending'
  },
  {
    id: 'INV-9004',
    invoiceNo: 'HA-2026-0894',
    studentId: 'STU-1005',
    studentName: 'Lucas Garcia',
    grade: 'Grade 11',
    amount: 1350,
    feeType: 'Tuition',
    dueDate: '2026-07-01',
    status: 'Overdue'
  },
  {
    id: 'INV-9005',
    invoiceNo: 'HA-2026-0895',
    studentId: 'STU-1007',
    studentName: 'Liam Johnson',
    grade: 'Grade 9',
    amount: 350,
    feeType: 'Admission',
    dueDate: '2026-07-20',
    paidDate: '2026-07-18',
    status: 'Paid',
    paymentMethod: 'Bank Transfer'
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: 'PAR-301',
    name: 'David Wright',
    email: 'david.wright@example.com',
    phone: '+1 (555) 019-2800',
    occupation: 'Senior Systems Architect',
    childrenNames: ['Alexander Wright'],
    address: '42 Pine Street, San Francisco, CA',
    relationship: 'Father'
  },
  {
    id: 'PAR-302',
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    phone: '+1 (555) 019-2801',
    occupation: 'Financial Analyst',
    childrenNames: ['Sophia Chen'],
    address: '88 Oak Avenue, San Francisco, CA',
    relationship: 'Father'
  },
  {
    id: 'PAR-303',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    phone: '+1 (555) 019-2802',
    occupation: 'Pediatric Specialist',
    childrenNames: ['Ethan Miller'],
    address: '12 Maple Drive, San Francisco, CA',
    relationship: 'Mother'
  },
  {
    id: 'PAR-304',
    name: 'Elena Garcia',
    email: 'elena.garcia@example.com',
    phone: '+1 (555) 019-2804',
    occupation: 'Architectural Engineer',
    childrenNames: ['Lucas Garcia'],
    address: '77 Cedar Lane, San Francisco, CA',
    relationship: 'Mother'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'NTC-701',
    title: 'Annual Science & Robotics Fair 2026 Registration Open',
    content: 'Students from Grades 9-12 are invited to submit their STEM project proposals before August 15th. Submissions will be evaluated by guest judges from tech institutes.',
    date: '2026-07-24',
    category: 'Academic',
    audience: 'All',
    priority: 'High',
    author: 'Principal Office'
  },
  {
    id: 'NTC-702',
    title: 'Mid-Term Examinations Schedule Published',
    content: 'The official timetable for upcoming Mid-Term examinations has been released. Please review subject dates and room allocations on the Examination page.',
    date: '2026-07-22',
    category: 'Exam',
    audience: 'Students',
    priority: 'Urgent',
    author: 'Examination Controller'
  },
  {
    id: 'NTC-703',
    title: 'Parent-Teacher Orientation Conference',
    content: 'All parents are cordially invited to attend our fall semester orientation meeting on Saturday, August 8th in the main auditorium.',
    date: '2026-07-20',
    category: 'General',
    audience: 'Parents',
    priority: 'Normal',
    author: 'Administration'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter School',
    monthlyPrice: 149,
    yearlyPrice: 119,
    recommended: false,
    description: 'Perfect for small private academies and elementary schools scaling up digital operations.',
    maxStudents: 300,
    maxTeachers: 25,
    storage: '25 GB Cloud Storage',
    support: 'Standard Email Support (24h response)',
    features: [
      'Up to 300 Active Students',
      'Up to 25 Teacher Profiles',
      'Student & Teacher Directory',
      'Classroom & Timetable Management',
      'Attendance Tracking & Logs',
      'Fee Invoicing & Payment Receipts',
      'Basic Notice Board & Portal'
    ],
    modulesIncluded: ['Students', 'Teachers', 'Academics', 'Attendance', 'Fees']
  },
  {
    id: 'growth',
    name: 'Growth Academy',
    badge: 'MOST POPULAR',
    monthlyPrice: 299,
    yearlyPrice: 239,
    recommended: true,
    description: 'Comprehensive management engine for mid-sized K-12 schools and multi-branch academies.',
    maxStudents: 1200,
    maxTeachers: 80,
    storage: '100 GB Cloud Storage',
    support: 'Priority 24/7 Email & Live Chat',
    features: [
      'Up to 1,200 Active Students',
      'Up to 80 Teacher Profiles',
      'Everything in Starter Plan',
      'Examination & Grading Engine',
      'Parent Portal & Communication',
      'Detailed Financial & Performance Reports',
      'SMS & Email Alert Integration',
      'Role-based Permissions'
    ],
    modulesIncluded: ['Students', 'Teachers', 'Academics', 'Attendance', 'Examination', 'Fees', 'Parents', 'Notice Board', 'Reports']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Campus',
    badge: 'MAX PERFORMANCE',
    monthlyPrice: 599,
    yearlyPrice: 479,
    recommended: false,
    description: 'Unlimited capacity and dedicated support for large multi-campus institutions and school boards.',
    maxStudents: 10000,
    maxTeachers: 500,
    storage: '1 TB High-Speed Storage',
    support: 'Dedicated Account Manager & Phone',
    features: [
      'Unlimited Students & Teachers',
      'Multi-Campus Support',
      'All Growth Features Included',
      'Custom Domain & Brand Customization',
      'Automated Daily Cloud Backups',
      'Advanced Custom API Integrations',
      '99.99% SLA Uptime Guarantee',
      'Custom Report Builder'
    ],
    modulesIncluded: ['All Modules Unlocked', 'Multi-Campus', 'Custom API', 'SLA Support']
  }
];

export const INITIAL_SUPPORT_STAFF: SupportStaff[] = [
  {
    id: 'SUP-101',
    staffId: 'STF-101',
    name: 'Tariq Mahmood',
    role: 'Security Guard',
    department: 'Security',
    phone: '+1 (555) 234-8901',
    email: 'tariq.guard@horizon.edu',
    cnic: '42101-1234567-1',
    address: '42 Campus Security Barracks, West Wing',
    joinDate: '2021-03-15',
    status: 'Active',
    salary: 2800,
    shift: 'Morning',
    emergencyContact: 'Parveen Mahmood (+1 555 999-1122)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    notes: 'Main gate surveillance and visitor log supervision.'
  },
  {
    id: 'SUP-102',
    staffId: 'STF-102',
    name: 'Rashid Ali',
    role: 'Driver',
    department: 'Transportation',
    phone: '+1 (555) 345-9012',
    email: 'rashid.transport@horizon.edu',
    cnic: '42201-2345678-3',
    address: '78 Railway Colony, Block 4',
    joinDate: '2019-08-01',
    status: 'Active',
    salary: 3200,
    shift: 'Full Day',
    emergencyContact: 'Zahida Ali (+1 555 888-2233)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    notes: 'Bus Route #4 (North Campus Express). Commercial Driver License valid.'
  },
  {
    id: 'SUP-103',
    staffId: 'STF-103',
    name: 'Naseem Akhtar',
    role: 'Peon / Office Assistant',
    department: 'Administration',
    phone: '+1 (555) 456-0123',
    email: 'naseem.office@horizon.edu',
    cnic: '42301-3456789-5',
    address: '12 Staff Quarter B, Horizon Campus',
    joinDate: '2020-01-10',
    status: 'Active',
    salary: 2400,
    shift: 'Morning',
    emergencyContact: 'Kamran Akhtar (+1 555 777-3344)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    notes: 'Principal office dispatch, document filing, and staff refreshment setup.'
  },
  {
    id: 'SUP-104',
    staffId: 'STF-104',
    name: 'Bilquis Bano',
    role: 'Canteen Staff / Owner',
    department: 'Food Services',
    phone: '+1 (555) 567-1234',
    email: 'canteen@horizon.edu',
    cnic: '42401-4567890-7',
    address: '33 Green Park Apartments',
    joinDate: '2022-05-18',
    status: 'Active',
    salary: 3500,
    shift: 'Morning',
    emergencyContact: 'Saleem Bano (+1 555 666-4455)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    notes: 'Manages central cafeteria, meal hygiene compliance, and student lunch counters.'
  },
  {
    id: 'SUP-105',
    staffId: 'STF-105',
    name: 'Muhammad Usman',
    role: 'Janitor / Cleaner',
    department: 'Sanitation',
    phone: '+1 (555) 678-2345',
    cnic: '42501-5678901-9',
    address: '15 Civil Lines Quarter',
    joinDate: '2021-11-05',
    status: 'Active',
    salary: 2200,
    shift: 'Evening',
    emergencyContact: 'Ayesha Usman (+1 555 555-5566)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    notes: 'Science block & administrative wing sanitization shift supervisor.'
  },
  {
    id: 'SUP-106',
    staffId: 'STF-106',
    name: 'Aslam Khan',
    role: 'Gardener',
    department: 'Campus Maintenance',
    phone: '+1 (555) 789-3456',
    cnic: '42102-6789012-1',
    address: 'Block 9 Nursery Quarters',
    joinDate: '2018-02-20',
    status: 'Active',
    salary: 2300,
    shift: 'Morning',
    emergencyContact: 'Gul Khan (+1 555 444-6677)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    notes: 'In-charge of main sports lawn, botanical courtyard, and seasonal flower beds.'
  },
  {
    id: 'SUP-107',
    staffId: 'STF-107',
    name: 'Farhan Shah',
    role: 'Electrician',
    department: 'Campus Maintenance',
    phone: '+1 (555) 890-4567',
    email: 'farhan.electric@horizon.edu',
    cnic: '42202-7890123-3',
    address: '88 Model Town Lane 3',
    joinDate: '2022-09-01',
    status: 'Active',
    salary: 3100,
    shift: 'Full Day',
    emergencyContact: 'Sohail Shah (+1 555 333-7788)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    notes: 'Generator maintenance, solar grid monitoring, and HVAC repair technician.'
  },
  {
    id: 'SUP-108',
    staffId: 'STF-108',
    name: 'Ghulam Rasool',
    role: 'Plumber & Handyman',
    department: 'Campus Maintenance',
    phone: '+1 (555) 901-5678',
    cnic: '42302-8901234-5',
    address: '54 Service Line, East Gate',
    joinDate: '2023-01-15',
    status: 'Active',
    salary: 2600,
    shift: 'Morning',
    emergencyContact: 'Bilal Rasool (+1 555 222-8899)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    notes: 'Water tank filtration supervisor & washroom plumbing maintenance.'
  },
  {
    id: 'SUP-109',
    staffId: 'STF-109',
    name: 'Saima Parveen',
    role: 'Reception Assistant',
    department: 'Administration',
    phone: '+1 (555) 012-6789',
    email: 'saima.reception@horizon.edu',
    cnic: '42402-9012345-7',
    address: '102 Gulshan Heights, Apt 4B',
    joinDate: '2023-06-10',
    status: 'Active',
    salary: 2900,
    shift: 'Morning',
    emergencyContact: 'Tariq Parveen (+1 555 111-9900)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    notes: 'Front office visitor management, parent enquiry log, and incoming phone desk.'
  },
  {
    id: 'SUP-110',
    staffId: 'STF-110',
    name: 'Rafiq Ahmed',
    role: 'Transport Helper',
    department: 'Transportation',
    phone: '+1 (555) 123-7890',
    cnic: '42502-0123456-9',
    address: '22 Depot Road Quarters',
    joinDate: '2022-03-22',
    status: 'On Leave',
    salary: 2100,
    shift: 'Morning',
    emergencyContact: 'Shahida Ahmed (+1 555 000-1122)',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    notes: 'Student boarding assistance on Bus Route #2.'
  },
  {
    id: 'SUP-111',
    staffId: 'STF-111',
    name: 'Sikandar Hayat',
    role: 'Bus Driver',
    department: 'Transportation',
    phone: '+1 (555) 345-8811',
    email: 'sikandar.driver@horizon.edu',
    cnic: '42201-3344556-1',
    address: '45 Depot Road, San Francisco, CA',
    joinDate: '2020-04-10',
    status: 'Active',
    salary: 3300,
    shift: 'Morning',
    emergencyContact: 'Fatima Sikandar (+1 555 333-1100)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    notes: 'Primary driver for Morning Shift Bus A (Nursery & KG).'
  },
  {
    id: 'SUP-112',
    staffId: 'STF-112',
    name: 'Tariq Masood',
    role: 'Coaster Driver',
    department: 'Transportation',
    phone: '+1 (555) 456-9922',
    email: 'tariq.driver@horizon.edu',
    cnic: '42301-7788990-2',
    address: '88 Transit Plaza, San Francisco, CA',
    joinDate: '2021-08-15',
    status: 'Active',
    salary: 3400,
    shift: 'Full Day',
    emergencyContact: 'Zainab Masood (+1 555 444-2211)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    notes: 'Driver for Senior Shift Coaster D and Teacher Shuttle.'
  }
];

export const INITIAL_VEHICLES: TransportVehicle[] = [
  {
    id: 'VEH-101',
    vehicleName: 'Bus A - North Express',
    vehicleNumber: 'BUS-101',
    type: 'Bus',
    capacity: 40,
    assignedDriverId: 'SUP-102',
    assignedDriverName: 'Rashid Ali',
    routeId: 'ROUTE-101',
    routeName: 'Route 1 - North Campus (Model Town -> Campus)',
    status: 'Active'
  },
  {
    id: 'VEH-102',
    vehicleName: 'Bus B - West Coast',
    vehicleNumber: 'BUS-102',
    type: 'Bus',
    capacity: 35,
    assignedDriverId: 'SUP-111',
    assignedDriverName: 'Sikandar Hayat',
    routeId: 'ROUTE-102',
    routeName: 'Route 2 - West Bay & Sunset District',
    status: 'Active'
  },
  {
    id: 'VEH-103',
    vehicleName: 'Bus C - Junior Shuttle',
    vehicleNumber: 'BUS-103',
    type: 'Bus',
    capacity: 30,
    assignedDriverId: 'SUP-102',
    assignedDriverName: 'Rashid Ali',
    routeId: 'ROUTE-101',
    routeName: 'Route 1 - North Campus',
    status: 'Active'
  },
  {
    id: 'VEH-104',
    vehicleName: 'Bus D - Midtown Flyer',
    vehicleNumber: 'BUS-104',
    type: 'Coaster',
    capacity: 28,
    assignedDriverId: 'SUP-112',
    assignedDriverName: 'Tariq Masood',
    routeId: 'ROUTE-103',
    routeName: 'Route 3 - Midtown & Downtown Hub',
    status: 'Active'
  },
  {
    id: 'VEH-105',
    vehicleName: 'Bus E - East Suburbs',
    vehicleNumber: 'BUS-105',
    type: 'Bus',
    capacity: 42,
    assignedDriverId: 'SUP-111',
    assignedDriverName: 'Sikandar Hayat',
    routeId: 'ROUTE-104',
    routeName: 'Route 4 - East Hills & Heights',
    status: 'Active'
  },
  {
    id: 'VEH-106',
    vehicleName: 'Bus F - Senior Cruiser',
    vehicleNumber: 'BUS-106',
    type: 'Bus',
    capacity: 45,
    assignedDriverId: 'SUP-112',
    assignedDriverName: 'Tariq Masood',
    routeId: 'ROUTE-103',
    routeName: 'Route 3 - Midtown & Downtown Hub',
    status: 'Active'
  }
];

export const INITIAL_ROUTES: TransportRoute[] = [
  {
    id: 'ROUTE-101',
    routeName: 'Route 1 - North Campus',
    pickupPoints: 'Model Town -> Pine Street -> East Gate -> Main Campus',
    schoolArrivalTime: '07:45 AM',
    schoolDepartureTime: '11:00 AM / 02:00 PM',
    monthlyFare: 120
  },
  {
    id: 'ROUTE-102',
    routeName: 'Route 2 - West Bay & Sunset',
    pickupPoints: 'Sunset Blvd -> Ocean View -> West Bay -> Main Campus',
    schoolArrivalTime: '07:40 AM',
    schoolDepartureTime: '11:00 AM / 01:00 PM',
    monthlyFare: 140
  },
  {
    id: 'ROUTE-103',
    routeName: 'Route 3 - Midtown & Downtown Hub',
    pickupPoints: 'Downtown Terminal -> Civic Center -> Market St -> Campus',
    schoolArrivalTime: '07:30 AM',
    schoolDepartureTime: '01:00 PM / 02:00 PM',
    monthlyFare: 150
  },
  {
    id: 'ROUTE-104',
    routeName: 'Route 4 - East Hills & Heights',
    pickupPoints: 'Highland Avenue -> Valley Circle -> East Gate -> Campus',
    schoolArrivalTime: '07:35 AM',
    schoolDepartureTime: '11:00 AM / 02:00 PM',
    monthlyFare: 130
  }
];

export const INITIAL_STUDENT_TRANSPORTS: StudentTransport[] = [
  {
    id: 'ST-101',
    studentId: 'STU-1001',
    studentName: 'Alexander Wright',
    admissionId: '101',
    batch: '2026-2027',
    className: 'Class 10',
    timingShift: 'Senior Shift',
    schoolOffTime: '2:00 PM',
    pickupPoint: '42 Pine Street, San Francisco',
    routeId: 'ROUTE-101',
    routeName: 'Route 1 - North Campus',
    vehicleId: 'VEH-106',
    vehicleNumber: 'BUS-106',
    driverId: 'SUP-112',
    driverName: 'Tariq Masood',
    driverPhone: '+1 (555) 456-9922',
    departureTime: '07:15 AM',
    dropTime: '02:30 PM',
    status: 'Active',
    parentContact: 'David Wright (+1 555 019-2800)'
  },
  {
    id: 'ST-102',
    studentId: 'STU-1002',
    studentName: 'Sophia Chen',
    admissionId: '102',
    batch: '2026-2027',
    className: 'Class 10',
    timingShift: 'Senior Shift',
    schoolOffTime: '2:00 PM',
    pickupPoint: '88 Oak Avenue, San Francisco',
    routeId: 'ROUTE-102',
    routeName: 'Route 2 - West Bay & Sunset',
    vehicleId: 'VEH-106',
    vehicleNumber: 'BUS-106',
    driverId: 'SUP-112',
    driverName: 'Tariq Masood',
    driverPhone: '+1 (555) 456-9922',
    departureTime: '07:10 AM',
    dropTime: '02:35 PM',
    status: 'Active',
    parentContact: 'Marcus Chen (+1 555 019-2801)'
  },
  {
    id: 'ST-103',
    studentId: 'STU-1003',
    studentName: 'Ethan Miller',
    admissionId: '103',
    batch: '2026-2027',
    className: 'Class 3',
    timingShift: 'Second Shift',
    schoolOffTime: '1:00 PM',
    pickupPoint: '12 Maple Drive, San Francisco',
    routeId: 'ROUTE-103',
    routeName: 'Route 3 - Midtown & Downtown Hub',
    vehicleId: 'VEH-104',
    vehicleNumber: 'BUS-104',
    driverId: 'SUP-112',
    driverName: 'Tariq Masood',
    driverPhone: '+1 (555) 456-9922',
    departureTime: '07:25 AM',
    dropTime: '01:25 PM',
    status: 'Active',
    parentContact: 'Sarah Miller (+1 555 019-2802)'
  },
  {
    id: 'ST-104',
    studentId: 'STU-1004',
    studentName: 'Emma Davis',
    admissionId: '104',
    batch: '2026-2027',
    className: 'Nursery',
    timingShift: 'Morning Shift',
    schoolOffTime: '11:00 AM',
    pickupPoint: '55 Cedar Street, San Francisco',
    routeId: 'ROUTE-101',
    routeName: 'Route 1 - North Campus',
    vehicleId: 'VEH-101',
    vehicleNumber: 'BUS-101',
    driverId: 'SUP-102',
    driverName: 'Rashid Ali',
    driverPhone: '+1 (555) 345-9012',
    departureTime: '07:30 AM',
    dropTime: '11:25 AM',
    status: 'Active',
    parentContact: 'Robert Davis (+1 555 019-2803)'
  },
  {
    id: 'ST-105',
    studentId: 'STU-1005',
    studentName: 'Lucas Wilson',
    admissionId: '105',
    batch: '2026-2027',
    className: 'KG',
    timingShift: 'Morning Shift',
    schoolOffTime: '11:00 AM',
    pickupPoint: '77 Birch Lane, San Francisco',
    routeId: 'ROUTE-102',
    routeName: 'Route 2 - West Bay & Sunset',
    vehicleId: 'VEH-102',
    vehicleNumber: 'BUS-102',
    driverId: 'SUP-111',
    driverName: 'Sikandar Hayat',
    driverPhone: '+1 (555) 345-8811',
    departureTime: '07:20 AM',
    dropTime: '11:30 AM',
    status: 'Active',
    parentContact: 'Emily Wilson (+1 555 019-2804)'
  }
];

export const INITIAL_TEACHER_TRANSPORTS: TeacherTransport[] = [
  {
    id: 'TT-101',
    teacherId: 'TCH-1001',
    teacherName: 'Dr. Robert Harrison',
    empId: 'EMP-201',
    department: 'Science',
    pickupLocation: '300 University Avenue, Apt 12',
    routeId: 'ROUTE-101',
    routeName: 'Route 1 - North Campus',
    vehicleId: 'VEH-101',
    vehicleNumber: 'BUS-101',
    driverId: 'SUP-102',
    driverName: 'Rashid Ali',
    driverPhone: '+1 (555) 345-9012',
    pickupTime: '07:15 AM',
    dropTime: '03:15 PM',
    status: 'Active'
  },
  {
    id: 'TT-102',
    teacherId: 'TCH-1002',
    teacherName: 'Maria Rodriguez',
    empId: 'EMP-202',
    department: 'Mathematics',
    pickupLocation: '145 Sunset Blvd, Apt 5B',
    routeId: 'ROUTE-102',
    routeName: 'Route 2 - West Bay & Sunset',
    vehicleId: 'VEH-104',
    vehicleNumber: 'BUS-104',
    driverId: 'SUP-112',
    driverName: 'Tariq Masood',
    driverPhone: '+1 (555) 456-9922',
    pickupTime: '07:20 AM',
    dropTime: '03:20 PM',
    status: 'Active'
  }
];
