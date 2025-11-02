import { useEffect, useState } from 'react';
import { Header } from '../../component/Header'
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Textarea } from '../../component/ui/TextArea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../component/ui/card';
import { Label } from '../../component/ui/label';
import { mockClassRequests } from '../../data/hardcodedData';
import { Badge } from '../../component/ui/badge';
import { Calendar, Users, Clock, Search, Filter } from 'lucide-react';
import { useToast } from '../../component/UseToast';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';

function RequestClass(){
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
    useEffect(() => {
      if (!currentUser || !hasRole('student')) {
        navigate('/login');
      }
    }, [currentUser, navigate]);
  
    if (!currentUser) return null;

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    preferredSchedule: '',
    description: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { value: 'all', label: 'All Classes' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'joined', label: 'joined' },
  ];

  const filteredClasses = mockClassRequests.filter(cls => {
      const matchesSearch = cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) || cls.code.toLowerCase().includes(searchQuery.toLowerCase()) 
                          || cls.code.toLowerCase().includes(searchQuery.toLowerCase())|| cls.preferredSchedule.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' ||
                            (selectedFilter === 'joined' && (cls.requestedBy.includes('S001'))) ||
                            cls.status === selectedFilter
      return matchesSearch && matchesFilter;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "Your class request has been submitted successfully.",
    });
    setFormData({
      subject: '',
      code: '',
      preferredSchedule: '',
      description: '',
    });
  };

  const handleRequest = (title: string, descrip: string) => {
    toast({
      title: title,
      description: descrip,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Header role="student">
      <div className="max-w mx-auto space-y-6">
        {/* welcome */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Request a Class</h1>
          <p className="text-gradient-700">
            Can't find the class you need? Request a new one!
          </p>
        </div>

        {/* Request form */}
        <Card>
          <CardHeader>
            <CardTitle>New Class Request</CardTitle>
            <CardDescription>
              Fill in the details below. Requests with more students get higher priority.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Name *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Blockchain Technology"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code *</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., CO4074"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredSchedule">Preferred Schedule *</Label>
                <Input
                  id="preferredSchedule"
                  name="preferredSchedule"
                  value={formData.preferredSchedule}
                  onChange={handleChange}
                  placeholder="e.g., Thursday 17:00-19:00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what topics you'd like to learn, why this class is needed, etc."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-2">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* existing requests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Existing Requests</h2>

          {/* Search and Filters */}
          <Card className=" bg-white">
            <CardContent className="pt-6 space-y-4">
              <Label htmlFor='class-search'>Search Class *</Label>
              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gradient-700" />
                  <Input
                    id='class-search'
                    placeholder="Search by subject or code..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Badge
                    key={filter.value}
                    variant={selectedFilter === filter.value ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/90 transition-colors px-4 py-1.5"
                    onClick={() => setSelectedFilter(filter.value)}
                  >
                    {filter.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gradient-700">
              Showing <span className="font-semibold text-black">{filteredClasses.length}</span> classes
            </p>
          </div>

          {/* display result */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{request.subject}</CardTitle>
                      <CardDescription className="font-mono text-sm">
                        {request.code}
                      </CardDescription>
                    </div>
                    {request.requestedBy.includes('S001') && (
                        <Badge variant="destructive">
                          Joined
                        </Badge>
                    )}
                    <Badge
                      variant={
                        request.status === 'approved'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gradient-700">{request.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-black">
                        {request.studentCount} students interested
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-gradient-700">
                        {request.preferredSchedule}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-gradient-700">
                        Requested on {request.createdDate}
                      </span>
                    </div>
                  </div>

                  {request.requestedBy.includes('S001') && (request.status === 'pending') && (
                    <div className="pt-2 border-t border-border/50">
                      <Button variant="outline" className="w-full" size="sm" onClick={() =>{handleRequest("You’ve joined this request.", "Click again if you want to leave.")}}>
                        Leave Request
                      </Button>
                    </div>
                  )}
                  {!request.requestedBy.includes('S001') && (request.status === 'pending') && (
                    <div className="pt-2 border-t border-border/50">
                      <Button variant="outline" className="w-full" size="sm" onClick={() =>{handleRequest("You’ve left this request.", "Click again if you want to join back.")}}>
                      Join Request
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default RequestClass;
