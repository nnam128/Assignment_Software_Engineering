import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Badge } from '../../component/ui/badge';
import { Button } from '../../component/ui/button';
import { mockClasses, mockSessions } from '../../data/hardcodedData';
import { BookOpen, Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { useEffect } from 'react';
import { Header } from '../../component/Header';

export function StudentDashboard() {
  const enrolledClasses = mockClasses.slice(0, 3);
  const upcomingSessions = mockSessions.filter(s => s.status === 'scheduled').slice(0, 3);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();


  useEffect(() => {
    if (!currentUser || !hasRole('student')) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null; 


  return (
    <Header role="student">
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gradient-700">
            Track your classes, schedule, and academic progress
          </p>
        </div>


        <div className="grid lg:grid-cols-2 gap-6">
          {/* Enrolled Classes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    My Classes
                  </CardTitle>
                  <CardDescription>Your enrolled tutoring classes</CardDescription>
                </div>
                <Link to="/student/my-classes">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrolledClasses.map((cls) => (
                <Link key={cls.id} to={`/student/classes/${cls.id}`}>
                  <div className="p-4 rounded-lg border border-gradient hover:border-primary/50 hover:shadow-card transition-all cursor-pointer mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-black">{cls.subject}</h4>
                        <p className="text-sm text-gradient-700 font-mono">{cls.code}</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gradient-700">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {cls.tutorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {cls.schedule.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your scheduled tutoring sessions</CardDescription>
                </div>
                <Link to="/student/schedule">
                  <Button variant="ghost" size="sm">View Schedule</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => {
                const classData = mockClasses.find(c => c.id === session.classId);
                return (
                  <Link key={session.id} to={`/student/classes/${session.classId}/${session.id}`}>
                    <div key={session.id} className="p-4 rounded-lg border border-gradient hover:border-primary/50 hover:shadow-card transition-all cursor-pointer mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-black">{session.title}</h4>
                          <p className="text-sm text-gradient-700">{classData?.subject}</p>
                        </div>
                        <Badge variant={session.type === 'online' ? 'secondary' : 'outline'}>
                          {session.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gradient-700">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/student/classes">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <BookOpen className="w-4 h-4" />
                  <span>Find Classes</span>
                </Button>
              </Link>
              <Link to="/student/schedule">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Calendar className="w-4 h-4" />
                  <span>View Schedule</span>
                </Button>
              </Link >
              <Link to="/student/request">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Users className="w-4 h-4" />
                  <span>Join Request</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <TrendingUp className="w-4 h-4" />
                <span>My Progress</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
};

export default StudentDashboard;
