import React, { useState, useMemo } from 'react';
import {
  StudentTransport,
  TeacherTransport,
  TransportVehicle,
  TransportRoute,
  SupportStaff,
  Student,
  Teacher,
  NavigationItem
} from '../../types';
import {
  Bus,
  Search,
  Plus,
  Filter,
  Users,
  UserCheck,
  Route as RouteIcon,
  Clock,
  MapPin,
  Phone,
  Shield,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  Sparkles,
  Building,
  Calendar,
  Briefcase,
  LayoutGrid,
  ListFilter
} from 'lucide-react';

interface TransportViewProps {
  studentTransports: StudentTransport[];
  teacherTransports: TeacherTransport[];
  vehicles: TransportVehicle[];
  routes: TransportRoute[];
  supportStaff: SupportStaff[];
  students: Student[];
  teachers: Teacher[];
  activeTab?: NavigationItem;
  onNavigateTab?: (nav: NavigationItem) => void;
  onAddStudentTransport: (st: StudentTransport) => void;
  onUpdateStudentTransport: (st: StudentTransport) => void;
  onDeleteStudentTransport: (id: string) => void;
  onAddTeacherTransport: (tt: TeacherTransport) => void;
  onUpdateTeacherTransport: (tt: TeacherTransport) => void;
  onDeleteTeacherTransport: (id: string) => void;
  onAddVehicle: (v: TransportVehicle) => void;
  onUpdateVehicle: (v: TransportVehicle) => void;
  onDeleteVehicle: (id: string) => void;
  onAddRoute: (r: TransportRoute) => void;
  onUpdateRoute: (r: TransportRoute) => void;
  onDeleteRoute: (id: string) => void;
}

export const TransportView: React.FC<TransportViewProps> = ({
  studentTransports,
  teacherTransports,
  vehicles,
  routes,
  supportStaff,
  students,
  teachers,
  activeTab = 'student-transport',
  onNavigateTab,
  onAddStudentTransport,
  onUpdateStudentTransport,
  onDeleteStudentTransport,
  onAddTeacherTransport,
  onUpdateTeacherTransport,
  onDeleteTeacherTransport,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onAddRoute,
  onUpdateRoute,
  onDeleteRoute
}) => {
  // Main section state: 'students' | 'teachers' | 'vehicles' | 'routes'
  const [currentSection, setCurrentSection] = useState<'students' | 'teachers' | 'vehicles' | 'routes'>(
    activeTab === 'teacher-transport' ? 'teachers' : 'students'
  );

  // Search & Filter States
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [shiftFilter, setShiftFilter] = useState<string>('All');
  const [batchFilter, setBatchFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [routeFilter, setRouteFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudentTransport, setEditingStudentTransport] = useState<StudentTransport | null>(null);

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacherTransport, setEditingTeacherTransport] = useState<TeacherTransport | null>(null);

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<TransportVehicle | null>(null);

  const [showRouteModal, setShowRouteModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<TransportRoute | null>(null);

  const [viewDetailsModal, setViewDetailsModal] = useState<{
    type: 'student' | 'teacher' | 'vehicle' | 'route';
    data: any;
  } | null>(null);

  // Fetch Drivers dynamically from Support Staff (Role includes Driver or department is Transportation)
  const availableDrivers = useMemo(() => {
    return supportStaff.filter((s) => {
      const roleMatch = s.role.toLowerCase().includes('driver');
      const deptMatch = s.department.toLowerCase().includes('transport');
      return (roleMatch || deptMatch) && s.status !== 'Inactive';
    });
  }, [supportStaff]);

  // Sync drivers info to transports if support staff info updated
  const getDriverDetails = (driverId: string) => {
    const driver = supportStaff.find((s) => s.id === driverId);
    if (driver) {
      return {
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        role: driver.role,
        status: driver.status
      };
    }
    return {
      id: driverId,
      name: 'Unassigned',
      phone: 'N/A',
      role: 'Driver',
      status: 'Active'
    };
  };

  // Student Transports Filtered
  const filteredStudentTransports = useMemo(() => {
    return studentTransports.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.studentName.toLowerCase().includes(query) ||
        item.admissionId.toLowerCase().includes(query) ||
        item.pickupPoint.toLowerCase().includes(query) ||
        item.routeName.toLowerCase().includes(query) ||
        item.vehicleNumber.toLowerCase().includes(query) ||
        item.driverName.toLowerCase().includes(query);

      const matchesShift = shiftFilter === 'All' || item.timingShift === shiftFilter;
      const matchesBatch = batchFilter === 'All' || item.batch === batchFilter;
      const matchesClass = classFilter === 'All' || item.className === classFilter;
      const matchesRoute = routeFilter === 'All' || item.routeId === routeFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      return matchesSearch && matchesShift && matchesBatch && matchesClass && matchesRoute && matchesStatus;
    });
  }, [studentTransports, searchQuery, shiftFilter, batchFilter, classFilter, routeFilter, statusFilter]);

  // Teacher Transports Filtered
  const filteredTeacherTransports = useMemo(() => {
    return teacherTransports.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.teacherName.toLowerCase().includes(query) ||
        item.empId.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.pickupLocation.toLowerCase().includes(query) ||
        item.routeName.toLowerCase().includes(query) ||
        item.vehicleNumber.toLowerCase().includes(query) ||
        item.driverName.toLowerCase().includes(query);

      const matchesRoute = routeFilter === 'All' || item.routeId === routeFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      return matchesSearch && matchesRoute && matchesStatus;
    });
  }, [teacherTransports, searchQuery, routeFilter, statusFilter]);

  // Vehicles Filtered
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const query = searchQuery.toLowerCase();
      return (
        v.vehicleName.toLowerCase().includes(query) ||
        v.vehicleNumber.toLowerCase().includes(query) ||
        (v.assignedDriverName && v.assignedDriverName.toLowerCase().includes(query)) ||
        (v.routeName && v.routeName.toLowerCase().includes(query))
      );
    });
  }, [vehicles, searchQuery]);

  // Routes Filtered
  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      const query = searchQuery.toLowerCase();
      return (
        r.routeName.toLowerCase().includes(query) ||
        r.pickupPoints.toLowerCase().includes(query)
      );
    });
  }, [routes, searchQuery]);

  // Counts by Shift
  const shiftCounts = useMemo(() => {
    const morning = studentTransports.filter((s) => s.timingShift === 'Morning Shift').length;
    const second = studentTransports.filter((s) => s.timingShift === 'Second Shift').length;
    const senior = studentTransports.filter((s) => s.timingShift === 'Senior Shift').length;
    return { morning, second, senior, total: studentTransports.length };
  }, [studentTransports]);

  // Form State for Student Transport
  const [studentFormData, setStudentFormData] = useState<Partial<StudentTransport>>({
    studentId: '',
    studentName: '',
    admissionId: '',
    batch: '2026-2027',
    className: 'Class 1',
    timingShift: 'Morning Shift',
    schoolOffTime: '11:00 AM',
    pickupPoint: '',
    routeId: routes[0]?.id || '',
    routeName: routes[0]?.routeName || '',
    vehicleId: vehicles[0]?.id || '',
    vehicleNumber: vehicles[0]?.vehicleNumber || '',
    driverId: availableDrivers[0]?.id || '',
    driverName: availableDrivers[0]?.name || '',
    driverPhone: availableDrivers[0]?.phone || '',
    departureTime: '07:30 AM',
    dropTime: '11:30 AM',
    status: 'Active',
    parentContact: ''
  });

  // Form State for Teacher Transport
  const [teacherFormData, setTeacherFormData] = useState<Partial<TeacherTransport>>({
    teacherId: '',
    teacherName: '',
    empId: '',
    department: 'General',
    pickupLocation: '',
    routeId: routes[0]?.id || '',
    routeName: routes[0]?.routeName || '',
    vehicleId: vehicles[0]?.id || '',
    vehicleNumber: vehicles[0]?.vehicleNumber || '',
    driverId: availableDrivers[0]?.id || '',
    driverName: availableDrivers[0]?.name || '',
    driverPhone: availableDrivers[0]?.phone || '',
    pickupTime: '07:15 AM',
    dropTime: '03:15 PM',
    status: 'Active'
  });

  // Form State for Vehicle
  const [vehicleFormData, setVehicleFormData] = useState<Partial<TransportVehicle>>({
    vehicleName: '',
    vehicleNumber: '',
    type: 'Bus',
    capacity: 40,
    assignedDriverId: availableDrivers[0]?.id || '',
    assignedDriverName: availableDrivers[0]?.name || '',
    routeId: routes[0]?.id || '',
    routeName: routes[0]?.routeName || '',
    status: 'Active'
  });

  // Form State for Route
  const [routeFormData, setRouteFormData] = useState<Partial<TransportRoute>>({
    routeName: '',
    pickupPoints: '',
    schoolArrivalTime: '07:45 AM',
    schoolDepartureTime: '02:00 PM',
    monthlyFare: 120
  });

  // Handlers for Student Modal
  const openAddStudentModal = () => {
    setEditingStudentTransport(null);
    const defaultStudent = students[0];
    const defaultRoute = routes[0];
    const defaultVehicle = vehicles[0];
    const defaultDriver = availableDrivers[0];

    setStudentFormData({
      studentId: defaultStudent?.id || '',
      studentName: defaultStudent ? `${defaultStudent.firstName} ${defaultStudent.lastName}` : '',
      admissionId: defaultStudent?.rollNumber || '',
      batch: '2026-2027',
      className: defaultStudent?.grade || 'Class 1',
      timingShift: 'Morning Shift',
      schoolOffTime: '11:00 AM',
      pickupPoint: defaultStudent?.address || 'Main Road Stop',
      routeId: defaultRoute?.id || '',
      routeName: defaultRoute?.routeName || '',
      vehicleId: defaultVehicle?.id || '',
      vehicleNumber: defaultVehicle?.vehicleNumber || '',
      driverId: defaultDriver?.id || '',
      driverName: defaultDriver?.name || '',
      driverPhone: defaultDriver?.phone || '',
      departureTime: '07:30 AM',
      dropTime: '11:30 AM',
      status: 'Active',
      parentContact: defaultStudent ? `${defaultStudent.parentName} (${defaultStudent.parentPhone})` : ''
    });
    setShowStudentModal(true);
  };

  const openEditStudentModal = (st: StudentTransport) => {
    setEditingStudentTransport(st);
    setStudentFormData({ ...st });
    setShowStudentModal(true);
  };

  const handleSaveStudentTransport = (e: React.FormEvent) => {
    e.preventDefault();
    const selRoute = routes.find((r) => r.id === studentFormData.routeId);
    const selVehicle = vehicles.find((v) => v.id === studentFormData.vehicleId);
    const selDriver = supportStaff.find((s) => s.id === studentFormData.driverId);

    const payload: StudentTransport = {
      id: editingStudentTransport ? editingStudentTransport.id : `ST-${Date.now()}`,
      studentId: studentFormData.studentId || 'STU-NEW',
      studentName: studentFormData.studentName || 'Student Name',
      admissionId: studentFormData.admissionId || '101',
      batch: studentFormData.batch || '2026-2027',
      className: studentFormData.className || 'Class 1',
      timingShift: studentFormData.timingShift as any || 'Morning Shift',
      schoolOffTime:
        studentFormData.timingShift === 'Morning Shift'
          ? '11:00 AM'
          : studentFormData.timingShift === 'Second Shift'
          ? '1:00 PM'
          : '2:00 PM',
      pickupPoint: studentFormData.pickupPoint || 'Central Stop',
      routeId: studentFormData.routeId || selRoute?.id || '',
      routeName: selRoute?.routeName || studentFormData.routeName || 'Default Route',
      vehicleId: studentFormData.vehicleId || selVehicle?.id || '',
      vehicleNumber: selVehicle?.vehicleNumber || studentFormData.vehicleNumber || 'BUS-01',
      driverId: selDriver?.id || studentFormData.driverId || '',
      driverName: selDriver?.name || studentFormData.driverName || 'Driver Name',
      driverPhone: selDriver?.phone || studentFormData.driverPhone || 'N/A',
      departureTime: studentFormData.departureTime || '07:30 AM',
      dropTime: studentFormData.dropTime || '01:30 PM',
      status: (studentFormData.status as any) || 'Active',
      parentContact: studentFormData.parentContact || 'N/A'
    };

    if (editingStudentTransport) {
      onUpdateStudentTransport(payload);
    } else {
      onAddStudentTransport(payload);
    }
    setShowStudentModal(false);
  };

  // Handlers for Teacher Modal
  const openAddTeacherModal = () => {
    setEditingTeacherTransport(null);
    const defaultTeacher = teachers[0];
    const defaultRoute = routes[0];
    const defaultVehicle = vehicles[0];
    const defaultDriver = availableDrivers[0];

    setTeacherFormData({
      teacherId: defaultTeacher?.id || '',
      teacherName: defaultTeacher?.name || '',
      empId: defaultTeacher?.empId || '',
      department: defaultTeacher?.department || 'General',
      pickupLocation: 'Faculty Plaza Stop',
      routeId: defaultRoute?.id || '',
      routeName: defaultRoute?.routeName || '',
      vehicleId: defaultVehicle?.id || '',
      vehicleNumber: defaultVehicle?.vehicleNumber || '',
      driverId: defaultDriver?.id || '',
      driverName: defaultDriver?.name || '',
      driverPhone: defaultDriver?.phone || '',
      pickupTime: '07:15 AM',
      dropTime: '03:15 PM',
      status: 'Active'
    });
    setShowTeacherModal(true);
  };

  const openEditTeacherModal = (tt: TeacherTransport) => {
    setEditingTeacherTransport(tt);
    setTeacherFormData({ ...tt });
    setShowTeacherModal(true);
  };

  const handleSaveTeacherTransport = (e: React.FormEvent) => {
    e.preventDefault();
    const selRoute = routes.find((r) => r.id === teacherFormData.routeId);
    const selVehicle = vehicles.find((v) => v.id === teacherFormData.vehicleId);
    const selDriver = supportStaff.find((s) => s.id === teacherFormData.driverId);

    const payload: TeacherTransport = {
      id: editingTeacherTransport ? editingTeacherTransport.id : `TT-${Date.now()}`,
      teacherId: teacherFormData.teacherId || 'TCH-NEW',
      teacherName: teacherFormData.teacherName || 'Teacher Name',
      empId: teacherFormData.empId || 'EMP-100',
      department: teacherFormData.department || 'General',
      pickupLocation: teacherFormData.pickupLocation || 'Main Stop',
      routeId: teacherFormData.routeId || selRoute?.id || '',
      routeName: selRoute?.routeName || teacherFormData.routeName || 'Default Route',
      vehicleId: teacherFormData.vehicleId || selVehicle?.id || '',
      vehicleNumber: selVehicle?.vehicleNumber || teacherFormData.vehicleNumber || 'BUS-01',
      driverId: selDriver?.id || teacherFormData.driverId || '',
      driverName: selDriver?.name || teacherFormData.driverName || 'Driver Name',
      driverPhone: selDriver?.phone || teacherFormData.driverPhone || 'N/A',
      pickupTime: teacherFormData.pickupTime || '07:15 AM',
      dropTime: teacherFormData.dropTime || '03:15 PM',
      status: (teacherFormData.status as any) || 'Active'
    };

    if (editingTeacherTransport) {
      onUpdateTeacherTransport(payload);
    } else {
      onAddTeacherTransport(payload);
    }
    setShowTeacherModal(false);
  };

  // Handlers for Vehicle Modal
  const openAddVehicleModal = () => {
    setEditingVehicle(null);
    const defaultDriver = availableDrivers[0];
    const defaultRoute = routes[0];

    setVehicleFormData({
      vehicleName: '',
      vehicleNumber: '',
      type: 'Bus',
      capacity: 40,
      assignedDriverId: defaultDriver?.id || '',
      assignedDriverName: defaultDriver?.name || '',
      routeId: defaultRoute?.id || '',
      routeName: defaultRoute?.routeName || '',
      status: 'Active'
    });
    setShowVehicleModal(true);
  };

  const openEditVehicleModal = (v: TransportVehicle) => {
    setEditingVehicle(v);
    setVehicleFormData({ ...v });
    setShowVehicleModal(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const selDriver = supportStaff.find((s) => s.id === vehicleFormData.assignedDriverId);
    const selRoute = routes.find((r) => r.id === vehicleFormData.routeId);

    const payload: TransportVehicle = {
      id: editingVehicle ? editingVehicle.id : `VEH-${Date.now()}`,
      vehicleName: vehicleFormData.vehicleName || 'School Shuttle',
      vehicleNumber: vehicleFormData.vehicleNumber || 'BUS-999',
      type: (vehicleFormData.type as any) || 'Bus',
      capacity: Number(vehicleFormData.capacity) || 30,
      assignedDriverId: selDriver?.id || vehicleFormData.assignedDriverId,
      assignedDriverName: selDriver?.name || vehicleFormData.assignedDriverName,
      routeId: selRoute?.id || vehicleFormData.routeId,
      routeName: selRoute?.routeName || vehicleFormData.routeName,
      status: (vehicleFormData.status as any) || 'Active'
    };

    if (editingVehicle) {
      onUpdateVehicle(payload);
    } else {
      onAddVehicle(payload);
    }
    setShowVehicleModal(false);
  };

  // Handlers for Route Modal
  const openAddRouteModal = () => {
    setEditingRoute(null);
    setRouteFormData({
      routeName: '',
      pickupPoints: '',
      schoolArrivalTime: '07:45 AM',
      schoolDepartureTime: '02:00 PM',
      monthlyFare: 120
    });
    setShowRouteModal(true);
  };

  const openEditRouteModal = (r: TransportRoute) => {
    setEditingRoute(r);
    setRouteFormData({ ...r });
    setShowRouteModal(true);
  };

  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TransportRoute = {
      id: editingRoute ? editingRoute.id : `ROUTE-${Date.now()}`,
      routeName: routeFormData.routeName || 'New Route',
      pickupPoints: routeFormData.pickupPoints || 'Central Stops',
      schoolArrivalTime: routeFormData.schoolArrivalTime || '07:45 AM',
      schoolDepartureTime: routeFormData.schoolDepartureTime || '02:00 PM',
      monthlyFare: Number(routeFormData.monthlyFare) || 120
    };

    if (editingRoute) {
      onUpdateRoute(payload);
    } else {
      onAddRoute(payload);
    }
    setShowRouteModal(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-100">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#EAF2EC] text-[#2C633E]">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Transport Management</h1>
              <p className="text-sm text-gray-500">
                Manage student & teacher bus routes, schedules, vehicles, and support staff drivers.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button depending on active section */}
        <div className="flex items-center space-x-2">
          {currentSection === 'students' && (
            <button
              onClick={openAddStudentModal}
              className="px-4 py-2 bg-[#2C633E] text-white rounded-xl text-sm font-semibold hover:bg-[#235032] transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Assign Student Transport</span>
            </button>
          )}

          {currentSection === 'teachers' && (
            <button
              onClick={openAddTeacherModal}
              className="px-4 py-2 bg-[#2C633E] text-white rounded-xl text-sm font-semibold hover:bg-[#235032] transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Assign Teacher Transport</span>
            </button>
          )}

          {currentSection === 'vehicles' && (
            <button
              onClick={openAddVehicleModal}
              className="px-4 py-2 bg-[#2C633E] text-white rounded-xl text-sm font-semibold hover:bg-[#235032] transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          )}

          {currentSection === 'routes' && (
            <button
              onClick={openAddRouteModal}
              className="px-4 py-2 bg-[#2C633E] text-white rounded-xl text-sm font-semibold hover:bg-[#235032] transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Route</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Section Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 overflow-x-auto pb-0">
        <button
          onClick={() => {
            setCurrentSection('students');
            if (onNavigateTab) onNavigateTab('student-transport');
          }}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            currentSection === 'students'
              ? 'border-[#2C633E] text-[#2C633E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Transport</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-[#EAF2EC] text-[#2C633E] font-bold">
            {studentTransports.length}
          </span>
        </button>

        <button
          onClick={() => {
            setCurrentSection('teachers');
            if (onNavigateTab) onNavigateTab('teacher-transport');
          }}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            currentSection === 'teachers'
              ? 'border-[#2C633E] text-[#2C633E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Teacher Transport</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-bold">
            {teacherTransports.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentSection('vehicles')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            currentSection === 'vehicles'
              ? 'border-[#2C633E] text-[#2C633E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Vehicles & Fleet</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-bold">
            {vehicles.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentSection('routes')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            currentSection === 'routes'
              ? 'border-[#2C633E] text-[#2C633E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <RouteIcon className="w-4 h-4" />
          <span>Routes & Schedules</span>
          <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-bold">
            {routes.length}
          </span>
        </button>
      </div>

      {/* Driver Integration Banner Info */}
      <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/60 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-900">
        <div className="flex items-center space-x-2.5">
          <Shield className="w-4 h-4 text-[#2C633E] shrink-0" />
          <span>
            <strong>Support Staff Integration:</strong> Driver assignments are linked live with the{' '}
            <span className="font-semibold text-[#2C633E]">Support Staff (Role = Driver)</span> module.
            Currently <strong>{availableDrivers.length} verified drivers</strong> available.
          </span>
        </div>
        <span className="text-[11px] font-medium text-emerald-700 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200/50 shrink-0">
          Auto-Synced
        </span>
      </div>

      {/* ==================== SECTION 1: STUDENT TRANSPORT ==================== */}
      {currentSection === 'students' && (
        <div className="space-y-6">


          {/* Filters and Search Bar */}
          <div className="p-4 bg-white border border-gray-200/80 rounded-2xl space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student, admission ID, route, bus, pickup point..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500 font-medium">Timing/Shift:</span>
                  <select
                    value={shiftFilter}
                    onChange={(e) => setShiftFilter(e.target.value)}
                    className="bg-transparent font-semibold text-[#2C633E] focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Shifts</option>
                    <option value="Morning Shift">Morning (11:00 AM)</option>
                    <option value="Second Shift">Second (1:00 PM)</option>
                    <option value="Senior Shift">Senior (2:00 PM)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-[#3px] bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs">
                  <RouteIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500 font-medium">Route:</span>
                  <select
                    value={routeFilter}
                    onChange={(e) => setRouteFilter(e.target.value)}
                    className="bg-transparent font-semibold text-[#2C633E] focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Routes</option>
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.routeName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-[#2C633E] shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'table' ? 'bg-white text-[#2C633E] shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Table View"
                  >
                    <ListFilter className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* DISPLAY: GRID CARDS VIEW or TABLE VIEW */}
          {viewMode === 'grid' ? (
            filteredStudentTransports.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-400 font-medium shadow-sm">
                No student transport records found matching the criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredStudentTransports.map((item) => {
                  const driverInfo = getDriverDetails(item.driverId);
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-[#2C633E]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-[#EAF2EC] text-[#2C633E] flex items-center justify-center font-bold shrink-0 ring-2 ring-gray-100">
                              <Bus className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.studentName}</h3>
                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                                  #{item.admissionId}
                                </span>
                              </div>
                              <p className="text-xs text-[#2C633E] font-semibold mt-0.5">{item.className} • Batch {item.batch}</p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              item.status === 'Active' || item.status === 'Assigned'
                                ? 'bg-emerald-50 text-emerald-700'
                                : item.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Shift & Off Time:</span>
                            <span className="font-semibold text-gray-800 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-amber-600 mr-1" />
                              {item.timingShift} ({item.schoolOffTime})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Pickup Point:</span>
                            <span className="font-semibold text-gray-900 truncate max-w-[170px]">{item.pickupPoint}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Route Name:</span>
                            <span className="font-medium text-gray-800 truncate max-w-[170px]">{item.routeName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Vehicle & Driver:</span>
                            <span className="font-semibold text-gray-900">{item.vehicleNumber} ({driverInfo.name})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Parent Contact:</span>
                            <span className="font-semibold text-gray-900">{item.parentContact || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => setViewDetailsModal({ type: 'student', data: item })}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#F8F9FC] hover:bg-[#EAF2EC] text-gray-700 hover:text-[#2C633E] rounded-xl font-semibold transition-all border border-gray-200 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => openEditStudentModal(item)}
                            className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteStudentTransport(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Student Transports Table */
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200 text-[10px]">
                    <tr>
                      <th className="px-4 py-3.5">Student & Admission</th>
                      <th className="px-4 py-3.5">Batch & Class</th>
                      <th className="px-4 py-3.5">Shift & Off Time</th>
                      <th className="px-4 py-3.5">Pickup & Route</th>
                      <th className="px-4 py-3.5">Vehicle & Driver (Staff)</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5">Parent Contact</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudentTransports.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-gray-400 font-medium">
                          No student transport records found matching the criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredStudentTransports.map((item) => {
                        const driverInfo = getDriverDetails(item.driverId);
                        return (
                          <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="font-bold text-gray-900">{item.studentName}</div>
                              <div className="text-[10px] text-gray-400 font-mono">ID: #{item.admissionId}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="font-semibold text-gray-900">{item.className}</div>
                              <div className="text-[11px] text-[#2C633E] font-medium">Batch {item.batch}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.timingShift === 'Morning Shift'
                                    ? 'bg-amber-50 text-amber-700'
                                    : item.timingShift === 'Second Shift'
                                    ? 'bg-sky-50 text-sky-700'
                                    : 'bg-indigo-50 text-indigo-700'
                                }`}
                              >
                                <Clock className="w-3 h-3" />
                                <span>{item.timingShift}</span>
                              </span>
                              <div className="text-[11px] text-gray-500 mt-1 font-medium">
                                Off: <span className="font-bold text-gray-700">{item.schoolOffTime}</span>
                              </div>
                            </td>

                            <td className="px-4 py-3 max-w-xs whitespace-nowrap">
                              <div className="text-xs font-semibold text-gray-900 truncate flex items-center space-x-1">
                                <MapPin className="w-3.5 h-3.5 text-[#2C633E] shrink-0" />
                                <span className="truncate">{item.pickupPoint}</span>
                              </div>
                              <div className="text-[11px] text-gray-500 truncate">{item.routeName}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-xs font-bold text-gray-900 flex items-center space-x-1">
                                <Bus className="w-3.5 h-3.5 text-[#2C633E]" />
                                <span>{item.vehicleNumber}</span>
                              </div>
                              <div className="text-[11px] text-gray-600 mt-0.5 flex items-center space-x-1">
                                <Briefcase className="w-3 h-3 text-gray-400" />
                                <span className="font-medium">{driverInfo.name}</span>
                              </div>
                              <div className="text-[10px] text-gray-400 font-mono">{driverInfo.phone}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status === 'Active' || item.status === 'Assigned'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : item.status === 'Pending'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900">
                              {item.parentContact || 'N/A'}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <button
                                  onClick={() => setViewDetailsModal({ type: 'student', data: item })}
                                  className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openEditStudentModal(item)}
                                  className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => onDeleteStudentTransport(item.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== SECTION 2: TEACHER TRANSPORT ==================== */}
      {currentSection === 'teachers' && (
        <div className="space-y-6">
          {/* Filters and Search Bar */}
          <div className="p-4 bg-white border border-gray-200/80 rounded-2xl space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search teacher, employee ID, department, pickup location, vehicle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs">
                  <RouteIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500 font-medium">Route:</span>
                  <select
                    value={routeFilter}
                    onChange={(e) => setRouteFilter(e.target.value)}
                    className="bg-transparent font-semibold text-[#2C633E] focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Routes</option>
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.routeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent font-semibold text-[#2C633E] focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-[#2C633E] shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'table' ? 'bg-white text-[#2C633E] shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Table View"
                  >
                    <ListFilter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DISPLAY: GRID CARDS VIEW or TABLE VIEW */}
          {viewMode === 'grid' ? (
            filteredTeacherTransports.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-400 font-medium shadow-sm">
                No teacher transport assignments found matching the criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTeacherTransports.map((item) => {
                  const driverInfo = getDriverDetails(item.driverId);
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-[#2C633E]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-[#EAF2EC] text-[#2C633E] flex items-center justify-center font-bold shrink-0 ring-2 ring-gray-100">
                              <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.teacherName}</h3>
                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                                  #{item.empId}
                                </span>
                              </div>
                              <p className="text-xs text-[#2C633E] font-semibold mt-0.5">{item.department}</p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              item.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700'
                                : item.status === 'On Leave'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Pickup Location:</span>
                            <span className="font-semibold text-gray-900 truncate max-w-[170px]">{item.pickupLocation}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Route & Vehicle:</span>
                            <span className="font-medium text-gray-800 truncate max-w-[170px]">{item.routeName} ({item.vehicleNumber})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Assigned Driver:</span>
                            <span className="font-semibold text-gray-900">{driverInfo.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Pickup / Drop Time:</span>
                            <span className="font-semibold text-gray-900">{item.pickupTime} / {item.dropTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => setViewDetailsModal({ type: 'teacher', data: item })}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#F8F9FC] hover:bg-[#EAF2EC] text-gray-700 hover:text-[#2C633E] rounded-xl font-semibold transition-all border border-gray-200 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => openEditTeacherModal(item)}
                            className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteTeacherTransport(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Teacher Transports Table */
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200 text-[10px]">
                    <tr>
                      <th className="px-4 py-3.5">Teacher Name & Emp ID</th>
                      <th className="px-4 py-3.5">Department</th>
                      <th className="px-4 py-3.5">Pickup Location</th>
                      <th className="px-4 py-3.5">Route & Vehicle</th>
                      <th className="px-4 py-3.5">Assigned Driver (Staff)</th>
                      <th className="px-4 py-3.5">Pickup / Drop Time</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTeacherTransports.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-gray-400 font-medium">
                          No teacher transport assignments found matching the criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredTeacherTransports.map((item) => {
                        const driverInfo = getDriverDetails(item.driverId);
                        return (
                          <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="font-bold text-gray-900">{item.teacherName}</div>
                              <div className="text-[10px] text-gray-400 font-mono">Emp ID: #{item.empId}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
                              {item.department}
                            </td>

                            <td className="px-4 py-3 max-w-xs whitespace-nowrap">
                              <div className="text-xs font-semibold text-gray-900 truncate flex items-center space-x-1">
                                <MapPin className="w-3.5 h-3.5 text-[#2C633E] shrink-0" />
                                <span className="truncate">{item.pickupLocation}</span>
                              </div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-xs font-bold text-[#2C633E] flex items-center space-x-1">
                                <Bus className="w-3.5 h-3.5" />
                                <span>{item.vehicleNumber}</span>
                              </div>
                              <div className="text-[11px] text-gray-500 truncate">{item.routeName}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-xs font-semibold text-gray-900">{driverInfo.name}</div>
                              <div className="text-[10px] text-gray-400 font-mono">{driverInfo.phone}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-xs">
                              <div className="text-gray-900 font-semibold">Pick: {item.pickupTime}</div>
                              <div className="text-gray-500 text-[11px]">Drop: {item.dropTime}</div>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status === 'Active'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : item.status === 'On Leave'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <button
                                  onClick={() => setViewDetailsModal({ type: 'teacher', data: item })}
                                  className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openEditTeacherModal(item)}
                                  className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => onDeleteTeacherTransport(item.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== SECTION 3: VEHICLES & FLEET ==================== */}
      {currentSection === 'vehicles' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="p-4 bg-white border border-gray-200/80 rounded-2xl">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vehicle name, plate number, driver, route..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2C633E]"
              />
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map((vehicle) => {
              const driverInfo = vehicle.assignedDriverId
                ? getDriverDetails(vehicle.assignedDriverId)
                : null;

              return (
                <div
                  key={vehicle.id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-[#EAF2EC] text-[#2C633E]">
                          <Bus className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{vehicle.vehicleName}</h3>
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                            {vehicle.vehicleNumber}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          vehicle.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : vehicle.status === 'Under Maintenance'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </div>

                    <div className="space-y-2 my-4 text-xs text-gray-600">
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Vehicle Type:</span>
                        <span className="font-semibold text-gray-800">{vehicle.type}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Passenger Capacity:</span>
                        <span className="font-semibold text-gray-800">{vehicle.capacity} Seats</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Assigned Driver:</span>
                        <span className="font-semibold text-[#2C633E]">
                          {driverInfo ? driverInfo.name : vehicle.assignedDriverName || 'None'}
                        </span>
                      </div>
                      <div className="py-1">
                        <span className="text-gray-500 block mb-0.5">Assigned Route:</span>
                        <span className="font-medium text-gray-800 text-xs block truncate">
                          {vehicle.routeName || 'Unassigned'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openEditVehicleModal(vehicle)}
                      className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteVehicle(vehicle.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== SECTION 4: ROUTES & SCHEDULES ==================== */}
      {currentSection === 'routes' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="p-4 bg-white border border-gray-200/80 rounded-2xl">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search route name, pickup points..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2C633E]"
              />
            </div>
          </div>

          {/* Routes Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-[#2C633E]">
                        <RouteIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{route.routeName}</h3>
                        <span className="text-xs text-gray-400 font-mono">ID: {route.id}</span>
                      </div>
                    </div>

                    {route.monthlyFare && (
                      <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-xl">
                        ${route.monthlyFare}/mo
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 my-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                        Pickup & Stop Points
                      </span>
                      <p className="text-xs text-gray-800 leading-relaxed flex items-start space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#2C633E] mt-0.5 shrink-0" />
                        <span>{route.pickupPoints}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 block mb-0.5">School Arrival</span>
                        <span className="font-bold text-gray-800">{route.schoolArrivalTime}</span>
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 block mb-0.5">School Departure</span>
                        <span className="font-bold text-gray-800">{route.schoolDepartureTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openEditRouteModal(route)}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteRoute(route.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl cursor-pointer transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== MODAL: STUDENT TRANSPORT ==================== */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingStudentTransport ? 'Edit Student Transport' : 'Assign Student Transport'}
              </h2>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentTransport} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Select Student</label>
                  <select
                    value={studentFormData.studentId}
                    onChange={(e) => {
                      const sel = students.find((s) => s.id === e.target.value);
                      if (sel) {
                        setStudentFormData((prev) => ({
                          ...prev,
                          studentId: sel.id,
                          studentName: `${sel.firstName} ${sel.lastName}`,
                          admissionId: sel.rollNumber,
                          className: sel.grade,
                          pickupPoint: sel.address || prev.pickupPoint,
                          parentContact: `${sel.parentName} (${sel.parentPhone})`
                        }));
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName} (Roll #{s.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Academic Batch</label>
                  <input
                    type="text"
                    value={studentFormData.batch}
                    onChange={(e) => setStudentFormData({ ...studentFormData, batch: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Class</label>
                  <input
                    type="text"
                    value={studentFormData.className}
                    onChange={(e) => setStudentFormData({ ...studentFormData, className: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">School Timing / Shift</label>
                  <select
                    value={studentFormData.timingShift}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      const offTime =
                        val === 'Morning Shift' ? '11:00 AM' : val === 'Second Shift' ? '1:00 PM' : '2:00 PM';
                      setStudentFormData({ ...studentFormData, timingShift: val, schoolOffTime: offTime });
                    }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="Morning Shift">Morning Shift (Nursery, KG, Class 1 - Off 11:00 AM)</option>
                    <option value="Second Shift">Second Shift (Class 2, 3, 4 - Off 1:00 PM)</option>
                    <option value="Senior Shift">Senior Shift (Class 5 to 10 - Off 2:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Pickup Point Address</label>
                <input
                  type="text"
                  value={studentFormData.pickupPoint}
                  onChange={(e) => setStudentFormData({ ...studentFormData, pickupPoint: e.target.value })}
                  placeholder="e.g. 42 Pine Street, Stop 3"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Assigned Route</label>
                  <select
                    value={studentFormData.routeId}
                    onChange={(e) => setStudentFormData({ ...studentFormData, routeId: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.routeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Assigned Vehicle</label>
                  <select
                    value={studentFormData.vehicleId}
                    onChange={(e) => setStudentFormData({ ...studentFormData, vehicleId: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.vehicleName} ({v.vehicleNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Driver from Support Staff */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <label className="block text-gray-800 font-semibold mb-1 flex items-center justify-between">
                  <span>Assigned Driver (Support Staff)</span>
                  <span className="text-[10px] text-[#2C633E] bg-[#EAF2EC] px-2 py-0.5 rounded-md font-bold">
                    Auto-Linked
                  </span>
                </label>
                <select
                  value={studentFormData.driverId}
                  onChange={(e) => setStudentFormData({ ...studentFormData, driverId: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                >
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.role} • {d.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Pickup Time</label>
                  <input
                    type="text"
                    value={studentFormData.departureTime}
                    onChange={(e) => setStudentFormData({ ...studentFormData, departureTime: e.target.value })}
                    placeholder="07:30 AM"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Drop Time</label>
                  <input
                    type="text"
                    value={studentFormData.dropTime}
                    onChange={(e) => setStudentFormData({ ...studentFormData, dropTime: e.target.value })}
                    placeholder="11:30 AM"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Parent Contact</label>
                <input
                  type="text"
                  value={studentFormData.parentContact}
                  onChange={(e) => setStudentFormData({ ...studentFormData, parentContact: e.target.value })}
                  placeholder="e.g. David Wright (+1 555 019-2800)"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2C633E] hover:bg-[#235032] text-white rounded-xl font-medium cursor-pointer"
                >
                  {editingStudentTransport ? 'Update Assignment' : 'Assign Transport'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: TEACHER TRANSPORT ==================== */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingTeacherTransport ? 'Edit Teacher Transport' : 'Assign Teacher Transport'}
              </h2>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacherTransport} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Select Teacher</label>
                  <select
                    value={teacherFormData.teacherId}
                    onChange={(e) => {
                      const sel = teachers.find((t) => t.id === e.target.value);
                      if (sel) {
                        setTeacherFormData((prev) => ({
                          ...prev,
                          teacherId: sel.id,
                          teacherName: sel.name,
                          empId: sel.empId,
                          department: sel.department
                        }));
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.empId} • {t.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={teacherFormData.department}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Pickup Location Address</label>
                <input
                  type="text"
                  value={teacherFormData.pickupLocation}
                  onChange={(e) => setTeacherFormData({ ...teacherFormData, pickupLocation: e.target.value })}
                  placeholder="e.g. Faculty Plaza Stop, Sunset Blvd"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Assigned Route</label>
                  <select
                    value={teacherFormData.routeId}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, routeId: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.routeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Assigned Vehicle</label>
                  <select
                    value={teacherFormData.vehicleId}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, vehicleId: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.vehicleName} ({v.vehicleNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Driver from Support Staff */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <label className="block text-gray-800 font-semibold mb-1 flex items-center justify-between">
                  <span>Assigned Driver (Support Staff)</span>
                  <span className="text-[10px] text-[#2C633E] bg-[#EAF2EC] px-2 py-0.5 rounded-md font-bold">
                    Auto-Linked
                  </span>
                </label>
                <select
                  value={teacherFormData.driverId}
                  onChange={(e) => setTeacherFormData({ ...teacherFormData, driverId: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                >
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.role} • {d.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Pickup Time</label>
                  <input
                    type="text"
                    value={teacherFormData.pickupTime}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, pickupTime: e.target.value })}
                    placeholder="07:15 AM"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Drop Time</label>
                  <input
                    type="text"
                    value={teacherFormData.dropTime}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, dropTime: e.target.value })}
                    placeholder="03:15 PM"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowTeacherModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2C633E] hover:bg-[#235032] text-white rounded-xl font-medium cursor-pointer"
                >
                  {editingTeacherTransport ? 'Update Assignment' : 'Assign Transport'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: VEHICLE ==================== */}
      {showVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
              </h2>
              <button
                onClick={() => setShowVehicleModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Vehicle Name</label>
                <input
                  type="text"
                  value={vehicleFormData.vehicleName}
                  onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicleName: e.target.value })}
                  placeholder="e.g. Bus A - North Express"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Plate / Vehicle Number</label>
                  <input
                    type="text"
                    value={vehicleFormData.vehicleNumber}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicleNumber: e.target.value })}
                    placeholder="BUS-101"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Type</label>
                  <select
                    value={vehicleFormData.type}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="Bus">Bus</option>
                    <option value="Coaster">Coaster</option>
                    <option value="Van">Van</option>
                    <option value="Car">Car</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Seating Capacity</label>
                <input
                  type="number"
                  value={vehicleFormData.capacity}
                  onChange={(e) => setVehicleFormData({ ...vehicleFormData, capacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Assigned Driver (Support Staff)</label>
                <select
                  value={vehicleFormData.assignedDriverId}
                  onChange={(e) => setVehicleFormData({ ...vehicleFormData, assignedDriverId: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                >
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.role} • {d.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Assigned Route</label>
                <select
                  value={vehicleFormData.routeId}
                  onChange={(e) => setVehicleFormData({ ...vehicleFormData, routeId: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                >
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.routeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Vehicle Status</label>
                <select
                  value={vehicleFormData.status}
                  onChange={(e) => setVehicleFormData({ ...vehicleFormData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                >
                  <option value="Active">Active</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowVehicleModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2C633E] hover:bg-[#235032] text-white rounded-xl font-medium cursor-pointer"
                >
                  {editingVehicle ? 'Update Vehicle' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ROUTE ==================== */}
      {showRouteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingRoute ? 'Edit Route' : 'Add Route'}
              </h2>
              <button
                onClick={() => setShowRouteModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Route Name</label>
                <input
                  type="text"
                  value={routeFormData.routeName}
                  onChange={(e) => setRouteFormData({ ...routeFormData, routeName: e.target.value })}
                  placeholder="e.g. Route 5 - South Bay Express"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Pickup Points / Stops</label>
                <textarea
                  value={routeFormData.pickupPoints}
                  onChange={(e) => setRouteFormData({ ...routeFormData, pickupPoints: e.target.value })}
                  placeholder="Stop 1 -> Stop 2 -> Campus Gate"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">School Arrival Time</label>
                  <input
                    type="text"
                    value={routeFormData.schoolArrivalTime}
                    onChange={(e) => setRouteFormData({ ...routeFormData, schoolArrivalTime: e.target.value })}
                    placeholder="07:45 AM"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">School Departure Time</label>
                  <input
                    type="text"
                    value={routeFormData.schoolDepartureTime}
                    onChange={(e) => setRouteFormData({ ...routeFormData, schoolDepartureTime: e.target.value })}
                    placeholder="02:00 PM"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Monthly Fare ($)</label>
                <input
                  type="number"
                  value={routeFormData.monthlyFare}
                  onChange={(e) => setRouteFormData({ ...routeFormData, monthlyFare: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRouteModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2C633E] hover:bg-[#235032] text-white rounded-xl font-medium cursor-pointer"
                >
                  {editingRoute ? 'Update Route' : 'Save Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: VIEW DETAILS ==================== */}
      {viewDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-[#EAF2EC] text-[#2C633E]">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-snug">
                    Transport Assignment Details
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {viewDetailsModal.type === 'student' ? 'Student Bus Allocation' : 'Faculty Transport Service'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewDetailsModal(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {viewDetailsModal.type === 'student' && (() => {
                const data = viewDetailsModal.data;
                const driverInfo = getDriverDetails(data.driverId);
                return (
                  <div className="space-y-4">
                    {/* Primary Info Header Banner */}
                    <div className="p-4 bg-linear-to-r from-[#EAF2EC] to-emerald-50/40 border border-[#2C633E]/15 rounded-2xl flex items-center justify-between shadow-2xs">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#2C633E] text-white flex items-center justify-center font-bold text-base shadow-sm">
                          {data.studentName ? data.studentName.charAt(0) : 'S'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{data.studentName}</h3>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-[11px] text-[#2C633E] font-bold">{data.className}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-[10px] font-mono font-semibold text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200/60">
                              ID: #{data.admissionId}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                          data.status === 'Active' || data.status === 'Assigned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : data.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {data.status}
                      </span>
                    </div>

                    {/* Academic & Schedule Grid */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Schedule & Class Specs</h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Academic Batch</span>
                          <span className="font-bold text-gray-800 mt-0.5 block">{data.batch}</span>
                        </div>
                        <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Timing Shift</span>
                          <span className="font-bold text-gray-800 mt-0.5 block">{data.timingShift}</span>
                        </div>
                        <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">School Dismissal</span>
                          <span className="font-bold text-[#2C633E] mt-0.5 block">{data.schoolOffTime}</span>
                        </div>
                        <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Assigned Bus</span>
                          <span className="font-bold text-gray-800 mt-0.5 block">{data.vehicleNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route & Stop */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Location & Route</h4>
                      <div className="p-3.5 bg-gray-50/80 border border-gray-100 rounded-xl space-y-1.5">
                        <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                          <MapPin className="w-4 h-4 text-[#2C633E] shrink-0" />
                          <span>{data.pickupPoint}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-[11px] pl-6">
                          <RouteIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{data.routeName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Support Staff Driver */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Driver (Support Staff)</h4>
                      <div className="p-3.5 bg-[#F4F9F5] border border-[#2C633E]/20 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-[#2C633E]/10 text-[#2C633E] flex items-center justify-center font-bold">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{driverInfo.name}</p>
                            <p className="text-gray-500 font-mono text-[11px]">{driverInfo.phone}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#2C633E] bg-white px-2 py-1 rounded-lg border border-[#2C633E]/20 shadow-2xs">
                          {driverInfo.role}
                        </span>
                      </div>
                    </div>

                    {/* Parent Contact */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Guardian Contact</h4>
                      <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl font-semibold text-gray-900">
                        {data.parentContact || 'N/A'}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {viewDetailsModal.type === 'teacher' && (() => {
                const data = viewDetailsModal.data;
                const driverInfo = getDriverDetails(data.driverId);
                return (
                  <div className="space-y-4">
                    {/* Primary Info Header Banner */}
                    <div className="p-4 bg-linear-to-r from-sky-50 to-indigo-50/40 border border-sky-200/60 rounded-2xl flex items-center justify-between shadow-2xs">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-sky-700 text-white flex items-center justify-center font-bold text-base shadow-sm">
                          {data.teacherName ? data.teacherName.charAt(0) : 'T'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{data.teacherName}</h3>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-[11px] text-sky-800 font-bold">{data.department}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-[10px] font-mono font-semibold text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200/60">
                              Emp ID: #{data.empId}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                          data.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : data.status === 'On Leave'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {data.status}
                      </span>
                    </div>

                    {/* Schedule Grid */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Faculty Commute Hours</h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Pickup Time</span>
                          <span className="font-bold text-gray-900 mt-0.5 block">{data.pickupTime}</span>
                        </div>
                        <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">Drop Time</span>
                          <span className="font-bold text-gray-900 mt-0.5 block">{data.dropTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pickup Location & Route */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pickup Location</h4>
                      <div className="p-3.5 bg-gray-50/80 border border-gray-100 rounded-xl space-y-1.5">
                        <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                          <MapPin className="w-4 h-4 text-[#2C633E] shrink-0" />
                          <span>{data.pickupLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-[11px] pl-6">
                          <RouteIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{data.routeName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Driver & Vehicle */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Vehicle & Support Driver</h4>
                      <div className="p-3.5 bg-gray-50/80 border border-gray-100 rounded-xl space-y-2">
                        <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                          <span className="text-gray-500">Vehicle Assigned:</span>
                          <span className="font-bold text-gray-900 flex items-center space-x-1">
                            <Bus className="w-3.5 h-3.5 text-[#2C633E]" />
                            <span>{data.vehicleNumber}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-0.5">
                          <div>
                            <p className="font-bold text-gray-900">{driverInfo.name}</p>
                            <p className="text-gray-500 font-mono text-[10px]">{driverInfo.phone}</p>
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                            {driverInfo.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#F8F9FC] border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewDetailsModal(null)}
                className="px-5 py-2 bg-[#2C633E] hover:bg-[#235032] text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
