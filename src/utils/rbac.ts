import { NavigationItem, UserRole, UserSession } from '../types';

export const DEMO_USERS: Record<UserRole, UserSession & { password: string }> = {
  admin: {
    role: 'admin',
    name: 'Sarah Jenkins',
    email: 'admin@school.com',
    password: 'admin123',
    title: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  accountant: {
    role: 'accountant',
    name: 'Marcus Vance',
    email: 'accountant@school.com',
    password: 'accountant123',
    title: 'Accountant / HR',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
  },
  teacher: {
    role: 'teacher',
    name: 'Robert Chen',
    email: 'teacher@school.com',
    password: 'teacher123',
    title: 'Senior Teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  student: {
    role: 'student',
    name: 'Alex Morgan',
    email: 'student@school.com',
    password: 'student123',
    title: 'Grade 10 Student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
  },
  parent: {
    role: 'parent',
    name: 'David Miller',
    email: 'parent@school.com',
    password: 'parent123',
    title: 'Parent (Leo Miller - Gr. 10)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
};

const ROLE_PERMISSIONS: Record<UserRole, NavigationItem[]> = {
  admin: [
    'dashboard',
    'all-students',
    'add-student',
    'admissions',
    'all-teachers',
    'departments',
    'classes',
    'subjects',
    'timetable',
    'homework',
    'support-staff',
    'attendance',
    'examination',
    'accounts',
    'transport',
    'student-transport',
    'teacher-transport',
    'activities',
    'parents',
    'notice-board',
    'reports',
    'settings',
    'subscription',
    'profile'
  ],
  accountant: [
    'dashboard',
    'accounts',
    'all-students',
    'all-teachers',
    'reports',
    'profile'
  ],
  teacher: [
    'dashboard',
    'classes',
    'subjects',
    'timetable',
    'homework',
    'all-students',
    'attendance',
    'examination',
    'accounts',
    'activities',
    'notice-board',
    'profile'
  ],
  student: [
    'dashboard',
    'profile',
    'subjects',
    'timetable',
    'homework',
    'attendance',
    'examination',
    'fees',
    'activities',
    'notice-board',
    'transport'
  ],
  parent: [
    'dashboard',
    'parents',
    'subjects',
    'timetable',
    'homework',
    'attendance',
    'examination',
    'reports',
    'fees',
    'transport',
    'activities',
    'notice-board',
    'profile'
  ]
};

export const isNavAllowed = (nav: string, role?: string | null): boolean => {
  if (!role) return false;
  const validRole = role as UserRole;
  const permissions = ROLE_PERMISSIONS[validRole];
  if (!permissions) return false;
  return permissions.includes(nav as NavigationItem);
};

export const getRoleAllowedNavItems = (role: UserRole): NavigationItem[] => {
  return ROLE_PERMISSIONS[role] || [];
};
