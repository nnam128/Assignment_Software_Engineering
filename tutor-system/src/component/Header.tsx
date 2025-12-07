import { type ReactNode, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, Calendar, Home, MessageSquare, Search, BarChart3, 
  LogIn, LogOut, Bell, CheckCircle, AlertCircle, Info, X, Menu 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getCurrentUser, logout } from '../Authentic/AuthProvider';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'success' | 'warning' | 'info';
}

const getNotificationsByRole = (role: string | null): NotificationItem[] => {
  switch (role) {
    case 'student':
      return [
        { id: 1, title: 'Class Approved', message: 'Your request for "React Patterns" was approved.', time: '2 mins ago', isRead: false, type: 'success' },
        { id: 2, title: 'New Schedule', message: 'Tutor John updated the schedule for Friday.', time: '1 hour ago', isRead: false, type: 'info' },
        { id: 3, title: 'Assignment Due', message: 'Reminder: Python Basic assignment due tomorrow.', time: '5 hours ago', isRead: true, type: 'warning' },
      ];
    case 'tutor':
      return [
        { id: 1, title: 'New Student', message: 'Sarah has enrolled in your "Data Structures" class.', time: '10 mins ago', isRead: false, type: 'success' },
        { id: 2, title: 'High Reschedule Rate', message: 'Warning: You have rescheduled 3 times this month.', time: '1 day ago', isRead: false, type: 'warning' },
        { id: 3, title: 'System Update', message: 'Maintenance scheduled for Sunday night.', time: '2 days ago', isRead: true, type: 'info' },
      ];
    case 'admin':
      return [
        { id: 1, title: 'Urgent Request', message: 'New class request with 15 student votes.', time: 'Just now', isRead: false, type: 'warning' },
        { id: 2, title: 'Report Ready', message: 'Weekly monthly performance report is ready.', time: '3 hours ago', isRead: true, type: 'info' },
        { id: 3, title: 'New User Registration', message: '5 new tutors are waiting for verification.', time: '1 day ago', isRead: true, type: 'success' },
      ];
    default:
      return [];
  }
};

function NotificationDropdown({ role }: { role: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(getNotificationsByRole(role));
  }, [role]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  if (!role) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white/90 hover:text-white"
      >
        <Bell className="w-6 h-6 md:w-5 md:h-5" /> 
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-primary"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-[-60px] md:right-0 mt-3 w-[92vw] max-w-[380px] md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] origin-top-right animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between p-4 border-b border-gradient-600 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs text-primary font-medium hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((noti) => (
                <div 
                  key={noti.id} 
                  onClick={() => handleMarkAsRead(noti.id)}
                  className={cn(
                    "flex gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gradient-600 last:border-0",
                    !noti.isRead ? "bg-blue-50/30" : "bg-white"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    noti.type === 'success' ? "bg-green-100 text-green-600" :
                    noti.type === 'warning' ? "bg-red-100 text-red-600" :
                    "bg-blue-100 text-blue-600"
                  )}>
                    {noti.type === 'success' ? <CheckCircle className="w-5 h-5"/> :
                    noti.type === 'warning' ? <AlertCircle className="w-5 h-5"/> :
                    <Info className="w-5 h-5"/>}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className={cn("text-sm leading-none", !noti.isRead ? "font-bold text-gray-900" : "font-medium text-gray-700")}>
                        {noti.title}
                      </p>
                      {!noti.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1"></span>}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{noti.message}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{noti.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t border-gradient-600 bg-gray-50 text-center">
            <Link to="#" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function AuthLink() {
    const user = getCurrentUser();

    if (user) {
      return (
        <a
          href="/"
          onClick={() => logout()}
          className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-lg transition-all text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="w-6 h-6 md:w-4 md:h-4" />
          <span className="hidden md:block text-sm">Log Out</span> 
        </a>
      );
    } else {
      return (
        <Link
          to="/login"
          className={'flex items-center gap-2 px-2 md:px-4 py-2 rounded-lg transition-all text-white/80 hover:bg-white/10 hover:text-white'} >
          <LogIn className="w-6 h-6 md:w-4 md:h-4" />
          <span className="hidden md:block text-sm"> Log In </span>
        </Link>
      );
    }
}

interface LayoutProps {
  children: ReactNode;
  role: 'student' | 'tutor' | 'admin' | null;
}

export function Header({ children, role }: LayoutProps){
  const location = useLocation();

  const studentNav = [
    { path: '/student/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/student/classes', icon: Search, label: 'Find Classes' },
    { path: '/student/my-classes', icon: BookOpen, label: 'My Classes' },
    { path: '/student/schedule', icon: Calendar, label: 'Schedule' },
  ];

  const tutorNav = [
    { path: '/tutor/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/tutor/classes', icon: BookOpen, label: 'My Classes' },
    { path: '/tutor/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/tutor/reports', icon: BarChart3, label: 'Reports' },
  ];

  const adminNav = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/classes', icon: BookOpen, label: 'Classes' },
    { path: '/admin/requests', icon: MessageSquare, label: 'Requests' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ];

  const navigation = role === 'student' ? studentNav : role === 'tutor' ? tutorNav : adminNav;

  return (
    <div className="min-h-screen bg-gradient-50 w-full pb-20 md:pb-0"> {/* Thêm padding bottom cho mobile để không bị che bởi nav */}
            <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-primary via-primary-500 via-primary-300 to-[#0baaa5] border-white/10 backdrop-blur-sm">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <img className="w-6 h-6" src='/logo-hcmut.png' alt="Logo"/>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HCMUT Tutor</h1>
                <p className="hidden md:block text-xs text-white/80">Support System</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                      isActive
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 md:gap-0">
                <NotificationDropdown role={role} />
                <div className="h-6 w-px bg-white/20 mx-2 hidden md:block"></div>
                {AuthLink()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto w-full mt-4 md:mt-10 px-4 md:px-0">
        {children}
      </main>

      <footer className="py-4 px-4 border-t border-gradient-600 mt-10 hidden md:block">
        <div className="container mx-auto text-center">
          <p>Assignment Project of Software Engineering</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white backdrop-blur-xl z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around px-2 py-3">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg transition-all active:scale-95',
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-gray-500 hover:text-primary'
                )}
              >
                <Icon className={cn("w-6 h-6", isActive && "fill-current text-primary/20")} />
                <span className="text-[10px] text-center">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};