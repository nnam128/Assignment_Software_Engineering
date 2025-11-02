import { Header } from '../../component/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import WeeklyCalendar from '../../component/WeeklyCalendar';
import { mockSessions, mockClasses} from '../../data/hardcodedData';
import { Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { useEffect } from 'react';

export function StudentSchedule(){
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  useEffect(() => {
    if (!currentUser || !hasRole('student')) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null; 

  // Get all sessions from enrolled classes
  const enrolledClassIds = mockClasses.map(c => c.id);
  const allSessions = mockSessions.filter(s => enrolledClassIds.includes(s.classId));

  const upcomingSessions = allSessions.filter(s => s.status === 'scheduled');
  const completedSessions = allSessions.filter(s => s.status === 'completed');

  return (
    <Header role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">
            My Schedule
          </h1>
          <p className="text-gradient-700">
            View all your tutoring sessions in a weekly calendar
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <Calendar className="w-5 h-5 text-primary mb-2" />
              <CardDescription>Total Sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">{allSessions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="w-5 h-5 text-secondary mb-2" />
              <CardDescription>Upcoming</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">{upcomingSessions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Calendar className="w-5 h-5 text-accent-600 mb-2" />
              <CardDescription>Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">{completedSessions.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Calendar */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-black mb-1">Weekly View</h2>
            <p className="text-sm text-gradient-700">
              All your sessions across enrolled classes
            </p>
          </div>
          <div className='rounded-lg p-0 border border-gradient'><WeeklyCalendar sessions={allSessions} /></div>
        </div>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Legend</CardTitle>
            <CardDescription>Session status indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-l-4 border-primary bg-primary/20"></div>
                <span className="text-sm text-black">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-l-4 border-secondary-700 bg-secondary-700/20"></div>
                <span className="text-sm text-black">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-l-4 border-destructive bg-destructive/20"></div>
                <span className="text-sm text-black">Cancelled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
};

export default StudentSchedule;
