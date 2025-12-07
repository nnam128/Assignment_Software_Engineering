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

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Class {
  id: string;
  subject: string;
  code: string;
  tutorId: string;
  tutorName: string;
  maxStudents: number;
  minStudents: number;
  enrolledStudents: number;
  schedule: string;
  location: string;
  status: 'active' | 'inactive';
  description: string;
  startDate: string;
  endDate: string;
  tags: string[];
  resource?: Resource[]
  requestedStudents?: Student[];
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
  preparationNotes?: string;
  homeworkNotes?: string;
  resources?: Resource[];
}

export interface Post {
  id: string;
  classId: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'tutor';
  content: string;
  avatar?: string;
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
  avatar?: string;
  timestamp: string;
}

export interface ClassRequest {
  id: string;
  subject: string;
  code: string;
  requestedBy: string[];
  studentCount: number;
  preferredSchedule: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  createdDate: string;
}

export interface Resource {
  id?: string;
  name: string;
  size: string;
  date: string;
  url?: string;
}

export interface ClassPerformanceStats {
  classId: string;
  attendanceRate: number;
  participationLevel: number;
  avgFeedback: number;
  studentPassRate: number;
  totalSessionsCompleted: number;
}

export interface ClassReport {
  id: string;
  className: string;
  code: string;
  tutorName: string;
  totalStudents: number;
  attendanceRate: number;
  syllabusProgress: number;
  rescheduleCount: number;
  avgRating: number;
  lastFeedback: string;
  status: 'On Track' | 'Behind' | 'Risk';
}

export const mockReports: ClassReport[] = [
  {
    id: 'C01',
    className: 'Advanced React Patterns',
    code: 'CC02',
    tutorName: 'Dr. Trần Thị B',
    totalStudents: 45,
    attendanceRate: 92,
    syllabusProgress: 85,
    rescheduleCount: 1,
    avgRating: 4.8,
    lastFeedback: "Great explanation of Hooks!",
    status: 'On Track'
  },
  {
    id: 'C02',
    className: 'Introduction to Python',
    code: 'CC01',
    tutorName: 'Dr. Trần Thị B',
    totalStudents: 30,
    attendanceRate: 65,
    syllabusProgress: 40,
    rescheduleCount: 5,
    avgRating: 3.2,
    lastFeedback: "Teacher is often late.",
    status: 'Risk'
  },
  {
    id: 'C03',
    className: 'Data Structures',
    code: 'CC03',
    tutorName: 'Prof. Trần Thị C',
    totalStudents: 50,
    attendanceRate: 88,
    syllabusProgress: 90,
    rescheduleCount: 0,
    avgRating: 4.5,
    lastFeedback: "Very difficult but useful.",
    status: 'On Track'
  },
  {
    id: 'C04',
    className: 'UI/UX Design Principles',
    code: 'CC04',
    tutorName: 'Dr. Trần Thị B',
    totalStudents: 25,
    attendanceRate: 78,
    syllabusProgress: 60,
    rescheduleCount: 4,
    avgRating: 3.8,
    lastFeedback: "Class cancelled too many times.",
    status: 'Behind'
  }
];


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
    email: 'b.tranthi@hcmut.edu.vn',
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
    minStudents: 1,
    enrolledStudents: 18,
    schedule: 'Monday, Wednesday 15:00-17:00',
    location: 'H1-201',
    status: 'active',
    description:
      'Advanced study on data structures including trees, graphs, and algorithm optimization techniques.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Programming', 'Algorithms', 'Core'],
    resource: [
      { name: 'files/DSA_Intro.pdf', size: '2 MB', date: '2025-02-01' },
      { name: 'files/Sorting_Techniques.pdf', size: '3 MB', date: '2025-02-05' },
      { name: 'files/Graph_Theory_Notes.docx', size: '1.5 MB', date: '2025-02-10' },
      { name: 'files/Tree_Traversal_Lab.csv', size: '500 KB', date: '2025-02-15' },
      { name: 'files/DSA_Assignment1.pdf', size: '2.5 MB', date: '2025-02-20' }
    ],
    requestedStudents: [
      { id: '2345681', name: 'Phạm Thị D', email: 'd.pt@hcmut.edu.vn' },
      { id: '2345683', name: 'Đặng Thị F', email: 'f.dt@hcmut.edu.vn' },
      { id: '2345679', name: 'Trần Thị B', email: 'b.tt@hcmut.edu.vn' },
      { id: '2345682', name: 'Võ Văn E', email: 'e.vv@hcmut.edu.vn' },
      { id: '2345680', name: 'Lê Văn C', email: 'c.lv@hcmut.edu.vn' },
      { id: '2345678', name: 'Nguyễn Văn A', email: 'a.nv@hcmut.edu.vn' }
    ]
  },
  {
    id: 'C002',
    subject: 'Database Systems',
    code: 'CO2013',
    tutorId: 'T002',
    tutorName: 'MSc. Lê Văn C',
    maxStudents: 30,
    minStudents: 1,
    enrolledStudents: 30,
    schedule: 'Tuesday, Thursday 13:00-15:00',
    location: 'H2-305',
    status: 'active',
    description:
      'Comprehensive coverage of relational databases, SQL, normalization, and transaction management.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Database', 'SQL', 'Core'],
    resource: [
      { name: 'files/DB_Overview.pdf', size: '1.8 MB', date: '2025-02-02' },
      { name: 'files/SQL_Practice.docx', size: '2.2 MB', date: '2025-02-07' },
      { name: 'files/Normalization_Guide.pdf', size: '1.5 MB', date: '2025-02-10' },
      { name: 'files/ERD_Examples.csv', size: '600 KB', date: '2025-02-12' },
      { name: 'files/Transactions_Notes.pdf', size: '2 MB', date: '2025-02-18' }
    ]
  },
  {
    id: 'C003',
    subject: 'Software Engineering',
    code: 'CO3001',
    tutorId: 'T003',
    tutorName: 'Dr. Phạm Minh D',
    maxStudents: 20,
    minStudents: 1,
    enrolledStudents: 15,
    schedule: 'Wednesday, Friday 09:00-12:00',
    location: 'H3-102',
    status: 'active',
    description:
      'Software development lifecycle, design patterns, Agile methodologies, and project management.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['SDLC', 'Design Patterns', 'Project'],
    resource: [
      { name: 'files/SDLC_Overview.pdf', size: '2 MB', date: '2025-02-03' },
      { name: 'files/UML_Diagrams.pptx', size: '3 MB', date: '2025-02-08' },
      { name: 'files/Design_Patterns_Summary.pdf', size: '2.5 MB', date: '2025-02-13' },
      { name: 'files/Agile_Methods.docx', size: '1.8 MB', date: '2025-02-16' },
      { name: 'files/Project_Management_Tools.pdf', size: '2.2 MB', date: '2025-02-22' }
    ],
    requestedStudents: [
      { id: '2345690', name: 'Trần Thị M', email: 'm.tt@hcmut.edu.vn' },
      { id: '2345692', name: 'Phạm Thị O', email: 'o.pt@hcmut.edu.vn' },
      { id: '2345689', name: 'Nguyễn Văn L', email: 'l.nv@hcmut.edu.vn' },
      { id: '2345691', name: 'Lê Văn N', email: 'n.lv@hcmut.edu.vn' }
    ]
  },
  {
    id: 'C004',
    subject: 'Computer Networks',
    code: 'CO3093',
    tutorId: 'T004',
    tutorName: 'MSc. Hoàng Thị E',
    maxStudents: 25,
    minStudents: 1,
    enrolledStudents: 22,
    schedule: 'Wednesday 15:00-17:00',
    location: 'Online - Zoom',
    status: 'inactive',
    description:
      'Network protocols, TCP/IP, routing, network security, and practical lab sessions.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Networks', 'Protocols', 'Security'],
    resource: [
      { name: 'files/Network_Basics.pdf', size: '1.5 MB', date: '2025-02-04' },
      { name: 'files/TCPIP_Layers.pdf', size: '2 MB', date: '2025-02-09' },
      { name: 'files/Routing_Algorithms.docx', size: '1.2 MB', date: '2025-02-14' },
      { name: 'files/Security_Practices.pdf', size: '2.3 MB', date: '2025-02-18' },
      { name: 'files/Lab_Exercises.csv', size: '700 KB', date: '2025-02-23' }
    ]
  },
  {
    id: 'C005',
    subject: 'Machine Learning',
    code: 'CO4063',
    tutorId: 'T005',
    tutorName: 'Dr. Võ Văn F',
    maxStudents: 20,
    minStudents: 1,
    enrolledStudents: 12,
    schedule: 'Saturday 08:00-11:00',
    location: 'H6-401',
    status: 'active',
    description:
      'Introduction to ML algorithms, neural networks, deep learning, and practical implementations.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['AI', 'ML', 'Advanced'],
    resource: [
      { name: 'files/ML_Introduction.pdf', size: '2.1 MB', date: '2025-02-02' },
      { name: 'files/Neural_Networks.docx', size: '2.8 MB', date: '2025-02-06' },
      { name: 'files/Deep_Learning_Tutorial.pdf', size: '3 MB', date: '2025-02-11' },
      { name: 'files/ML_Lab_Exercises.csv', size: '800 KB', date: '2025-02-17' },
      { name: 'files/ML_Project_Guide.pdf', size: '2.4 MB', date: '2025-02-21' }
    ],
    requestedStudents: [
      { id: '2345697', name: 'Vũ Văn T', email: 't.vv@hcmut.edu.vn' },
      { id: '2345694', name: 'Nguyễn Thị Q', email: 'q.nt@hcmut.edu.vn' },
      { id: '2345693', name: 'Đặng Văn P', email: 'p.dv@hcmut.edu.vn' },
      { id: '2345696', name: 'Phạm Thị S', email: 's.pt@hcmut.edu.vn' },
      { id: '2345695', name: 'Lê Văn R', email: 'r.lv@hcmut.edu.vn' }
    ]
  },
  {
    id: 'C006',
    subject: 'Web Development',
    code: 'CO3049',
    tutorId: 'T006',
    tutorName: 'MSc. Đỗ Thị G',
    maxStudents: 30,
    minStudents: 1,
    enrolledStudents: 8,
    schedule: 'Tuesday 17:00-19:00',
    location: 'H2-201',
    status: 'inactive',
    description:
      'Full-stack web development with React, Node.js, databases, and deployment strategies.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Web', 'Frontend', 'Backend'],
    resource: [
      { name: 'files/HTML_CSS_Basics.pdf', size: '1.6 MB', date: '2025-02-03' },
      { name: 'files/React_Guide.pdf', size: '2.5 MB', date: '2025-02-08' },
      { name: 'files/NodeJS_Notes.docx', size: '2.2 MB', date: '2025-02-12' },
      { name: 'files/Database_Integration.pdf', size: '2.7 MB', date: '2025-02-17' },
      { name: 'files/Deployment_Tutorial.pdf', size: '1.9 MB', date: '2025-02-22' }
    ],
    requestedStudents: [
      { id: '2345686', name: 'Lê Thị I', email: 'i.lt@hcmut.edu.vn' },
      { id: '2345684', name: 'Nguyễn Thị G', email: 'g.nt@hcmut.edu.vn' },
      { id: '2345688', name: 'Vũ Thị K', email: 'k.vt@hcmut.edu.vn' },
      { id: '2345685', name: 'Phạm Văn H', email: 'h.pv@hcmut.edu.vn' },
      { id: '2345687', name: 'Trần Văn J', email: 'j.tv@hcmut.edu.vn' }
    ]
  }
];

// Mock Sessions
export const mockSessions: Session[] = [
  // ===== C001 =====
  {
    id: 'SE001',
    classId: 'C001',
    title: 'Binary Trees Basics',
    date: 'Monday, Feb 3',
    time: '08:00',
    duration: '2 hours',
    location: 'H1-201',
    type: 'offline',
    status: 'completed',
    totalStudents: 20,
    preparationNotes: 'Review binary tree concepts and prepare notes.',
    homeworkNotes: 'Draw a binary tree and calculate its height.',
    resources: [
      { name: 'slides/BinaryTrees.doc', size: '1.2 MB', date: '2025-02-01' }
    ]
  },
  {
    id: 'SE002',
    classId: 'C001',
    title: 'Graph Algorithms',
    date: 'Wednesday, Feb 5',
    time: '10:00',
    duration: '2 hours',
    location: 'H1-201',
    type: 'offline',
    status: 'cancelled',
    totalStudents: 20
  },
  {
    id: 'SE003',
    classId: 'C001',
    title: 'Dynamic Programming',
    date: 'Friday, Feb 7',
    time: '13:00',
    duration: '2 hours',
    location: 'H1-201',
    type: 'offline',
    status: 'scheduled',
    attendanceCount: 18,
    totalStudents: 20,
    preparationNotes: 'Review binary tree concepts and prepare notes.',
    resources: [
      { name: 'files/DP_Exercises.pdf', size: '2 MB', date: '2025-02-04' },
      { name: 'files/Tree_Exercises.csv', size: '700 KB', date: '2025-02-05' }
    ]
  },

  // ===== C002 =====
  {
    id: 'SE004',
    classId: 'C002',
    title: 'SQL Fundamentals',
    date: 'Monday, Feb 3',
    time: '10:30',
    duration: '2 hours',
    location: 'H2-305',
    type: 'offline',
    status: 'completed',
    totalStudents: 25,
    preparationNotes: 'Install MySQL and review SELECT, INSERT, UPDATE.',
    resources: [
      { name: 'books/SQLFundamentals.pdf', size: '3 MB', date: '2025-02-02' }
    ]
  },
  {
    id: 'SE005',
    classId: 'C002',
    title: 'Database Normalization',
    date: 'Thursday, Feb 6',
    time: '09:00',
    duration: '2 hours',
    location: 'H2-305',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 25,
    homeworkNotes: 'Normalize the database tables according to 3NF.'
  },
  {
    id: 'SE006',
    classId: 'C002',
    title: 'SQL Optimization',
    date: 'Saturday, Feb 8',
    time: '14:00',
    duration: '3 hours',
    location: 'H2-305',
    type: 'offline',
    status: 'completed',
    attendanceCount: 22,
    totalStudents: 25,
    preparationNotes: 'Review indexing and query optimization techniques.',
    homeworkNotes: 'Optimize previous SQL queries.',
    resources: [
      { name: 'files/SQL_Optimization_Tips.pdf', size: '2.5 MB', date: '2025-02-06' }
    ]
  },

  // ===== C003 =====
  {
    id: 'SE007',
    classId: 'C003',
    title: 'Agile Methodologies',
    date: 'Tuesday, Feb 4',
    time: '08:00',
    duration: '3 hours',
    location: 'H3-102',
    type: 'offline',
    status: 'completed',
    totalStudents: 18
  },
  {
    id: 'SE008',
    classId: 'C003',
    title: 'Scrum Practices',
    date: 'Thursday, Feb 6',
    time: '13:00',
    duration: '2 hours',
    location: 'H3-102',
    type: 'offline',
    status: 'scheduled',
    attendanceCount: 17,
    totalStudents: 18,
    preparationNotes: 'Review Scrum principles and roles.',
    resources: [
      { name: 'slides/Scrum_Practices.pdf', size: '1.8 MB', date: '2025-02-05' }
    ]
  },
  {
    id: 'SE009',
    classId: 'C003',
    title: 'Kanban & XP Overview',
    date: 'Friday, Feb 7',
    time: '16:00',
    duration: '2 hours',
    location: 'H3-102',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 18
  },

  // ===== C004 =====
  {
    id: 'SE010',
    classId: 'C004',
    title: 'Network Security Fundamentals',
    date: 'Wednesday, Feb 5',
    time: '08:00',
    duration: '2 hours',
    location: 'Online - Zoom',
    type: 'online',
    status: 'completed',
    attendanceCount: 20,
    totalStudents: 22,
    preparationNotes: 'Read basic network security concepts.',
    homeworkNotes: 'Check vulnerabilities in a small network lab.',
    resources: [
      { name: 'files/NetworkSecurityIntro.pdf', size: '2 MB', date: '2025-02-03' }
    ]
  },
  {
    id: 'SE011',
    classId: 'C004',
    title: 'Cybersecurity Threats',
    date: 'Friday, Feb 7',
    time: '09:00',
    duration: '3 hours',
    location: 'Online - Zoom',
    type: 'online',
    status: 'scheduled',
    totalStudents: 22
  },
  {
    id: 'SE012',
    classId: 'C004',
    title: 'Defense Strategies',
    date: 'Saturday, Feb 8',
    time: '18:00',
    duration: '2 hours',
    location: 'Online - Zoom',
    type: 'online',
    status: 'cancelled',
    totalStudents: 22,
    homeworkNotes: 'Write a short report on defense strategies.',
    resources: [
      { name: 'files/Defense_Strategies.pdf', size: '2.3 MB', date: '2025-02-06' }
    ]
  },

  // ===== C005 =====
  {
    id: 'SE013',
    classId: 'C005',
    title: 'Neural Networks Intro',
    date: 'Tuesday, Feb 4',
    time: '14:00',
    duration: '2 hours',
    location: 'H6-401',
    type: 'offline',
    status: 'completed',
    attendanceCount: 10,
    totalStudents: 12,
    preparationNotes: 'Review perceptrons and activation functions.',
    homeworkNotes: 'Implement a simple neural network.',
    resources: [
      { name: 'slides/NeuralNetworksIntro.pdf', size: '2.1 MB', date: '2025-02-03' }
    ]
  },
  {
    id: 'SE014',
    classId: 'C005',
    title: 'Deep Learning Basics',
    date: 'Thursday, Feb 6',
    time: '18:00',
    duration: '2 hours',
    location: 'H6-401',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 12
  },
  {
    id: 'SE015',
    classId: 'C005',
    title: 'CNN Workshop',
    date: 'Saturday, Feb 8',
    time: '08:00',
    duration: '3 hours',
    location: 'H6-401',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 12,
    homeworkNotes: 'Practice building a basic CNN model.',
    resources: [
      { name: 'files/CNN_Workshop.pdf', size: '3 MB', date: '2025-02-06' }
    ]
  },

  // ===== C006 =====
  {
    id: 'SE016',
    classId: 'C006',
    title: 'Cloud Computing Overview',
    date: 'Monday, Feb 3',
    time: '15:30',
    duration: '2 hours',
    location: 'H4-210',
    type: 'offline',
    status: 'completed',
    totalStudents: 20,
    preparationNotes: 'Review basic cloud services.'
  },
  {
    id: 'SE017',
    classId: 'C006',
    title: 'AWS Fundamentals',
    date: 'Wednesday, Feb 5',
    time: '18:00',
    duration: '2 hours',
    location: 'H4-210',
    type: 'offline',
    status: 'scheduled',
    attendanceCount: 18,
    totalStudents: 20,
    preparationNotes: 'Sign up for AWS and review EC2/S3.',
    resources: [
      { name: 'slides/AWS_Fundamentals.pdf', size: '2 MB', date: '2025-02-04' },
      { name: 'files/AWS_Practice.pdf', size: '2.3 MB', date: '2025-02-05' }
    ]
  },
  {
    id: 'SE018',
    classId: 'C006',
    title: 'Containerization with Docker',
    date: 'Friday, Feb 7',
    time: '20:00',
    duration: '2 hours',
    location: 'H4-210',
    type: 'offline',
    status: 'scheduled',
    totalStudents: 20
  }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'P001',
    classId: 'C001',
    authorId: 'T001',
    authorName: 'Dr. Trần Thị B',
    authorRole: 'tutor',
    avatar: '/avatar-1.webp',
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
    preferredSchedule: 'Thu 17:00-19:00',
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
    preferredSchedule: 'Sat 13:00-16:00',
    status: 'approved',
    description: 'AWS, Azure, Docker, Kubernetes - comprehensive cloud architecture and DevOps practices.',
    createdDate: '2025-01-20',
  },
  {
    id: 'CR003',
    subject: 'Blockchain Technology',
    code: 'CO4074',
    requestedBy: ['S002', 'S005', 'S007', 'S009', 'S012', 'S015', 'S018'],
    studentCount: 7,
    preferredSchedule: 'Tue 17:00-19:00',
    status: 'pending',
    description: 'Students requesting a class on blockchain fundamentals, smart contracts, and cryptocurrency.',
    createdDate: '2025-01-25',
  },
  {
    id: 'CR004',
    subject: 'Blockchain Technology',
    code: 'CO4074',
    requestedBy: ['S002', 'S005', 'S007', 'S009', 'S012', 'S015', 'S018'],
    studentCount: 7,
    preferredSchedule: 'Tue 17:00-19:00',
    status: 'pending',
    description: 'Students requesting a class on blockchain fundamentals, smart contracts, and cryptocurrency.',
    createdDate: '2025-01-25',
  },
  {
    id: 'CR005',
    subject: 'Blockchain Technology',
    code: 'CO4074',
    requestedBy: ['S002', 'S005', 'S007', 'S009', 'S012', 'S015', 'S018'],
    studentCount: 7,
    preferredSchedule: 'Tue 17:00-19:00',
    status: 'pending',
    description: 'Students requesting a class on blockchain fundamentals, smart contracts, and cryptocurrency.',
    createdDate: '2025-01-25',
  },
];

export const availableSessions: Session[] = [
  {
    id: 'AS001',
    classId: 'C001',
    title: 'Available Slot 1',
    date: '2025-12-10',
    time: '09:00',
    duration: '60',
    location: 'Online Meeting',
    type: 'online',
    status: 'scheduled',
    attendanceCount: 0,
    totalStudents: 0,
    preparationNotes: '',
    homeworkNotes: '',
    resources: [],
  },
  {
    id: 'AS002',
    classId: 'C001',
    title: 'Available Slot 2',
    date: '2025-12-10',
    time: '14:00',
    duration: '90',
    location: 'Room H2-201',
    type: 'offline',
    status: 'scheduled',
    attendanceCount: 0,
    totalStudents: 0,
    preparationNotes: '',
    homeworkNotes: '',
    resources: [],
  },
  {
    id: 'AS003',
    classId: 'C002',
    title: 'Available Slot 3',
    date: '2025-12-11',
    time: '08:30',
    duration: '60',
    location: 'Online Meeting',
    type: 'online',
    status: 'scheduled',
    attendanceCount: 0,
    totalStudents: 0,
    preparationNotes: '',
    homeworkNotes: '',
    resources: [],
  },
  {
    id: 'AS004',
    classId: 'C002',
    title: 'Available Slot 4',
    date: '2025-12-11',
    time: '19:00',
    duration: '120',
    location: 'Room A1-305',
    type: 'offline',
    status: 'scheduled',
    attendanceCount: 0,
    totalStudents: 0,
    preparationNotes: '',
    homeworkNotes: '',
    resources: [],
  },
  {
    id: 'AS005',
    classId: 'C003',
    title: 'Available Slot 5',
    date: '2025-12-12',
    time: '10:00',
    duration: '45',
    location: 'Online Meeting',
    type: 'online',
    status: 'scheduled',
    attendanceCount: 0,
    totalStudents: 0,
    preparationNotes: '',
    homeworkNotes: '',
    resources: [],
  },
];

export const mockClassReports: ClassPerformanceStats[] = [
  {
    classId: "C001",
    attendanceRate: 85,
    participationLevel: 72,
    avgFeedback: 8.4,
    studentPassRate: 90,
    totalSessionsCompleted: 10
  },
  {
    classId: "C002",
    attendanceRate: 70,
    participationLevel: 65,
    avgFeedback: 7.8,
    studentPassRate: 82,
    totalSessionsCompleted: 8
  },
  {
    classId: "C003",
    attendanceRate: 92,
    participationLevel: 88,
    avgFeedback: 9.1,
    studentPassRate: 95,
    totalSessionsCompleted: 12
  }
];

