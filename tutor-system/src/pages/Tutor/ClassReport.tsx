import { Header } from '../../component/Header';
import { Button } from '../../component/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../component/ui/card';
import { Badge } from '../../component/ui/badge';
import { Input } from '../../component/ui/input';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star, 
  Download, 
  Printer, 
  Search,
  Filter,
  ArrowUpRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { mockClasses, mockClassReports, type Class, type ClassPerformanceStats } from '../../data/hardcodedData';
import { useToast } from '../../component/UseToast';

// Helper type để merge thông tin Class và Stats
type CombinedReport = Class & ClassPerformanceStats;

export function ViewClassReport() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { toast } = useToast();

  const [reportData, setReportData] = useState<CombinedReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [overallStats, setOverallStats] = useState({
    totalStudents: 0,
    avgAttendance: 0,
    avgFeedback: 0,
    activeClasses: 0
  });

  useEffect(() => {
    if (!currentUser || !hasRole('tutor')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const tutorClasses = mockClasses.filter(c => c.tutorId === currentUser?.id || true);

    const combined: CombinedReport[] = tutorClasses.map(cls => {
      const stats = mockClassReports.find(r => r.classId === cls.id) || {
        classId: cls.id,
        attendanceRate: 0,
        participationLevel: 0,
        avgFeedback: 0,
        studentPassRate: 0,
        totalSessionsCompleted: 0
      };
      return { ...cls, ...stats };
    });

    if (combined.length > 0) {
      const totalStudents = combined.reduce((acc, curr) => acc + curr.enrolledStudents, 0);
      const avgAttendance = combined.reduce((acc, curr) => acc + curr.attendanceRate, 0) / combined.length;
      const avgFeedback = combined.reduce((acc, curr) => acc + curr.avgFeedback, 0) / combined.length;
      const activeClasses = combined.filter(c => c.status === 'active').length;

      setOverallStats({
        totalStudents,
        avgAttendance: Math.round(avgAttendance),
        avgFeedback: Number(avgFeedback.toFixed(1)),
        activeClasses
      });
    }

    setReportData(combined);
  }, [currentUser]);

  const filteredReports = reportData.filter(item => 
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    toast({
      title: "Exporting Report",
      description: "Overall_Teaching_Report.pdf has been downloaded.",
    });
  };

  if (!currentUser) return null;

  return (
    <Header role="tutor">
      <div className="space-y-8 pb-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2 flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-secondary" />
              Teaching Performance Report
            </h1>
            <p className="text-gradient-700">
              Overview analysis across all your {overallStats.activeClasses} active classes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" /> Export Summary
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="gap-2">
              <Printer className="w-4 h-4" /> Print
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Students</p>
                  <h3 className="text-2xl font-bold mt-1">{overallStats.totalStudents}</h3>
                </div>
                <div>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-green-600 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" /> +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
                  <h3 className="text-2xl font-bold mt-1">{overallStats.avgAttendance}%</h3>
                </div>
                <div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Target: 80%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Feedback</p>
                  <h3 className="text-2xl font-bold mt-1">{overallStats.avgFeedback}</h3>
                </div>
                <div>
                  <Star className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="mt-2 flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1.5 w-4 rounded-full ${i <= overallStats.avgFeedback/2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Classes Monitored</p>
                  <h3 className="text-2xl font-bold mt-1">{reportData.length}</h3>
                </div>
                <div>
                  <Filter className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-purple-600 font-medium">
                {overallStats.activeClasses} Active / {reportData.length - overallStats.activeClasses} Inactive
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Class Comparison Analysis (AFb)</CardTitle>
            <CardDescription>Comparing Attendance and Participation rates across your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end justify-around gap-4 px-2 pt-8">
              {filteredReports.slice(0, 5).map((cls, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2 h-full group">
                  <div className="relative w-full max-w-[60px] flex justify-center gap-1 h-full items-end">
                    {/* Attendance Bar */}
                    <div 
                      className="w-full bg-primary/80 rounded-t-sm hover:bg-primary transition-all relative group/bar" 
                      style={{ height: `${cls.attendanceRate}%` }}
                    >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 z-10 whitespace-nowrap">
                            Att: {cls.attendanceRate}%
                        </div>
                    </div>
                    {/* Participation Bar */}
                    <div 
                      className="w-full bg-green-500/80 rounded-t-sm hover:bg-green-500 transition-all relative group/bar" 
                      style={{ height: `${cls.participationLevel}%` }}
                    >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 z-10 whitespace-nowrap">
                            Part: {cls.participationLevel}%
                        </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 text-center truncate w-full" title={cls.subject}>
                    {cls.code}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-sm"></div>
                    <span>Attendance Rate</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span>Participation Level</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
            <Card className='px-6 pb-6'>
							<CardHeader className="flex items-center justify-between flex-row px-0">
                <CardTitle>Detailed Class Reports</CardTitle>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                        placeholder="Search class..." 
                        className="pl-8 bg-white" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
							</CardHeader>
            

            <div className="rounded-md border border-gradient-600 bg-white overflow-x-scroll shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b">
                        <tr>
                            <th className="px-6 py-4">Class Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Sessions</th>
                            <th className="px-6 py-4 text-center">Attendance</th>
                            <th className="px-6 py-4 text-center">Participation</th>
                            <th className="px-6 py-4 text-center">Feedback</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredReports.map((cls) => (
                            <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{cls.subject}</div>
                                    <div className="text-xs text-gray-500">{cls.code}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={cls.status === 'active' ? 'default' : 'secondary'}>
                                        {cls.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {cls.totalSessionsCompleted}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-bold ${cls.attendanceRate < 75 ? 'text-red-500' : 'text-gray-700'}`}>
                                        {cls.attendanceRate}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: `${cls.participationLevel}%` }}></div>
                                        </div>
                                        <span className="text-xs">{cls.participationLevel}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Badge variant={cls.avgFeedback >= 8 ? 'outline' : 'destructive'} className="font-mono">
                                        {cls.avgFeedback}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm" onClick={() => navigate(`/tutor/classes/${cls.id}`)}>
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {filteredReports.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                    No classes found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
					</Card>
        </div>

      </div>
    </Header>
  );
}

export default ViewClassReport;