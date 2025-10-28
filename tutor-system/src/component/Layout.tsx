import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calendar, Home, MessageSquare, Search, User, GraduationCap, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: ReactNode;
  role: 'student' | 'tutor' | 'admin';
}

const Layout = ({ children, role }: LayoutProps) => {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-hero border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-white" />
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-sm z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
