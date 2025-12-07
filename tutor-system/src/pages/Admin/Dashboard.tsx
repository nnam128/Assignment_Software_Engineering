import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Badge } from '../../component/ui/badge';
import { Button } from '../../component/ui/button';
import { mockClasses, mockClassRequests } from '../../data/hardcodedData';
import { 
  BarChart3, 
  BookOpen, 
  CheckCircle, 
  MessageSquare, 
  Users, 
  XCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { useEffect} from 'react';
import { Header } from '../../component/Header';
import { useToast } from '../../component/UseToast';

export function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { toast } = useToast();

  const pendingRequests = mockClassRequests.slice(0, 2);
  const activeClasses = mockClasses.filter(c => c.status === 'active').slice(0, 3);

  const stats = {
    totalClasses: mockClasses.length,
    pendingRequests: mockClasses.filter(c => c.status === 'inactive').length,
    activeTutors: 12,
    totalStudents: 150
  };

  useEffect(() => {
    if (!currentUser || !hasRole('admin')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleApprove = (reqId: string, subject: string) => {
    toast({
      title: "Request Approved",
      description: `Class request for "${subject}" approved. You can now assign a tutor.`,
    });
  };

  const handleReject = (reqId: string, subject: string) => {
    toast({
      variant: "destructive",
      title: "Request Rejected",
      description: `Class request "${subject}" has been denied.`,
    });
  };

  if (!currentUser) return null;

  return (
    <Header role="admin">
      <div className="space-y-8">
        
        {/* Welcome & Overview */}
        <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gradient-700">
              System overview, request management, and reporting
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Class Requests
                  </CardTitle>
                  <CardDescription>New topics requested by students</CardDescription>
                </div>
                <Link to="/admin/requests">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all cursor-pointer">
                    
                    {/* Header: Subject + Status */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-black">{req.subject}</h4>
                        <p className="text-xs text-gradient-700 font-mono">{req.code}</p>
                      </div>
                      <Badge variant="outline">
                        Pending
                      </Badge>
                    </div>

                    {/* Content: Student Count + Schedule */}
                    <div className="flex items-center justify-between gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5" title="Students Interested">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-bold text-gray-800">{req.studentCount}</span> students
                        </div>
                        <div className="flex items-center gap-1.5" title="Preferred Time">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="truncate max-w-[150px]">{req.preferredSchedule}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end pt-3 border-t border-dashed">
                      <Button 
                            variant="outline" 
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            size="sm" 
                            onClick={() => handleReject(req.id, req.subject)}
                        >
                            <XCircle className="w-4 h-4 mr-1" /> Deny
                      </Button>
                      <Button 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm" 
                            onClick={() => handleApprove(req.id, req.subject)}
                        >
                            <CheckCircle className="w-4 h-4 mr-1" /> Open Class
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2 opacity-20" />
                    <p>No pending requests.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Classes Monitor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    Recent Active Classes
                  </CardTitle>
                  <CardDescription>Monitor ongoing classes</CardDescription>
                </div>
                <Link to="/admin/classes">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeClasses.map((cls) => (
                <Link key={cls.id} to={`/admin/classes/${cls.id}`}>
                    <div className="p-4 rounded-lg border border-gradient hover:border-primary/50 hover:shadow-card transition-all cursor-pointer mb-4">
                        <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-black">{cls.subject}</h4>
                            <p className="text-sm text-gradient-700 font-mono">{cls.code}</p>
                        </div>
                        <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-sm text-gradient-700">
                            <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {cls.tutorName}
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {cls.enrolledStudents}/{cls.maxStudents} Students
                            </span>
                        </div>
                    </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
            <CardDescription>Access management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/admin/classes">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <BookOpen className="w-4 h-4 hidden md:block" />
                  <span>Manage Classes</span>
                </Button>
              </Link>
              <Link to="/admin/requests">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <MessageSquare className="w-4 h-4 hidden md:block" />
                  <span>Class Requests</span>
                </Button>
              </Link >
              <Link to="/admin/reports">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <BarChart3 className="w-4 h-4 hidden md:block" />
                  <span>System Reports</span>
                </Button>
              </Link>
              <Link to="/admin/dashboard">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Users className="w-4 h-4 hidden md:block" />
                  <span>Manage Users</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
};

export default AdminDashboard;