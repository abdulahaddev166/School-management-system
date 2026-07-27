import React, { useState } from 'react';
import { ClassRoom, Subject, TimetableSlot, Homework } from '../../types';
import {
  BookOpen,
  Calendar,
  Clock,
  Plus,
  FileText,
  User,
  MapPin,
  CheckCircle,
  X
} from 'lucide-react';

interface AcademicsViewProps {
  classes: ClassRoom[];
  subjects: Subject[];
  timetable: TimetableSlot[];
  homework: Homework[];
  onAddHomework: (hw: Omit<Homework, 'id'>) => void;
  activeSubTab: 'classes' | 'subjects' | 'timetable' | 'homework';
  onNavigateSubTab: (tab: 'classes' | 'subjects' | 'timetable' | 'homework') => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({
  classes,
  subjects,
  timetable,
  homework,
  onAddHomework,
  activeSubTab,
  onNavigateSubTab
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);

  // Dynamically fetch all Grade/Class options from Academics -> Classes prop
  const gradeOptions = Array.from(
    new Set(
      classes
        .map((c) => c.grade || c.name)
        .filter((g): g is string => Boolean(g && g.trim() !== ''))
    )
  );

  const effectiveGrade =
    selectedGrade && gradeOptions.includes(selectedGrade)
      ? selectedGrade
      : gradeOptions[0] || 'Grade 9';

  const SUBJECT_REPOSITORY: Record<string, Subject[]> = {
    'Nursery': [
      { id: 'SUB-NUR-1', code: 'NUR-ENG', name: 'English Alphabet & Phonics', grade: 'Nursery', teacherName: 'Samantha Reed', credits: 2, weeklyHours: 4 },
      { id: 'SUB-NUR-2', code: 'NUR-MATH', name: 'Numbers & Counting', grade: 'Nursery', teacherName: 'Dr. Evelyn Vance', credits: 2, weeklyHours: 4 },
      { id: 'SUB-NUR-3', code: 'NUR-ART', name: 'Art & Craft Exploration', grade: 'Nursery', teacherName: 'Clara Harrison', credits: 1, weeklyHours: 3 },
      { id: 'SUB-NUR-4', code: 'NUR-GA', name: 'General Awareness & Rhymes', grade: 'Nursery', teacherName: 'Jonathan Sterling', credits: 1, weeklyHours: 3 },
      { id: 'SUB-NUR-5', code: 'NUR-PE', name: 'Physical Activity & Play', grade: 'Nursery', teacherName: 'Prof. Marcus Brody', credits: 1, weeklyHours: 2 }
    ],
    'KG': [
      { id: 'SUB-KG-1', code: 'KG-ENG', name: 'English Reading & Writing', grade: 'KG', teacherName: 'Samantha Reed', credits: 2, weeklyHours: 4 },
      { id: 'SUB-KG-2', code: 'KG-MATH', name: 'Basic Mathematics & Shapes', grade: 'KG', teacherName: 'Dr. Evelyn Vance', credits: 2, weeklyHours: 4 },
      { id: 'SUB-KG-3', code: 'KG-EVS', name: 'Environmental Studies', grade: 'KG', teacherName: 'Prof. Marcus Brody', credits: 2, weeklyHours: 3 },
      { id: 'SUB-KG-4', code: 'KG-URD', name: 'Urdu Language & Storytelling', grade: 'KG', teacherName: 'Jonathan Sterling', credits: 2, weeklyHours: 3 },
      { id: 'SUB-KG-5', code: 'KG-ART', name: 'Drawing & Creative Arts', grade: 'KG', teacherName: 'Clara Harrison', credits: 1, weeklyHours: 2 }
    ],
    'Class 1': [
      { id: 'SUB-C1-1', code: 'C1-ENG', name: 'English Grammar & Reader', grade: 'Class 1', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C1-2', code: 'C1-MATH', name: 'Elementary Mathematics', grade: 'Class 1', teacherName: 'Dr. Evelyn Vance', credits: 3, weeklyHours: 5 },
      { id: 'SUB-C1-3', code: 'C1-SCI', name: 'General Science & Nature', grade: 'Class 1', teacherName: 'Prof. Marcus Brody', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C1-4', code: 'C1-URD', name: 'Urdu Primary Reader', grade: 'Class 1', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C1-5', code: 'C1-CS', name: 'Computer Literacy & Basics', grade: 'Class 1', teacherName: 'Clara Harrison', credits: 2, weeklyHours: 3 }
    ],
    'Class 2': [
      { id: 'SUB-C2-1', code: 'C2-ENG', name: 'English Reading & Comprehension', grade: 'Class 2', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C2-2', code: 'C2-MATH', name: 'Primary Arithmetic & Shapes', grade: 'Class 2', teacherName: 'Dr. Evelyn Vance', credits: 3, weeklyHours: 5 },
      { id: 'SUB-C2-3', code: 'C2-SCI', name: 'Science Fundamentals', grade: 'Class 2', teacherName: 'Prof. Marcus Brody', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C2-4', code: 'C2-ISL', name: 'Islamiat & Moral Values', grade: 'Class 2', teacherName: 'Jonathan Sterling', credits: 2, weeklyHours: 3 },
      { id: 'SUB-C2-5', code: 'C2-CS', name: 'Computer Skills & Logic', grade: 'Class 2', teacherName: 'Clara Harrison', credits: 2, weeklyHours: 3 }
    ],
    'Class 3': [
      { id: 'SUB-C3-1', code: 'C3-ENG', name: 'English Language & Literature', grade: 'Class 3', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C3-2', code: 'C3-MATH', name: 'Primary Mathematics & Multiplication', grade: 'Class 3', teacherName: 'Dr. Evelyn Vance', credits: 3, weeklyHours: 5 },
      { id: 'SUB-C3-3', code: 'C3-SCI', name: 'General Science & Observation', grade: 'Class 3', teacherName: 'Prof. Marcus Brody', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C3-4', code: 'C3-SST', name: 'Social Studies & Geography', grade: 'Class 3', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 3 },
      { id: 'SUB-C3-5', code: 'C3-CS', name: 'Computer Applications & Typing', grade: 'Class 3', teacherName: 'Clara Harrison', credits: 2, weeklyHours: 3 }
    ],
    'Class 4': [
      { id: 'SUB-C4-1', code: 'C4-ENG', name: 'English Composition & Grammar', grade: 'Class 4', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C4-2', code: 'C4-MATH', name: 'Intermediate Mathematics & Fractions', grade: 'Class 4', teacherName: 'Dr. Evelyn Vance', credits: 3, weeklyHours: 5 },
      { id: 'SUB-C4-3', code: 'C4-SCI', name: 'Environmental & Natural Science', grade: 'Class 4', teacherName: 'Prof. Marcus Brody', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C4-4', code: 'C4-SST', name: 'Social Studies & Local History', grade: 'Class 4', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 3 },
      { id: 'SUB-C4-5', code: 'C4-CS', name: 'Information Technology Fundamentals', grade: 'Class 4', teacherName: 'Clara Harrison', credits: 2, weeklyHours: 3 }
    ],
    'Class 5': [
      { id: 'SUB-C5-1', code: 'C5-ENG', name: 'English Language Arts', grade: 'Class 5', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C5-2', code: 'C5-MATH', name: 'Advanced Primary Mathematics', grade: 'Class 5', teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C5-3', code: 'C5-SCI', name: 'General Science & Experiments', grade: 'Class 5', teacherName: 'Prof. Marcus Brody', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C5-4', code: 'C5-SST', name: 'Social Studies & World Culture', grade: 'Class 5', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 3 },
      { id: 'SUB-C5-5', code: 'C5-CS', name: 'Computer Programming & Scratch Coding', grade: 'Class 5', teacherName: 'Clara Harrison', credits: 3, weeklyHours: 3 }
    ],
    'Class 6': [
      { id: 'SUB-C6-1', code: 'C6-ENG', name: 'English Literature & Prose', grade: 'Class 6', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C6-2', code: 'C6-MATH', name: 'Middle School Mathematics & Decimals', grade: 'Class 6', teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C6-3', code: 'C6-SCI', name: 'Integrated Science (Physics, Chem, Bio)', grade: 'Class 6', teacherName: 'Prof. Marcus Brody', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C6-4', code: 'C6-HIST', name: 'History & Geography of Ancient Civilizations', grade: 'Class 6', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C6-5', code: 'C6-CS', name: 'Computer Science & Office Productivity', grade: 'Class 6', teacherName: 'Clara Harrison', credits: 3, weeklyHours: 3 }
    ],
    'Class 7': [
      { id: 'SUB-C7-1', code: 'C7-ENG', name: 'English Grammar & Creative Writing', grade: 'Class 7', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C7-2', code: 'C7-MATH', name: 'Pre-Algebra & Geometry Concepts', grade: 'Class 7', teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C7-3', code: 'C7-SCI', name: 'General Science Lab & Inquiry', grade: 'Class 7', teacherName: 'Prof. Marcus Brody', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C7-4', code: 'C7-GEO', name: 'Medieval World History & Geography', grade: 'Class 7', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C7-5', code: 'C7-CS', name: 'Intro to Web & Computer Science', grade: 'Class 7', teacherName: 'Clara Harrison', credits: 3, weeklyHours: 3 }
    ],
    'Class 8': [
      { id: 'SUB-C8-1', code: 'C8-ENG', name: 'English Literature & Drama Studies', grade: 'Class 8', teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C8-2', code: 'C8-MATH', name: 'Algebra & Coordinate Geometry', grade: 'Class 8', teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C8-3', code: 'C8-SCI', name: 'Physical Science & Biology Foundations', grade: 'Class 8', teacherName: 'Prof. Marcus Brody', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C8-4', code: 'C8-CIV', name: 'Modern History, Civics & Governance', grade: 'Class 8', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C8-5', code: 'C8-CS', name: 'Python Programming Basics', grade: 'Class 8', teacherName: 'Clara Harrison', credits: 3, weeklyHours: 3 }
    ],
    'Class 9': [
      { id: 'SUB-C9-1', code: 'ENG-09', name: 'English Language & Analytical Essay', grade: 'Class 9', teacherName: 'Samantha Reed', credits: 4, weeklyHours: 4 },
      { id: 'SUB-C9-2', code: 'MATH-09', name: 'High School Algebra I & Equations', grade: 'Class 9', teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C9-3', code: 'SCI-09', name: 'Introductory Physics & Mechanics', grade: 'Class 9', teacherName: 'Prof. Marcus Brody', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C9-4', code: 'HIST-09', name: 'World History & Civilization', grade: 'Class 9', teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 4 },
      { id: 'SUB-C9-5', code: 'CS-09', name: 'Computer Science Principles & Logic', grade: 'Class 9', teacherName: 'Clara Harrison', credits: 3, weeklyHours: 4 }
    ],
    'Class 10': [
      { id: 'SUB-C10-1', code: 'MATH-10', name: 'Algebra II & Synthetic Geometry', grade: 'Class 10', teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C10-2', code: 'PHY-10', name: 'Physics Principles & Electromagnetism', grade: 'Class 10', teacherName: 'Prof. Marcus Brody', credits: 4, weeklyHours: 5 },
      { id: 'SUB-C10-3', code: 'CHEM-10', name: 'Chemistry & Laboratory Experiments', grade: 'Class 10', teacherName: 'Prof. Marcus Brody', credits: 4, weeklyHours: 4 },
      { id: 'SUB-C10-4', code: 'ENG-10', name: 'English Literature & World Classics', grade: 'Class 10', teacherName: 'Samantha Reed', credits: 4, weeklyHours: 4 },
      { id: 'SUB-C10-5', code: 'CS-10', name: 'Computer Science & Data Structures', grade: 'Class 10', teacherName: 'Clara Harrison', credits: 4, weeklyHours: 4 }
    ]
  };

  const HOMEWORK_REPOSITORY: Record<string, Homework[]> = {
    'Nursery': [
      { id: 'HW-NUR-1', classId: 'NUR', className: 'Nursery', subject: 'English Alphabet & Phonics', title: 'Alphabet Tracing A-E', description: 'Trace uppercase and lowercase letters A to E using crayons in workbook page 4.', assignedDate: '2026-07-20', dueDate: '2026-07-28', teacherName: 'Samantha Reed', submissionsCount: 18, totalStudents: 22, status: 'Active' },
      { id: 'HW-NUR-2', classId: 'NUR', className: 'Nursery', subject: 'Numbers & Counting', title: 'Fruit Counting Activity', description: 'Count 1 to 5 fruits on page 8 and color them brightly.', assignedDate: '2026-07-21', dueDate: '2026-07-29', teacherName: 'Dr. Evelyn Vance', submissionsCount: 15, totalStudents: 22, status: 'Active' },
      { id: 'HW-NUR-3', classId: 'NUR', className: 'Nursery', subject: 'Art & Craft Exploration', title: 'Handprint Tree Painting', description: 'Make a handprint leaf impression on drawing sheet.', assignedDate: '2026-07-22', dueDate: '2026-07-30', teacherName: 'Clara Harrison', submissionsCount: 20, totalStudents: 22, status: 'Active' }
    ],
    'KG': [
      { id: 'HW-KG-1', classId: 'KG', className: 'KG', subject: 'English Reading & Writing', title: 'Sight Words Flashcards', description: 'Practice reading 10 sight words (the, is, at, in, on, etc.) with parents.', assignedDate: '2026-07-20', dueDate: '2026-07-27', teacherName: 'Samantha Reed', submissionsCount: 21, totalStudents: 25, status: 'Active' },
      { id: 'HW-KG-2', classId: 'KG', className: 'KG', subject: 'Basic Mathematics & Shapes', title: 'Shape Matching Worksheet', description: 'Match circles, squares, and triangles to daily objects.', assignedDate: '2026-07-21', dueDate: '2026-07-28', teacherName: 'Dr. Evelyn Vance', submissionsCount: 22, totalStudents: 25, status: 'Active' },
      { id: 'HW-KG-3', classId: 'KG', className: 'KG', subject: 'Environmental Studies', title: 'My Five Senses Collage', description: 'Paste pictures representing sight, sound, touch, smell, and taste.', assignedDate: '2026-07-22', dueDate: '2026-07-29', teacherName: 'Prof. Marcus Brody', submissionsCount: 19, totalStudents: 25, status: 'Active' }
    ],
    'Class 1': [
      { id: 'HW-C1-1', classId: 'C1', className: 'Class 1', subject: 'English Grammar & Reader', title: 'Short Vowel Words Reading', description: 'Read Chapter 2 story on Page 14 and answer exercises A & B in notebook.', assignedDate: '2026-07-20', dueDate: '2026-07-27', teacherName: 'Samantha Reed', submissionsCount: 26, totalStudents: 28, status: 'Active' },
      { id: 'HW-C1-2', classId: 'C1', className: 'Class 1', subject: 'Elementary Mathematics', title: 'Single-Digit Addition Drills', description: 'Complete 15 single-digit addition problems on Page 22.', assignedDate: '2026-07-21', dueDate: '2026-07-28', teacherName: 'Dr. Evelyn Vance', submissionsCount: 27, totalStudents: 28, status: 'Active' },
      { id: 'HW-C1-3', classId: 'C1', className: 'Class 1', subject: 'General Science & Nature', title: 'Living vs Non-Living Things', description: 'List 5 living and 5 non-living things found in your garden or home.', assignedDate: '2026-07-22', dueDate: '2026-07-29', teacherName: 'Prof. Marcus Brody', submissionsCount: 24, totalStudents: 28, status: 'Active' }
    ],
    'Class 2': [
      { id: 'HW-C2-1', classId: 'C2', className: 'Class 2', subject: 'English Reading & Comprehension', title: 'Nouns & Action Verbs Identification', description: 'Read paragraph on page 18 and underline all action words with blue pencil.', assignedDate: '2026-07-20', dueDate: '2026-07-27', teacherName: 'Samantha Reed', submissionsCount: 25, totalStudents: 30, status: 'Active' },
      { id: 'HW-C2-2', classId: 'C2', className: 'Class 2', subject: 'Primary Arithmetic & Shapes', title: 'Two-Digit Addition Practice', description: 'Solve workbook page 30 questions 1 through 12.', assignedDate: '2026-07-21', dueDate: '2026-07-28', teacherName: 'Dr. Evelyn Vance', submissionsCount: 28, totalStudents: 30, status: 'Active' },
      { id: 'HW-C2-3', classId: 'C2', className: 'Class 2', subject: 'Computer Skills & Logic', title: 'Computer Hardware Diagram', description: 'Draw and label the monitor, CPU, keyboard, and mouse in your lab book.', assignedDate: '2026-07-22', dueDate: '2026-07-29', teacherName: 'Clara Harrison', submissionsCount: 26, totalStudents: 30, status: 'Active' }
    ],
    'Class 5': [
      { id: 'HW-C5-1', classId: 'C5', className: 'Class 5', subject: 'English Language Arts', title: 'Persuasive Essay Draft', description: 'Write a 200-word paragraph advocating for renewable energy in schools.', assignedDate: '2026-07-20', dueDate: '2026-07-28', teacherName: 'Samantha Reed', submissionsCount: 28, totalStudents: 32, status: 'Active' },
      { id: 'HW-C5-2', classId: 'C5', className: 'Class 5', subject: 'Advanced Primary Mathematics', title: 'Fractions & Mixed Numbers', description: 'Complete Exercise 4.2 questions 1-15 on textbook page 56.', assignedDate: '2026-07-21', dueDate: '2026-07-29', teacherName: 'Dr. Evelyn Vance', submissionsCount: 29, totalStudents: 32, status: 'Active' },
      { id: 'HW-C5-3', classId: 'C5', className: 'Class 5', subject: 'General Science & Experiments', title: 'Water Cycle Diagram', description: 'Draw the water cycle including evaporation, condensation, and precipitation.', assignedDate: '2026-07-22', dueDate: '2026-07-30', teacherName: 'Prof. Marcus Brody', submissionsCount: 30, totalStudents: 32, status: 'Active' }
    ],
    'Class 10': [
      { id: 'HW-C10-1', classId: 'CLS-10A', className: 'Class 10', subject: 'Algebra II & Synthetic Geometry', title: 'Quadratic Formula Exercises', description: 'Solve problems 1-15 on page 102. Show step-by-step discriminant calculations.', assignedDate: '2026-07-20', dueDate: '2026-07-28', teacherName: 'Dr. Evelyn Vance', submissionsCount: 27, totalStudents: 30, status: 'Active' },
      { id: 'HW-C10-2', classId: 'CLS-10A', className: 'Class 10', subject: 'Physics Principles & Electromagnetism', title: 'Ohm’s Law & Resistors Lab Report', description: 'Analyze resistance values from lab experiment 3 and answer summary questions.', assignedDate: '2026-07-21', dueDate: '2026-07-29', teacherName: 'Prof. Marcus Brody', submissionsCount: 25, totalStudents: 30, status: 'Active' },
      { id: 'HW-C10-3', classId: 'CLS-10A', className: 'Class 10', subject: 'Computer Science & Data Structures', title: 'Python Sorting Algorithms', description: 'Implement Bubble Sort and Selection Sort functions with time complexity notes.', assignedDate: '2026-07-22', dueDate: '2026-07-30', teacherName: 'Clara Harrison', submissionsCount: 28, totalStudents: 30, status: 'Active' }
    ]
  };

  const getDisplayedSubjects = (): Subject[] => {
    const repo = SUBJECT_REPOSITORY[effectiveGrade];
    if (repo && repo.length > 0) {
      return repo;
    }
    const propFiltered = subjects.filter(
      (s) =>
        s.grade.toLowerCase().includes(effectiveGrade.toLowerCase()) ||
        effectiveGrade.toLowerCase().includes(s.grade.toLowerCase())
    );
    if (propFiltered.length >= 5) {
      return propFiltered;
    }
    return [
      { id: `SUB-${effectiveGrade}-1`, code: `${effectiveGrade.replace(/\s+/g, '')}-ENG`, name: 'English Language Arts', grade: effectiveGrade, teacherName: 'Samantha Reed', credits: 3, weeklyHours: 4 },
      { id: `SUB-${effectiveGrade}-2`, code: `${effectiveGrade.replace(/\s+/g, '')}-MATH`, name: 'Mathematics Fundamentals', grade: effectiveGrade, teacherName: 'Dr. Evelyn Vance', credits: 4, weeklyHours: 5 },
      { id: `SUB-${effectiveGrade}-3`, code: `${effectiveGrade.replace(/\s+/g, '')}-SCI`, name: 'General Science', grade: effectiveGrade, teacherName: 'Prof. Marcus Brody', credits: 3, weeklyHours: 4 },
      { id: `SUB-${effectiveGrade}-4`, code: `${effectiveGrade.replace(/\s+/g, '')}-SST`, name: 'Social Studies', grade: effectiveGrade, teacherName: 'Jonathan Sterling', credits: 3, weeklyHours: 3 },
      { id: `SUB-${effectiveGrade}-5`, code: `${effectiveGrade.replace(/\s+/g, '')}-CS`, name: 'Computer Applications', grade: effectiveGrade, teacherName: 'Clara Harrison', credits: 2, weeklyHours: 3 }
    ];
  };

  const displayedSubjects = getDisplayedSubjects();

  const getDisplayedHomework = (): Homework[] => {
    const propFiltered = homework.filter(
      (h) =>
        h.className.toLowerCase().includes(effectiveGrade.toLowerCase()) ||
        effectiveGrade.toLowerCase().includes(h.className.toLowerCase())
    );
    if (propFiltered.length >= 2) {
      return propFiltered;
    }

    const repo = HOMEWORK_REPOSITORY[effectiveGrade];
    if (repo && repo.length > 0) {
      return repo;
    }

    const classSubjects = getDisplayedSubjects();
    return [
      {
        id: `HW-${effectiveGrade}-1`,
        classId: effectiveGrade,
        className: effectiveGrade,
        subject: classSubjects[0]?.name || 'English',
        title: `${classSubjects[0]?.name || 'English'} Practice Set`,
        description: 'Complete chapter summary and answer exercises 1 through 10 in your workbook.',
        assignedDate: '2026-07-20',
        dueDate: '2026-07-28',
        teacherName: classSubjects[0]?.teacherName || 'Dr. Evelyn Vance',
        submissionsCount: 22,
        totalStudents: 30,
        status: 'Active'
      },
      {
        id: `HW-${effectiveGrade}-2`,
        classId: effectiveGrade,
        className: effectiveGrade,
        subject: classSubjects[1]?.name || 'Mathematics',
        title: `${classSubjects[1]?.name || 'Mathematics'} Problem Solving`,
        description: `Solve assignment questions on page 42 and submit step-by-step working notes.`,
        assignedDate: '2026-07-21',
        dueDate: '2026-07-29',
        teacherName: classSubjects[1]?.teacherName || 'Prof. Marcus Brody',
        submissionsCount: 25,
        totalStudents: 30,
        status: 'Active'
      },
      {
        id: `HW-${effectiveGrade}-3`,
        classId: effectiveGrade,
        className: effectiveGrade,
        subject: classSubjects[2]?.name || 'Science',
        title: `${classSubjects[2]?.name || 'Science'} Exploration Notes`,
        description: `Review fundamental concepts from lecture and write a brief summary report.`,
        assignedDate: '2026-07-22',
        dueDate: '2026-07-30',
        teacherName: classSubjects[2]?.teacherName || 'Clara Harrison',
        submissionsCount: 20,
        totalStudents: 30,
        status: 'Active'
      }
    ];
  };

  const displayedHomework = getDisplayedHomework();

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  const getDisplayedTimetable = (): TimetableSlot[] => {
    const propFiltered = timetable.filter(
      (t) =>
        t.classId === effectiveGrade ||
        t.subjectName?.toLowerCase().includes(effectiveGrade.toLowerCase())
    );
    if (propFiltered.length >= 8) {
      return propFiltered;
    }

    const classSubjects = getDisplayedSubjects();
    const timeslots = [
      { time: '08:30 AM - 09:30 AM', room: 'Room 101' },
      { time: '09:30 AM - 10:30 AM', room: 'Room 101' },
      { time: '10:45 AM - 11:45 AM', room: 'Room 101' },
      { time: '11:45 AM - 12:45 PM', room: 'Room 101' },
      { time: '01:30 PM - 02:30 PM', room: 'Room 101' }
    ];

    const generated: TimetableSlot[] = [];

    days.forEach((day, dayIndex) => {
      timeslots.forEach((ts, slotIndex) => {
        const subjectIndex = (dayIndex + slotIndex) % classSubjects.length;
        const sub = classSubjects[subjectIndex];
        generated.push({
          id: `TT-${effectiveGrade.replace(/\s+/g, '')}-${day}-${slotIndex + 1}`,
          classId: effectiveGrade,
          period: slotIndex + 1,
          subjectName: sub.name,
          teacherName: sub.teacherName,
          day: day,
          timeSlot: ts.time,
          roomNumber: `Room 10${(dayIndex % 3) + 1}`
        });
      });
    });

    return generated;
  };

  const displayedTimetable = getDisplayedTimetable();

  const renderGradeFilter = (itemCountLabel: string) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-600">Select Grade:</span>
          <select
            value={effectiveGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-[#2C633E] focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 transition-all cursor-pointer"
          >
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-xs text-gray-500 font-medium">
        Showing <span className="font-bold text-[#2C633E]">{itemCountLabel}</span> for <span className="font-bold text-gray-900">{effectiveGrade}</span>
      </div>
    </div>
  );

  const [newHw, setNewHw] = useState({
    classId: 'CLS-10A',
    className: 'Grade 10 - Section A',
    subject: 'Algebra II & Geometry',
    title: '',
    description: '',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: '2026-08-01',
    teacherName: 'Dr. Evelyn Vance',
    submissionsCount: 0,
    totalStudents: 30,
    status: 'Active' as 'Active' | 'Closed' | 'Draft'
  });

  const handleCreateHw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHw.title || !newHw.description) {
      alert('Please fill assignment title and instructions.');
      return;
    }
    onAddHomework(newHw);
    setShowHomeworkModal(false);
    setNewHw({ ...newHw, title: '', description: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Subtabs */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Academic Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Oversee classroom divisions, curriculum subjects, weekly schedules, and homework tasks.
          </p>
        </div>

        {/* Subtab Navigation Pill */}
        <div className="flex items-center space-x-1 bg-[#F8F9FC] p-1 border border-gray-200 rounded-xl overflow-x-auto shrink-0">
          <button
            onClick={() => onNavigateSubTab('classes')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'classes'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Classes ({classes.length})
          </button>
          <button
            onClick={() => onNavigateSubTab('subjects')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'subjects'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Subjects ({subjects.length})
          </button>
          <button
            onClick={() => onNavigateSubTab('timetable')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'timetable'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Timetable
          </button>
          <button
            onClick={() => onNavigateSubTab('homework')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'homework'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Homework ({homework.length})
          </button>
        </div>
      </div>

      {/* CLASSES SUBTAB */}
      {activeSubTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => {
            const fillPct = Math.round((cls.studentCount / cls.capacity) * 100);
            return (
              <div
                key={cls.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#2C633E]/40 transition-all hostinger-shadow-hover"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{cls.name}</h3>
                    <p className="text-[11px] text-gray-400">Class ID: {cls.id}</p>
                  </div>
                  <span className="text-xs font-bold text-[#2C633E] bg-[#EAF2EC] px-2.5 py-1 rounded-lg">
                    {cls.roomNumber}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Class Teacher:</span>
                    <span className="font-semibold text-gray-900">{cls.classTeacher}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Class Size:</span>
                    <span className="font-bold text-gray-900">
                      {cls.studentCount} / {cls.capacity} Capacity
                    </span>
                  </div>
                </div>

                {/* Capacity Fill Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-gray-500">
                    <span>Capacity Occupancy</span>
                    <span>{fillPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        fillPct >= 95 ? 'bg-amber-500' : 'bg-[#2C633E]'
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUBJECTS SUBTAB */}
      {activeSubTab === 'subjects' && (
        <div className="space-y-4">
          {renderGradeFilter(`${displayedSubjects.length} subjects`)}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Subject Code & Name</th>
                  <th className="py-3.5 px-4">Target Grade</th>
                  <th className="py-3.5 px-4">Instructor</th>
                  <th className="py-3.5 px-4">Credits</th>
                  <th className="py-3.5 px-4">Weekly Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {displayedSubjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] text-[#2C633E] font-bold flex items-center justify-center text-xs shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{sub.name}</p>
                          <p className="text-[11px] text-gray-400">{sub.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{sub.grade}</td>
                    <td className="py-3.5 px-4 text-gray-800">{sub.teacherName}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                        {sub.credits} Credits
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{sub.weeklyHours} hrs / week</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TIMETABLE SUBTAB */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-4">
          {renderGradeFilter(`${displayedTimetable.length} periods`)}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {days.map((day) => {
              const daySlots = displayedTimetable.filter((t) => t.day === day);
              return (
                <div
                  key={day}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3"
                >
                  <div className="border-b border-gray-100 pb-2 text-center">
                    <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">{day}</h4>
                  </div>

                  {daySlots.length === 0 ? (
                    <div className="py-6 text-center text-gray-400 text-xs">
                      No periods scheduled
                    </div>
                  ) : (
                    daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="bg-[#F8F9FC] border border-gray-200/80 rounded-xl p-3 space-y-1 hover:border-[#2C633E]/40 transition-all"
                      >
                        <span className="text-[10px] font-bold text-[#2C633E] block">
                          {slot.timeSlot}
                        </span>
                        <p className="font-bold text-xs text-gray-900">{slot.subjectName}</p>
                        <p className="text-[11px] text-gray-500">{slot.teacherName}</p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center">
                          <MapPin className="w-3 h-3 mr-0.5 inline" /> {slot.roomNumber}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HOMEWORK SUBTAB */}
      {activeSubTab === 'homework' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex-1">
              {renderGradeFilter(`${displayedHomework.length} homework tasks`)}
            </div>
            <button
              onClick={() => setShowHomeworkModal(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 shrink-0 self-end md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Assign New Homework</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedHomework.map((hw) => (
              <div
                key={hw.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3 hover:border-[#2C633E]/40 transition-all hostinger-shadow-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold bg-[#EAF2EC] text-[#2C633E] px-2 py-0.5 rounded-md">
                      {hw.subject}
                    </span>
                    <span className="text-[10px] text-gray-400">Due: {hw.dueDate}</span>
                  </div>

                  <h3 className="font-bold text-sm text-gray-900 mt-2">{hw.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed">
                    {hw.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Class: <strong>{hw.className}</strong></span>
                  <span className="font-semibold text-emerald-600">
                    {hw.submissionsCount}/{hw.totalStudents} Submitted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE HOMEWORK MODAL */}
      {showHomeworkModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Assign New Homework</h3>
              <button onClick={() => setShowHomeworkModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHw} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={newHw.title}
                  onChange={(e) => setNewHw({ ...newHw, title: e.target.value })}
                  placeholder="e.g. Calculus Derivatives Practice Set"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Subject</label>
                  <select
                    value={newHw.subject}
                    onChange={(e) => setNewHw({ ...newHw, subject: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newHw.dueDate}
                    onChange={(e) => setNewHw({ ...newHw, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Instructions / Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newHw.description}
                  onChange={(e) => setNewHw({ ...newHw, description: e.target.value })}
                  placeholder="Detail instructions for students..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowHomeworkModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
                >
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
