/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationItem, Student, Teacher, SupportStaff, AttendanceRecord, FeeInvoice, Notice, SchoolSettings, ToastMessage, ExamMark, Homework, Parent, StudentTransport, TeacherTransport, TransportVehicle, TransportRoute, UserSession } from './types';
import { isNavAllowed, DEMO_USERS } from './utils/rbac';
import {
  INITIAL_SETTINGS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_SUPPORT_STAFF,
  INITIAL_DEPARTMENTS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_TIMETABLE,
  INITIAL_HOMEWORK,
  INITIAL_ATTENDANCE,
  INITIAL_EXAMS,
  INITIAL_EXAM_MARKS,
  INITIAL_INVOICES,
  INITIAL_PARENTS,
  INITIAL_NOTICES,
  SUBSCRIPTION_PLANS,
  INITIAL_STUDENT_TRANSPORTS,
  INITIAL_TEACHER_TRANSPORTS,
  INITIAL_VEHICLES,
  INITIAL_ROUTES
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Toast } from './components/Toast';

import { DashboardView } from './components/views/DashboardView';
import { StudentsView } from './components/views/StudentsView';
import { TeachersView } from './components/views/TeachersView';
import { SupportStaffView } from './components/views/SupportStaffView';
import { AcademicsView } from './components/views/AcademicsView';
import { AttendanceView } from './components/views/AttendanceView';
import { ExaminationView } from './components/views/ExaminationView';
import { FeesView } from './components/views/FeesView';
import { AccountsView } from './components/views/AccountsView';
import { SalaryView } from './components/views/SalaryView';
import { ParentsView } from './components/views/ParentsView';
import { NoticeBoardView } from './components/views/NoticeBoardView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { SubscriptionView } from './components/views/SubscriptionView';
import { ProfileView } from './components/views/ProfileView';
import { TransportView } from './components/views/TransportView';
import { ActivitiesView } from './components/views/ActivitiesView';
import { LoginView } from './components/views/LoginView';
import { AccessDeniedView } from './components/views/AccessDeniedView';
import { applyTheme } from './utils/theme';

export default function App() {
  // Authentication & Session State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('sms_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null; // Default to login screen
  });

  // Navigation State
  const [currentNav, setCurrentNav] = useState<NavigationItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Helper to show toasts
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), title, message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Auth Handlers
  const handleLogin = (userSession: UserSession) => {
    setCurrentUser(userSession);
    setCurrentNav('dashboard');
    showToast('Login Successful', `Signed in as ${userSession.name} (${userSession.role.toUpperCase()})`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sms_user_session');
    showToast('Logged Out', 'Signed out successfully. Returned to login screen.', 'info');
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sms_user_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sms_user_session');
    }
  }, [currentUser]);

  // Persistent States initialized from localStorage or Mock Data
  const [settings, setSettings] = useState<SchoolSettings>(() => {
    const saved = localStorage.getItem('sms_settings');
    const parsed = saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    return {
      ...parsed,
      themePrimary: parsed.themePrimary || '#2E6640'
    };
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('sms_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('sms_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [supportStaff, setSupportStaff] = useState<SupportStaff[]>(() => {
    const saved = localStorage.getItem('sms_support_staff');
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_STAFF;
  });

  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => {
    const saved = localStorage.getItem('sms_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('sms_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('sms_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [examMarks, setExamMarks] = useState<ExamMark[]>(() => {
    const saved = localStorage.getItem('sms_exam_marks');
    return saved ? JSON.parse(saved) : INITIAL_EXAM_MARKS;
  });

  const [homeworkList, setHomeworkList] = useState<Homework[]>(() => {
    const saved = localStorage.getItem('sms_homework');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
  });

  const [parentsList, setParentsList] = useState<Parent[]>(() => {
    const saved = localStorage.getItem('sms_parents');
    return saved ? JSON.parse(saved) : INITIAL_PARENTS;
  });

  const [studentTransports, setStudentTransports] = useState<StudentTransport[]>(() => {
    const saved = localStorage.getItem('sms_student_transports');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_TRANSPORTS;
  });

  const [teacherTransports, setTeacherTransports] = useState<TeacherTransport[]>(() => {
    const saved = localStorage.getItem('sms_teacher_transports');
    return saved ? JSON.parse(saved) : INITIAL_TEACHER_TRANSPORTS;
  });

  const [vehicles, setVehicles] = useState<TransportVehicle[]>(() => {
    const saved = localStorage.getItem('sms_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [routes, setRoutes] = useState<TransportRoute[]>(() => {
    const saved = localStorage.getItem('sms_routes');
    return saved ? JSON.parse(saved) : INITIAL_ROUTES;
  });

  const [activePlanId, setActivePlanId] = useState<string>('growth');

  // LocalStorage Effects
  useEffect(() => {
    localStorage.setItem('sms_settings', JSON.stringify(settings));
  }, [settings]);

  // Dynamic Theme Switching Effect for Current Session
  useEffect(() => {
    applyTheme(settings.themePrimary || '#2E6640');
  }, [settings.themePrimary]);

  useEffect(() => {
    localStorage.setItem('sms_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sms_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('sms_support_staff', JSON.stringify(supportStaff));
  }, [supportStaff]);

  useEffect(() => {
    localStorage.setItem('sms_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('sms_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('sms_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('sms_exam_marks', JSON.stringify(examMarks));
  }, [examMarks]);

  useEffect(() => {
    localStorage.setItem('sms_homework', JSON.stringify(homeworkList));
  }, [homeworkList]);

  useEffect(() => {
    localStorage.setItem('sms_parents', JSON.stringify(parentsList));
  }, [parentsList]);

  useEffect(() => {
    localStorage.setItem('sms_student_transports', JSON.stringify(studentTransports));
  }, [studentTransports]);

  useEffect(() => {
    localStorage.setItem('sms_teacher_transports', JSON.stringify(teacherTransports));
  }, [teacherTransports]);

  useEffect(() => {
    localStorage.setItem('sms_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('sms_routes', JSON.stringify(routes));
  }, [routes]);

  // Transport Handlers
  const handleAddStudentTransport = (st: StudentTransport) => {
    setStudentTransports((prev) => [st, ...prev]);
    showToast('Transport Assigned', `Student transport assigned for ${st.studentName}.`);
  };

  const handleUpdateStudentTransport = (st: StudentTransport) => {
    setStudentTransports((prev) => prev.map((item) => (item.id === st.id ? st : item)));
    showToast('Transport Updated', `Updated assignment for ${st.studentName}.`);
  };

  const handleDeleteStudentTransport = (id: string) => {
    setStudentTransports((prev) => prev.filter((item) => item.id !== id));
    showToast('Transport Assignment Removed', 'Student transport assignment deleted.');
  };

  const handleAddTeacherTransport = (tt: TeacherTransport) => {
    setTeacherTransports((prev) => [tt, ...prev]);
    showToast('Teacher Transport Assigned', `Transport assigned for ${tt.teacherName}.`);
  };

  const handleUpdateTeacherTransport = (tt: TeacherTransport) => {
    setTeacherTransports((prev) => prev.map((item) => (item.id === tt.id ? tt : item)));
    showToast('Teacher Transport Updated', `Updated assignment for ${tt.teacherName}.`);
  };

  const handleDeleteTeacherTransport = (id: string) => {
    setTeacherTransports((prev) => prev.filter((item) => item.id !== id));
    showToast('Teacher Transport Removed', 'Teacher transport assignment deleted.');
  };

  const handleAddVehicle = (v: TransportVehicle) => {
    setVehicles((prev) => [v, ...prev]);
    showToast('Vehicle Added', `Vehicle ${v.vehicleName} (${v.vehicleNumber}) added.`);
  };

  const handleUpdateVehicle = (v: TransportVehicle) => {
    setVehicles((prev) => prev.map((item) => (item.id === v.id ? v : item)));
    showToast('Vehicle Updated', `Vehicle ${v.vehicleNumber} details updated.`);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((item) => item.id !== id));
    showToast('Vehicle Removed', 'Vehicle record deleted.');
  };

  const handleAddRoute = (r: TransportRoute) => {
    setRoutes((prev) => [r, ...prev]);
    showToast('Route Added', `New route ${r.routeName} created.`);
  };

  const handleUpdateRoute = (r: TransportRoute) => {
    setRoutes((prev) => prev.map((item) => (item.id === r.id ? r : item)));
    showToast('Route Updated', `Route ${r.routeName} updated.`);
  };

  const handleDeleteRoute = (id: string) => {
    setRoutes((prev) => prev.filter((item) => item.id !== id));
    showToast('Route Deleted', 'Route removed from system.');
  };

  // Actions
  const handleAddStudent = (newStu: Omit<Student, 'id'>) => {
    const created: Student = {
      ...newStu,
      id: `STU-${1000 + students.length + 1}`
    };
    setStudents((prev) => [created, ...prev]);
    showToast('Student Registered', `${created.firstName} ${created.lastName} added to student directory.`);
  };

  const handleUpdateStudent = (updatedStu: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStu.id ? updatedStu : s)));
    showToast('Record Updated', `Student ${updatedStu.firstName} ${updatedStu.lastName} updated.`);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student Deleted', 'Record removed from directory.', 'info');
  };

  const handleAddTeacher = (newTch: Omit<Teacher, 'id'>) => {
    const created: Teacher = {
      ...newTch,
      id: `TCH-${200 + teachers.length + 1}`
    };
    setTeachers((prev) => [created, ...prev]);
    showToast('Instructor Added', `${created.name} added to faculty list.`);
  };

  const handleAddSupportStaff = (newStaff: Omit<SupportStaff, 'id'>) => {
    const created: SupportStaff = {
      ...newStaff,
      id: `SUP-${Date.now()}`
    };
    setSupportStaff((prev) => [created, ...prev]);
    showToast('Support Employee Added', `${created.name} added to support staff directory.`);
  };

  const handleUpdateSupportStaff = (updatedStaff: SupportStaff) => {
    setSupportStaff((prev) => prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
    showToast('Record Updated', `Support employee ${updatedStaff.name} updated.`);
  };

  const handleDeleteSupportStaff = (id: string) => {
    setSupportStaff((prev) => prev.filter((s) => s.id !== id));
    showToast('Employee Removed', 'Support staff record removed from directory.', 'info');
  };

  const handleSaveAttendance = (records: AttendanceRecord[]) => {
    setAttendanceRecords((prev) => {
      const filtered = prev.filter(
        (r) => !records.some((nr) => nr.studentId === r.studentId && nr.date === r.date)
      );
      return [...records, ...filtered];
    });
    showToast('Attendance Logged', 'Class register saved successfully.');
  };

  const handleAddInvoice = (inv: Omit<FeeInvoice, 'id'>) => {
    const created: FeeInvoice = {
      ...inv,
      id: `INV-${Date.now()}`
    };
    setInvoices((prev) => [created, ...prev]);
    showToast('Invoice Issued', `Invoice ${created.invoiceNo} created for ${created.studentName}.`);
  };

  const handleUpdateInvoiceStatus = (invoiceId: string, status: 'Paid' | 'Pending' | 'Overdue') => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status, paidDate: status === 'Paid' ? new Date().toISOString().split('T')[0] : i.paidDate } : i))
    );
    showToast('Payment Updated', `Invoice status marked as ${status}.`);
  };

  const handleAddNotice = (notice: Omit<Notice, 'id'>) => {
    const created: Notice = {
      ...notice,
      id: `NTC-${Date.now()}`
    };
    setNotices((prev) => [created, ...prev]);
    showToast('Announcement Published', `Notice "${created.title}" broadcasted.`);
  };

  const handleAddExamMark = (mark: Omit<ExamMark, 'id'>) => {
    const created: ExamMark = {
      ...mark,
      id: `MRK-${Date.now()}`
    };
    setExamMarks((prev) => [created, ...prev]);
    showToast('Mark Recorded', `Score saved for ${created.studentName}.`);
  };

  const handleAddHomework = (hw: Omit<Homework, 'id'>) => {
    const created: Homework = {
      ...hw,
      id: `HW-${Date.now()}`
    };
    setHomeworkList((prev) => [created, ...prev]);
    showToast('Homework Published', `Assignment created for ${created.className}.`);
  };

  const handleAddParent = (p: Omit<Parent, 'id'>) => {
    const created: Parent = {
      ...p,
      id: `PAR-${Date.now()}`
    };
    setParentsList((prev) => [created, ...prev]);
    showToast('Parent Registered', `${created.name} profile created.`);
  };

  const handleUpgradePlan = (planId: string) => {
    setActivePlanId(planId);
    showToast('Subscription Upgraded!', 'Your school subscription plan has been successfully updated.', 'success');
  };

  // Render main view based on currentNav
  const renderCurrentView = () => {
    if (!currentUser) {
      return <LoginView onLogin={handleLogin} schoolName={settings.schoolName} />;
    }

    // RBAC Route Protection Guard
    if (!isNavAllowed(currentNav, currentUser.role)) {
      return (
        <AccessDeniedView
          user={currentUser}
          attemptedNav={currentNav}
          onGoHome={() => setCurrentNav('dashboard')}
        />
      );
    }

    switch (currentNav) {
      case 'dashboard':
        return (
          <DashboardView
            students={students}
            teachers={teachers}
            invoices={invoices}
            notices={notices}
            onNavigate={(nav) => setCurrentNav(nav)}
            schoolName={settings.schoolName}
            currentUser={currentUser}
          />
        );

      case 'all-students':
      case 'add-student':
      case 'admissions':
        return (
          <StudentsView
            students={students}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            activeTab={currentNav}
            onNavigateTab={(tab) => setCurrentNav(tab)}
            searchQuery={globalSearch}
          />
        );

      case 'all-teachers':
      case 'departments':
        return (
          <TeachersView
            teachers={teachers}
            departments={INITIAL_DEPARTMENTS}
            onAddTeacher={handleAddTeacher}
            activeTab={currentNav}
            onNavigateTab={(tab) => setCurrentNav(tab)}
          />
        );

      case 'support-staff':
        return (
          <SupportStaffView
            staffList={supportStaff}
            onAddStaff={handleAddSupportStaff}
            onUpdateStaff={handleUpdateSupportStaff}
            onDeleteStaff={handleDeleteSupportStaff}
            searchQuery={globalSearch}
          />
        );

      case 'classes':
      case 'subjects':
      case 'timetable':
      case 'homework':
        return (
          <AcademicsView
            classes={INITIAL_CLASSES}
            subjects={INITIAL_SUBJECTS}
            timetable={INITIAL_TIMETABLE}
            homework={homeworkList}
            onAddHomework={handleAddHomework}
            activeSubTab={currentNav}
            onNavigateSubTab={(tab) => setCurrentNav(tab)}
          />
        );

      case 'attendance':
        return (
          <AttendanceView
            students={students}
            classes={INITIAL_CLASSES}
            attendanceRecords={attendanceRecords}
            onSaveAttendance={handleSaveAttendance}
          />
        );

      case 'examination':
        return (
          <ExaminationView
            exams={INITIAL_EXAMS}
            marks={examMarks}
            students={students}
            onAddExamMark={handleAddExamMark}
          />
        );

      case 'accounts':
        return (
          <AccountsView
            invoices={invoices}
            students={students}
            teachers={teachers}
            supportStaff={supportStaff}
            onAddInvoice={handleAddInvoice}
            onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
            schoolName={settings.schoolName}
            currentUser={currentUser}
          />
        );

      case 'salary':
        return (
          <SalaryView
            currentUser={currentUser}
            teachers={teachers}
            schoolName={settings.schoolName}
          />
        );

      case 'fees':
        return (
          <FeesView
            invoices={invoices}
            students={students}
            onAddInvoice={handleAddInvoice}
            onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
            schoolName={settings.schoolName}
            currentUser={currentUser}
          />
        );

      case 'transport':
      case 'student-transport':
      case 'teacher-transport':
        return (
          <TransportView
            studentTransports={studentTransports}
            teacherTransports={teacherTransports}
            vehicles={vehicles}
            routes={routes}
            supportStaff={supportStaff}
            students={students}
            teachers={teachers}
            activeTab={currentNav}
            onNavigateTab={(tab) => setCurrentNav(tab)}
            onAddStudentTransport={handleAddStudentTransport}
            onUpdateStudentTransport={handleUpdateStudentTransport}
            onDeleteStudentTransport={handleDeleteStudentTransport}
            onAddTeacherTransport={handleAddTeacherTransport}
            onUpdateTeacherTransport={handleUpdateTeacherTransport}
            onDeleteTeacherTransport={handleDeleteTeacherTransport}
            onAddVehicle={handleAddVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            onAddRoute={handleAddRoute}
            onUpdateRoute={handleUpdateRoute}
            onDeleteRoute={handleDeleteRoute}
          />
        );

      case 'parents':
        return (
          <ParentsView
            parents={parentsList}
            onAddParent={handleAddParent}
          />
        );

      case 'activities':
        return <ActivitiesView />;

      case 'notice-board':
        return (
          <NoticeBoardView
            notices={notices}
            onAddNotice={handleAddNotice}
            currentUser={currentUser}
          />
        );

      case 'reports':
        return (
          <ReportsView
            students={students}
            teachers={teachers}
            invoices={invoices}
            attendanceRecords={attendanceRecords}
          />
        );

      case 'settings':
        return (
          <SettingsView
            settings={settings}
            onSaveSettings={(newSet) => {
              setSettings(newSet);
              showToast('Settings Saved', 'School information and preferences updated.');
            }}
          />
        );

      case 'subscription':
        return (
          <SubscriptionView
            plans={SUBSCRIPTION_PLANS}
            activePlanId={activePlanId}
            onUpgradePlan={handleUpgradePlan}
          />
        );

      case 'profile':
        return <ProfileView schoolName={settings.schoolName} />;

      default:
        return (
          <DashboardView
            students={students}
            teachers={teachers}
            invoices={invoices}
            notices={notices}
            onNavigate={(nav) => setCurrentNav(nav)}
            schoolName={settings.schoolName}
          />
        );
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] text-[#111827] font-sans antialiased selection:bg-[#2C633E]/20 selection:text-[#2C633E]">
        <LoginView onLogin={handleLogin} schoolName={settings.schoolName} />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#111827] flex flex-col lg:flex-row font-sans antialiased selection:bg-[#2C633E]/20 selection:text-[#2C633E]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentNav={currentNav}
        onNavigate={(nav) => setCurrentNav(nav)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        schoolName={settings.schoolName}
        userRole={currentUser.role}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <TopNav
          onNavigate={(nav) => setCurrentNav(nav)}
          searchQuery={globalSearch}
          onSearchChange={(q) => setGlobalSearch(q)}
          schoolName={settings.schoolName}
          currentUser={currentUser}
          onLogout={handleLogout}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-5 md:p-8 max-w-7xl w-full mx-auto min-w-0">
          {renderCurrentView()}
        </main>
      </div>

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
