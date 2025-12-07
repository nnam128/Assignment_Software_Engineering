import { Header } from '../../component/Header';
import { Button } from '../../component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Badge } from '../../component/ui/badge';
import { Progress } from '../../component/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../component/ui/tab';
import { 
  BarChart3, 
  AlertTriangle, 
  Star, 
  Users, 
  ArrowUpRight,
  MessageSquare,
  User
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { mockReports } from '../../data/hardcodedData';

// --- 1. MOCK DATA & INTERFACES ---



export function AdminClassReports() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser || !hasRole('admin')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const totalClasses = mockReports.length;
  const criticalClasses = mockReports.filter(c => c.status === 'Risk' || c.rescheduleCount > 3).length;
  const avgAttendance = Math.round(mockReports.reduce((acc, curr) => acc + curr.attendanceRate, 0) / totalClasses);
  const avgSystemRating = (mockReports.reduce((acc, curr) => acc + curr.avgRating, 0) / totalClasses).toFixed(1);

  return (
    <Header role="admin">
      <div className="space-y-6">
        {/* Title */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Class Monitoring & Reports</h1>
            <p className="text-gray-600">Overview of academic performance, schedule stability, and quality assurance.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Classes</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-gray-500">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalClasses}</div>
              <p className="text-xs text-gray-500">Classes requiring attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgAttendance}%</div>
              <p className="text-xs text-gray-500">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgSystemRating}</div>
              <p className="text-xs text-gray-500">Out of 5.0</p>
            </CardContent>
          </Card>
        </div>

        {/* --- MAIN TABS --- */}
        <Tabs defaultValue="reschedule" className="space-y-4">
          <TabsList className='flex items-center md:items-start w-fit'>
            <TabsTrigger value="reschedule" ><span className='hidden md:block'>Schedule</span> <span className="md:ml-1">Stability</span></TabsTrigger>
            <TabsTrigger value="progress" ><span className='hidden md:block'>Academic</span> <span className="md:ml-1"></span>Progress</TabsTrigger>
            <TabsTrigger value="feedback" ><span className='hidden md:block'>Student</span> <span className="md:ml-1"></span>Feedback</TabsTrigger>
          </TabsList>

          {/* TAB 1: RESCHEDULE MONITOR */}
          <TabsContent value="reschedule">
            <Card className="border-red-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle>Reschedule Frequency Monitor</CardTitle>
                </div>
                <CardDescription>
                  Track tutors who frequently change class schedules.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                    {mockReports.sort((a,b) => b.rescheduleCount - a.rescheduleCount).map((cls) => (
                        <div key={cls.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            {/* Left Side: Text Info Only */}
                            <div className="flex flex-col">
                                <p className="font-bold text-lg text-gray-900">{cls.tutorName}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="font-mono bg-gray-100 px-1 rounded">{cls.code}</span>
                                    <span>{cls.className}</span>
                                </div>
                            </div>

                            {/* Right Side: Metrics & Actions */}
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Freq</p>
                                    <div className="flex items-center gap-2 justify-center mt-1">
                                        <span className={`text-2xl font-bold ${cls.rescheduleCount > 3 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                                            {cls.rescheduleCount}
                                        </span>
                                    </div>
                                </div>
                                {cls.rescheduleCount > 3 ? (
                                    <Button variant="destructive" size="sm" className="w-32">Send Warning</Button>
                                ) : (
                                    <Button variant="secondary" size="sm" className="w-32" disabled>Normal</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: ACADEMIC PROGRESS */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Class Progress & Attendance</CardTitle>
                <CardDescription>Monitor syllabus completion and student participation rates.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockReports.map((cls) => (
                    <div key={cls.id} className="flex items-center border-gradient-600 border-b pb-3">
                      <div className="space-y-1 flex-2">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium leading-none">{cls.className} <span className="text-gray-400 font-normal">({cls.code})</span></p>
                            <Badge variant={cls.status === 'Risk' ? 'destructive' : cls.status === 'Behind' ? 'secondary' : 'default'} className="text-[10px] h-5 hidden md:block">
                                {cls.status}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <User className="w-3 h-3" />
                            <span className='hidden md:block'>{(cls.tutorName.trim().split(' ').length === 1 )?  cls.tutorName.trim().split(' ')[0] : cls.tutorName.trim().split(' ').slice(0, cls.tutorName.trim().split(' ').length - 1).join(' ')}</span>
                            {cls.tutorName.trim().split(' ').pop()}
                        </div>
                      </div>
                      
                      <div className='w-full flex-3 flex items-center flex-col md:flex-row'>
                      {/* Attendance Bar */}
                      <div className="w-[50%] md:px-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500">Attendance</span>
                            <span className={`text-xs font-bold ${cls.attendanceRate < 70 ? 'text-red-500' : 'text-green-600'}`}>{cls.attendanceRate}%</span>
                        </div>
                        <Progress value={cls.attendanceRate} className="h-2" />
                      </div>

                      {/* Syllabus Bar */}
                      <div className="w-[50%] md:px-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500">Syllabus</span>
                            <span className="text-xs font-bold">{cls.syllabusProgress}%</span>
                        </div>
                        <Progress value={cls.syllabusProgress} className="h-2 bg-blue-100" />
                      </div>
                      </div>
                      
                      <div className="ml-4 flex-1 flex items-end justify-end">
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/*STUDENT FEEDBACK */}
          <TabsContent value="feedback">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 border-gradient bg-white p-3 rounded-2xl">
                {mockReports.map(cls => (
                    <Card key={cls.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <Badge variant="outline">{cls.code}</Badge>
                                <div className="flex items-center gap-1">
                                    <Star className={`w-4 h-4 ${cls.avgRating >= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-400'}`} />
                                    <span className="font-bold">{cls.avgRating}</span>
                                </div>
                            </div>
                            <CardTitle className="text-base mt-2">{cls.className}</CardTitle>
                            <CardDescription className="text-xs">Tutor: {cls.tutorName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-50 p-3 rounded-md text-sm text-gray-600 italic relative">
                                "{cls.lastFeedback}"
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Header>
  );
}

export default AdminClassReports;