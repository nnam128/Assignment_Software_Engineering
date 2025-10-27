export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'tutor' | 'admin';
  avatar?: string;
  department?: string;
  studentId?: string;
}

export interface Class {
  id: string;
  subject: string;
  code: string;
  tutorId: string;
  tutorName: string;
  maxStudents: number;
  enrolledStudents: number;
  schedule: string;
  location: string;
  status: 'active' | 'inactive' | 'full';
  description: string;
  startDate: string;
  endDate: string;
  tags: string[];
}

export interface Session {
  id: string;
  classId: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: 'online' | 'offline';
  status: 'scheduled' | 'completed' | 'cancelled';
  attendanceCount?: number;
  totalStudents?: number;
}

export interface Post {
  id: string;
  classId: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'tutor';
  content: string;
  timestamp: string;
  comments: Comment[];
  isPinned?: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'tutor';
  content: string;
  timestamp: string;
}

export interface ClassRequest {
  id: string;
  subject: string;
  code: string;
  requestedBy: string[];
  studentCount: number;
  preferredSchedule: string;
  status: 'pending' | 'approved' | 'assigned';
  description: string;
  createdDate: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'S001',
    name: 'Nguyễn Văn A',
    email: 'a.nguyenvan@hcmut.edu.vn',
    password: 'NguyenVanA',
    role: 'student',
    department: 'Computer Science',
    studentId: '2352001',
  },
  {
    id: 'T001',
    name: 'Dr. Trần Thị B',
    email: 'tranthib@hcmut.edu.vn',
    password: 'TranThiB',
    role: 'tutor',
    department: 'Computer Science',
  },
  {
    id: 'O001',
    name: 'Phòng Văn Phòng Khoa',
    email: 'office_cs@hcmut.edu.vn',
    password: 'OfficeCSE',
    role: 'admin',
    department: 'Computer Science',
  },
];

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: 'C001',
    subject: 'Data Structures and Algorithms',
    code: 'CO2003',
    tutorId: 'T001',
    tutorName: 'Dr. Trần Thị B',
    maxStudents: 25,
    enrolledStudents: 18,
    schedule: 'Monday, Wednesday 15:00-17:00',
    location: 'H1-201',
    status: 'active',
    description: 'Advanced study on data structures including trees, graphs, and algorithm optimization techniques.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Programming', 'Algorithms', 'Core'],
  },
  {
    id: 'C002',
    subject: 'Database Management Systems',
    code: 'CO2013',
    tutorId: 'T002',
    tutorName: 'MSc. Lê Văn C',
    maxStudents: 30,
    enrolledStudents: 30,
    schedule: 'Tuesday, Thursday 13:00-15:00',
    location: 'H2-305',
    status: 'full',
    description: 'Comprehensive coverage of relational databases, SQL, normalization, and transaction management.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Database', 'SQL', 'Core'],
  },
  {
    id: 'C003',
    subject: 'Software Engineering',
    code: 'CO3001',
    tutorId: 'T003',
    tutorName: 'Dr. Phạm Minh D',
    maxStudents: 20,
    enrolledStudents: 15,
    schedule: 'Friday 09:00-12:00',
    location: 'H3-102',
    status: 'active',
    description: 'Software development lifecycle, design patterns, Agile methodologies, and project management.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['SDLC', 'Design Patterns', 'Project'],
  },
  {
    id: 'C004',
    subject: 'Computer Networks',
    code: 'CO3093',
    tutorId: 'T004',
    tutorName: 'MSc. Hoàng Thị E',
    maxStudents: 25,
    enrolledStudents: 22,
    schedule: 'Wednesday 15:00-17:00',
    location: 'Online - Zoom',
    status: 'active',
    description: 'Network protocols, TCP/IP, routing, network security, and practical lab sessions.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Networks', 'Protocols', 'Security'],
  },
  {
    id: 'C005',
    subject: 'Machine Learning',
    code: 'CO4063',
    tutorId: 'T005',
    tutorName: 'Dr. Võ Văn F',
    maxStudents: 20,
    enrolledStudents: 12,
    schedule: 'Saturday 08:00-11:00',
    location: 'H6-401',
    status: 'active',
    description: 'Introduction to ML algorithms, neural networks, deep learning, and practical implementations.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['AI', 'ML', 'Advanced'],
  },
  {
    id: 'C006',
    subject: 'Web Development',
    code: 'CO3049',
    tutorId: 'T006',
    tutorName: 'MSc. Đỗ Thị G',
    maxStudents: 30,
    enrolledStudents: 8,
    schedule: 'Tuesday 17:00-19:00',
    location: 'H2-201',
    status: 'active',
    description: 'Full-stack web development with React, Node.js, databases, and deployment strategies.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Web', 'Frontend', 'Backend'],
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: 'SE001',
    classId: 'C001',
    title: 'Session 1: Introduction to Binary Trees',
    date: 'Monday, Feb 3',
    time: '15:00',
    duration: '2 hours',
    location: 'H1-201',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 18,
  },
  {
    id: 'SE002',
    classId: 'C001',
    title: 'Session 2: Graph Algorithms',
    date: 'Wednesday, Feb 5',
    time: '15:00',
    duration: '2 hours',
    location: 'H1-201',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 18,
  },
  {
    id: 'SE003',
    classId: 'C001',
    title: 'Session 3: Dynamic Programming',
    date: 'Monday, Jan 27',
    time: '15:00',
    duration: '2 hours',
    location: 'H1-201',
    type: 'offline',
    status: 'completed',
    attendanceCount: 16,
    totalStudents: 18,
  },
  {
    id: 'SE004',
    classId: 'C004',
    title: 'Network Security Fundamentals',
    date: 'Wednesday, Feb 5',
    time: '15:00',
    duration: '2 hours',
    location: 'Online - Zoom',
    type: 'online',
    status: 'scheduled',
    totalStudents: 22,
  },
  {
    id: 'SE005',
    classId: 'C002',
    title: 'SQL Optimization Techniques',
    date: 'Tuesday, Feb 4',
    time: '13:00',
    duration: '2 hours',
    location: 'H2-305',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 30,
  },
  {
    id: 'SE006',
    classId: 'C002',
    title: 'Database Normalization',
    date: 'Thursday, Feb 6',
    time: '13:00',
    duration: '2 hours',
    location: 'H2-305',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 30,
  },
  {
    id: 'SE007',
    classId: 'C003',
    title: 'Agile Methodologies',
    date: 'Friday, Feb 7',
    time: '09:00',
    duration: '3 hours',
    location: 'H3-102',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 15,
  },
  {
    id: 'SE008',
    classId: 'C003',
    title: 'Design Patterns Workshop',
    date: 'Friday, Jan 31',
    time: '09:00',
    duration: '3 hours',
    location: 'H3-102',
    type: 'offline',
    status: 'completed',
    attendanceCount: 14,
    totalStudents: 15,
  },
  {
    id: 'SE009',
    classId: 'C005',
    title: 'Neural Networks Introduction',
    date: 'Saturday, Feb 8',
    time: '08:00',
    duration: '3 hours',
    location: 'H6-401',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 12,
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'P001',
    classId: 'C001',
    authorId: 'T001',
    authorName: 'Dr. Trần Thị B',
    authorRole: 'tutor',
    content: 'Welcome to Data Structures and Algorithms class! Please review the syllabus and prepare for our first session on Binary Trees.',
    timestamp: '2025-01-28T10:00:00Z',
    isPinned: true,
    comments: [
      {
        id: 'CM001',
        authorId: 'S001',
        authorName: 'Nguyễn Văn A',
        authorRole: 'student',
        content: 'Thank you, Dr. B! Looking forward to the class.',
        timestamp: '2025-01-28T11:30:00Z',
      },
    ],
  },
  {
    id: 'P002',
    classId: 'C001',
    authorId: 'S002',
    authorName: 'Trần Văn H',
    authorRole: 'student',
    content: 'Does anyone have notes from last semester on graph algorithms? Would appreciate any resources!',
    timestamp: '2025-01-29T14:20:00Z',
    comments: [
      {
        id: 'CM002',
        authorId: 'S003',
        authorName: 'Lê Thị I',
        authorRole: 'student',
        content: 'I have some notes, will share them in the class resources section.',
        timestamp: '2025-01-29T15:00:00Z',
      },
    ],
  },
];

export const mockClassRequests: ClassRequest[] = [
  {
    id: 'CR001',
    subject: 'Blockchain Technology',
    code: 'CO4074',
    requestedBy: ['S001', 'S005', 'S007', 'S009', 'S012', 'S015', 'S018'],
    studentCount: 7,
    preferredSchedule: 'Thursday 17:00-19:00',
    status: 'pending',
    description: 'Students requesting a class on blockchain fundamentals, smart contracts, and cryptocurrency.',
    createdDate: '2025-01-25',
  },
  {
    id: 'CR002',
    subject: 'Cloud Computing',
    code: 'CO4083',
    requestedBy: ['S002', 'S004', 'S006', 'S008', 'S010', 'S013', 'S016', 'S019', 'S021', 'S023'],
    studentCount: 10,
    preferredSchedule: 'Saturday 13:00-16:00',
    status: 'approved',
    description: 'AWS, Azure, Docker, Kubernetes - comprehensive cloud architecture and DevOps practices.',
    createdDate: '2025-01-20',
  },
];


