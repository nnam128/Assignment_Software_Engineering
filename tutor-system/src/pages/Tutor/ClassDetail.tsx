import { Link, useNavigate, useParams } from "react-router-dom";
import { mockClasses, mockPosts, mockSessions } from "../../data/hardcodedData";
import { Community } from "../../component/Community";
import WeeklyCalendar from "../../component/WeeklyCalendar";
import { SessionNote } from "../../component/SessionNote";
import { Resource } from "../../component/Resource";
import { getCurrentUser, hasRole } from "../../Authentic/AuthProvider";
import { useEffect, useState } from "react";
import { Header } from "../../component/Header";
import { Button } from "../../component/ui/button";
import { ArrowLeft, Calendar, FileText, MapPin, MessageSquare, PenLine, Save, TrendingUp, Users } from "lucide-react";
import { Badge } from "../../component/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../component/ui/card";
import { Tabs } from "../../component/ui/tab";
import { TabsContent, TabsList, TabsTrigger } from "../../component/ui/tab";
import { FeedbackForm, type FeedbackFormData } from "../../component/Feedback";
import { useToast } from "../../component/UseToast";
import { Label } from '../../component/ui/label';
import { Input } from "../../component/ui/input";
import { Textarea } from "../../component/ui/TextArea";


export function TutorClassDetail(){
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
    useEffect(() => {
      if (!currentUser || !hasRole('tutor')) {
        navigate('/');
      }
    }, [currentUser, navigate]);
  
    if (!currentUser) return null;

  const { id } = useParams();
  const classPosts = mockPosts.filter((p) => p.classId === id);
  const sessions = mockSessions.filter((s)=> s.classId === id);
  const classInfo  = mockClasses.find((cls)=> cls.id === id);
  
  if (!classInfo) {
    return (
      <Header role="tutor">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Class not found</p>
        </div>
      </Header>
    );
  }

  const handleFeedbackSubmit = async (data: FeedbackFormData) => {
    console.log("Ratings:", data.ratings);
    console.log("Description:", data.description);
  };

  const [change, setChange] = useState(false);
  function editDetail() : void{
    setChange(!change);
  }

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    description: '',
    maxStudents: '',
    schedule: '',
    location: '',
    startDate: '',
    minStudents: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Class Details Updated Successfully",
      description: `The details of the class have been updated.`,
    });

    setFormData({
      description: '',
      maxStudents: '',
      schedule: '',
      location: '',
      startDate: '',
      minStudents: '',
      endDate: '',
    });

    setTimeout(() => {
      setChange(!change);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // nếu status là active, chặn các field không cho edit
  if (classInfo.status === 'active' && (name === 'schedule' || name === 'maxStudents' || name === 'minStudents' || name === 'startDate')) {
    return; // không update
  }

  setFormData(prev => ({ ...prev, [name]: value }));
};

    return(
      <>
      <Header role='tutor'>
        <div className="space-y-6">
        {/* Back Button */}
        <div className="flex justify-between">
          <Link to="/tutor/classes">
            <Button variant="ghost" className="gap-2 mt-[-10px]">
              <ArrowLeft className="w-4 h-4" />
              Back to Classes
            </Button>
          </Link>

            <Button variant="ghost" className="gap-2 mt-[-10px]" onClick={editDetail}>
              <PenLine className="w-4 h-4" />
              Edit class’s details
            </Button>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <TabsContent value="sessions" className="space-y-6">
            <div className="max-h-100 overflow-scroll rounded-lg p-0 border border-gradient"><WeeklyCalendar sessions={sessions}/></div>
            <SessionNote sessions={sessions} />
          </TabsContent>

          {/* Resource Tab */}
          <TabsContent value="resources" className="">
            <Resource sessions={sessions} classInfo={classInfo} />
          </TabsContent>

        {/* Progress tab */}
          <TabsContent value="progress">
            <Card>
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
            <FeedbackForm
                  criteria={[
                    { id: "clarity", label: "Độ rõ ràng của bài giảng" },
                    { id: "engagement", label: "Mức độ tương tác" },
                  ]}
                  onSubmit={handleFeedbackSubmit}
                />
          </TabsContent>
        </Tabs>
      </div>
      </Header>
      {change &&
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-gradient opacity-50 "></div>
          <div className="relative z-10 bg-gradient-50 rounded-2xl max-h-[99vh] w-[80%] overflow-auto">
            <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded shadow-lg">
              {/* Basic Information */}
              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Only the description of your class can be changed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || classInfo.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Class Details */}
              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>Class Details</CardTitle>
                  <CardDescription>Min students, schedule, location, and start date cannot be changed once the class is active.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minStudents">Minimum Students</Label>
                      <Input
                        id="minStudents"
                        name="minStudents"
                        type="number"
                        step="1"
                        min="1"
                        value={formData.minStudents || classInfo.minStudents}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">
                        Maximum Students
                      </Label>
                      <Input
                        id="maxStudents"
                        name="maxStudents"
                        type="number"
                        min="1"
                        value={formData.maxStudents || classInfo.maxStudents}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        name="schedule"
                        value={formData.schedule || classInfo.schedule}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location || classInfo.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate || classInfo.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate || classInfo.endDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={editDetail}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="gap-2"
                    >
                      <PenLine className="w-4 h-4" />
                      Change Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      }
      </>
    )
}