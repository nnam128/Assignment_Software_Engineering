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
  resource?: Resource[]
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
  status: 'pending' | 'approved';
  description: string;
  createdDate: string;
}

export interface Resource {
  name: string;
  size: string;
  date: string;
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
    enrolledStudents: 18,
    schedule: 'Monday, Wednesday 15:00-17:00',
    location: 'H1-201',
    status: 'active',
    description: 'Advanced study on data structures including trees, graphs, and algorithm optimization techniques.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Programming', 'Algorithms', 'Core'],
    resource: [
      { name: 'files/DSA_Intro.pdf', size: '2 MB', date: '2025-02-01' },
      { name: 'files/Sorting_Techniques.pdf', size: '3 MB', date: '2025-02-05' },
      { name: 'files/Graph_Theory_Notes.docx', size: '1.5 MB', date: '2025-02-10' },
      { name: 'files/Tree_Traversal_Lab.csv', size: '500 KB', date: '2025-02-15' },
      { name: 'files/DSA_Assignment1.pdf', size: '2.5 MB', date: '2025-02-20' }
    ]
  },
  {
    id: 'C002',
    subject: 'Database Systems',
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
    enrolledStudents: 15,
    schedule: 'Friday 09:00-12:00',
    location: 'H3-102',
    status: 'active',
    description: 'Software development lifecycle, design patterns, Agile methodologies, and project management.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['SDLC', 'Design Patterns', 'Project'],
    resource: [
      { name: 'files/SDLC_Overview.pdf', size: '2 MB', date: '2025-02-03' },
      { name: 'files/UML_Diagrams.pptx', size: '3 MB', date: '2025-02-08' },
      { name: 'files/Design_Patterns_Summary.pdf', size: '2.5 MB', date: '2025-02-13' },
      { name: 'files/Agile_Methods.docx', size: '1.8 MB', date: '2025-02-16' },
      { name: 'files/Project_Management_Tools.pdf', size: '2.2 MB', date: '2025-02-22' }
    ]
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
    status: 'inactive',
    description: 'Network protocols, TCP/IP, routing, network security, and practical lab sessions.',
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
    enrolledStudents: 12,
    schedule: 'Saturday 08:00-11:00',
    location: 'H6-401',
    status: 'active',
    description: 'Introduction to ML algorithms, neural networks, deep learning, and practical implementations.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['AI', 'ML', 'Advanced'],
    resource: [
      { name: 'files/ML_Introduction.pdf', size: '2.1 MB', date: '2025-02-02' },
      { name: 'files/Neural_Networks.docx', size: '2.8 MB', date: '2025-02-06' },
      { name: 'files/Deep_Learning_Tutorial.pdf', size: '3 MB', date: '2025-02-11' },
      { name: 'files/ML_Lab_Exercises.csv', size: '800 KB', date: '2025-02-17' },
      { name: 'files/ML_Project_Guide.pdf', size: '2.4 MB', date: '2025-02-21' }
    ]
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
    status: 'inactive',
    description: 'Full-stack web development with React, Node.js, databases, and deployment strategies.',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    tags: ['Web', 'Frontend', 'Backend'],
    resource: [
      { name: 'files/HTML_CSS_Basics.pdf', size: '1.6 MB', date: '2025-02-03' },
      { name: 'files/React_Guide.pdf', size: '2.5 MB', date: '2025-02-08' },
      { name: 'files/NodeJS_Notes.docx', size: '2.2 MB', date: '2025-02-12' },
      { name: 'files/Database_Integration.pdf', size: '2.7 MB', date: '2025-02-17' },
      { name: 'files/Deployment_Tutorial.pdf', size: '1.9 MB', date: '2025-02-22' }
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
    status: 'cancelled',
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
    status: 'cancelled',
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
    status: 'cancelled',
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
    status: 'cancelled',
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
  {
    id: 'CR003',
    subject: 'Blockchain Technology',
    code: 'CO4074',
    requestedBy: ['S002', 'S005', 'S007', 'S009', 'S012', 'S015', 'S018'],
    studentCount: 7,
    preferredSchedule: 'Tuesday 17:00-19:00',
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
    preferredSchedule: 'Tuesday 17:00-19:00',
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
    preferredSchedule: 'Tuesday 17:00-19:00',
    status: 'pending',
    description: 'Students requesting a class on blockchain fundamentals, smart contracts, and cryptocurrency.',
    createdDate: '2025-01-25',
  },
];


