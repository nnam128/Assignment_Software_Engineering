import { Link, useNavigate, useParams } from "react-router-dom";
import { mockClasses, mockPosts, mockSessions } from "../../data/hardcodedData";
import { Community } from "../../component/Community";
import WeeklyCalendar from "../../component/WeeklyCalendar";
import { SessionNote } from "../../component/SessionNote";
import { Resource } from "../../component/Resource";
import { getCurrentUser, hasRole } from "../../Authentic/AuthProvider";
import { useEffect } from "react";
import { Header } from "../../component/Header";
import { Button } from "../../component/ui/button";
import { ArrowLeft, Calendar, FileText, MapPin, MessageSquare, TrendingUp, Users } from "lucide-react";
import { Badge } from "../../component/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../component/ui/card";
import { Tabs } from "../../component/ui/tab";
import { TabsContent, TabsList, TabsTrigger } from "../../component/ui/tab";

export function StudentClassDetail(){
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
    useEffect(() => {
      if (!currentUser || !hasRole('student')) {
        navigate('/login');
      }
    }, [currentUser, navigate]);
  
    if (!currentUser) return null;

  const { id } = useParams();
  const classPosts = mockPosts.filter((p) => p.classId === id);
  const sessions = mockSessions.filter((s)=> s.classId === id);
  const classInfo  = mockClasses.find((cls)=> cls.id === id);
  
  if (!classInfo) {
    return (
      <Header role="student">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Class not found</p>
        </div>
      </Header>
    );
  }

    return(
      <>
      <Header role='student'>
        <div className="space-y-6">
        {/* Back Button */}
        <Link to="/student/my-classes">
          <Button variant="ghost" className="gap-2 mt-[-10px]">
            <ArrowLeft className="w-4 h-4" />
            Back to Classes
          </Button>
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-primary-500 via-primary-300 to-[#0baaa5] rounded-xl p-8 text-white my-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{classInfo.subject}</h1>
              <p className="text-white/80 font-mono text-lg">{classInfo.code}</p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {classInfo.status}
            </Badge>
          </div>
          <p className="text-white/90 mb-6 max-w-3xl">{classInfo.description}</p>
          <div className="flex flex-wrap gap-2">
            {classInfo.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/10 text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* info cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-gradient bg-white">
            <CardHeader className="pb-2">
              <Users className="w-5 h-5 text-primary mb-2" />
              <CardDescription>Tutor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-black">{classInfo.tutorName}</p>
            </CardContent>
          </Card>
          <Card className="border-gradient bg-white">
            <CardHeader className="pb-2">
              <Calendar className="w-5 h-5 text-secondary mb-2" />
              <CardDescription>Schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-black text-sm">{classInfo.schedule}</p>
            </CardContent>
          </Card>
          <Card className="border-gradient bg-white">
            <CardHeader className="pb-2">
              <MapPin className="w-5 h-5 text-accent mb-2" />
              <CardDescription>Location</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-black">{classInfo.location}</p>
            </CardContent>
          </Card>
          <Card className="border-gradient bg-white">
            <CardHeader className="pb-2">
              <Users className="w-5 h-5 text-secondary-700 mb-2" />
              <CardDescription>Students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-black">
                {classInfo.enrolledStudents}/{classInfo.maxStudents}
              </p>
            </CardContent>
          </Card>
        </div>


        {/* Tabs */}
        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 gap-2">
            <TabsTrigger value="sessions" className="gap-2">
              <Calendar className="w-4 h-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <FileText className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
          </TabsList>
        
        {/* Community Tab */}
          <TabsContent value="community" className="">
            <Community classPosts = {classPosts} id = {id} />
          </TabsContent>

          {/* session tab */}
          <TabsContent value="sessions" className="">
            <div className="max-h-100 overflow-scroll rounded-lg"><WeeklyCalendar sessions={sessions}/></div>
            <SessionNote sessions={sessions} />
          </TabsContent>

          {/* Resource Tab */}
          <TabsContent value="resources" className="">
            <Resource sessions={sessions} classInfo={classInfo} />
          </TabsContent>

        {/* Progress tab */}
          <TabsContent value="progress">
            <Card className="border-gradient-50 bg-white">
              <CardHeader>
                <CardTitle>My Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: 'Attendance', value: '89%', color: 'text-success' },
                    { label: 'Completed Sessions', value: '8/12', color: 'text-primary' },
                    { label: 'Participation', value: 'High', color: 'text-secondary' },
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gradient-50 border border-gradient-50">
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </Header>
      </>
    )
}