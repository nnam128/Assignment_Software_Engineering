import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calendar, Home, MessageSquare, Search, User, GraduationCap, BarChart3, LogIn, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { getCurrentUser, logout } from '../Authentic/AuthProvider';

interface LayoutProps {
  children: ReactNode;
  role: 'student' | 'tutor' | 'admin' | null;
}

function AuthLink() {
    const user = getCurrentUser();

    if (user) {
      return (
        <a
          href="/"
          onClick={() => logout()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Log Out</span>
        </a>
      );
    } else {
      return (
        <Link
          to="/login"
          className={'flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white/80 hover:bg-white/10 hover:text-white'} >
          <LogIn className="w-4 h-4" />
          <span className="text-sm"> Log In </span>
        </Link>
      );
    }
  }

export function Header({ children, role }: LayoutProps){
  const location = useLocation();

  const studentNav = [
    { path: '/student/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/student/classes', icon: Search, label: 'Find Classes' },
    { path: '/student/my-classes', icon: BookOpen, label: 'My Classes' },
    { path: '/student/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/student/profile', icon: User, label: 'Profile' },
  ];

  const tutorNav = [
    { path: '/tutor/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/tutor/classes', icon: BookOpen, label: 'My Classes' },
    { path: '/tutor/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/tutor/students', icon: GraduationCap, label: 'Students' },
    { path: '/tutor/profile', icon: User, label: 'Profile' },
  ];

  const adminNav = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/classes', icon: BookOpen, label: 'Classes' },
    { path: '/admin/requests', icon: MessageSquare, label: 'Requests' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ];


  const navigation = role === 'student' ? studentNav : role === 'tutor' ? tutorNav : adminNav;

  return (
    <div className="min-h-screen bg-gradient-50 w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-primary via-primary-500 via-primary-300 to-[#0baaa5] border-white/10 backdrop-blur-sm">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <img className="w-6 h-6 text-white" src='/logo-hcmut.png' />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HCMUT Tutor</h1>
                <p className="text-xs text-white/80">Support System</p>
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
            {AuthLink()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto w-full mt-10">
        {children}
      </main>

      <div className='h-30'> </div>
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border bg-white backdrop-blur-sm z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs text-center">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
