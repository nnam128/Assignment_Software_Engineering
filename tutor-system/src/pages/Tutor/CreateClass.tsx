import { useEffect, useState } from 'react';
import { Header } from '../../component/Header'
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Textarea } from '../../component/ui/TextArea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Label } from '../../component/ui/label';
import { Badge } from '../../component/ui/badge';
import { Calendar, Users, Clock, Search, Filter, Save } from 'lucide-react';
import { useToast } from '../../component/UseToast';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';

function CreateClass(){
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
    useEffect(() => {
      if (!currentUser || !hasRole('tutor')) {
        navigate('/');
      }
    }, [currentUser, navigate]);
  
    if (!currentUser) return null;

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    description: '',
    maxStudents: '',
    schedule: '',
    location: '',
    startDate: '',
    duration: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Class Created Successfully",
      description: `${formData.subject} has been created and is now active`,
    });

    setFormData({
      subject: '',
      code: '',
      description: '',
      maxStudents: '',
      schedule: '',
      location: '',
      startDate: '',
      duration: '',
      endDate: '',
    });

    setTimeout(() => {
      navigate('/tutor/classes');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <Header role="tutor">
      <div className="max-w mx-auto space-y-6">
        {/* welcome */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Class</h1>
          <p className="text-gradient-700">
            Set up a new tutoring class for students to enroll
          </p>
        </div>

        {/* Request form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential details about your class</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="e.g., Advanced Mathematics"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">
                        Class Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="code"
                        name="code"
                        placeholder="e.g., MATH301"
                        value={formData.code}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe what students will learn in this class..."
                      value={formData.description}
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
                  <CardDescription>Schedule and capacity information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">
                        Maximum Students <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="maxStudents"
                        name="maxStudents"
                        type="number"
                        min="1"
                        placeholder="e.g., 15"
                        value={formData.maxStudents}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Session Duration (hours)</Label>
                      <Input
                        id="duration"
                        name="duration"
                        type="number"
                        step="0.5"
                        min="0.5"
                        placeholder="e.g., 1.5"
                        value={formData.duration}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        name="schedule"
                        placeholder="e.g., Mon, Wed 14:00-15:30"
                        value={formData.schedule}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Room 201"
                        value={formData.location}
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
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
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
                    <Link to="/tutor/classes">
                      <Button type="button" variant="outline" className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Create Class
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
      </div>
    </Header>
  );
};

export default CreateClass;
