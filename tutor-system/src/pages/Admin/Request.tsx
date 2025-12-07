import { Header } from '../../component/Header';
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Badge } from '../../component/ui/badge';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '../../component/ui/card';
import { mockClassRequests, type ClassRequest } from '../../data/hardcodedData'; 
import { Search, Filter, Check, X, Calendar, Users, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../../component/ui/label';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { useToast } from '../../component/UseToast';


export function AdminRequestClass() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { toast } = useToast(); 

  useEffect(() => {
    if (!currentUser || !hasRole('admin')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const [requests, setRequests] = useState<ClassRequest[]>(mockClassRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  if (!currentUser) return null;

  const filters = [
    { value: 'all', label: 'All Requests' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'high_demand', label: 'High Demand' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleApprove = (req: ClassRequest) => {
    setRequests(prev => prev.map(item => 
        item.id === req.id ? { ...item, status: 'approved' } : item
    ));

    toast({
        title: "Request Approved",
        description: `Successfully approved class: ${req.subject}`,
    });
  };

  const handleReject = (req: ClassRequest) => {
    setRequests(prev => prev.map(item => 
        item.id === req.id ? { ...item, status: 'rejected' } : item
    ));

    toast({
        title: "Request Rejected",
        description: `Rejected request for: ${req.subject}`,
        variant: "destructive",
    });
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.code.toLowerCase().includes(searchQuery.toLowerCase());
                          
    let matchesFilter = false;
    switch (selectedFilter) {
      case 'all':
        matchesFilter = true;
        break;
      case 'high_demand':
        matchesFilter = req.studentCount >= 5;
        break;
      default:
        matchesFilter = req.status === selectedFilter;
    }
    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => b.studentCount - a.studentCount);

  return (
    <Header role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Class Requests Review</h1>
            <p className="text-gradient-700">
              Manage student demands and approve new class topics
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white">
          <CardContent className="pt-6 space-y-4">
            <Label htmlFor='request-search'>Search Requests *</Label>
            <div className="flex flex-col md:flex-row gap-3 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gradient-700" />
                <Input
                  id='request-search'
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
                  className="cursor-pointer hover:bg-primary-500/90 hover:text-white transition-colors px-4 py-1.5"
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
            Showing <span className="font-semibold text-black">{filteredRequests.length}</span> requests
          </p>
        </div>

        {/* Request Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <Card key={req.id} className={`flex flex-col h-full hover:shadow-md transition-all duration-300 `}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{req.subject}</CardTitle>
                    <CardDescription className="font-mono text-xs mt-1">{req.code}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4 text-sm">
                <div className="bg-slate-50 p-3 rounded text-slate-600 italic">
                  "{req.description}"
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Pref: {req.preferredSchedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Created: {req.createdDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="truncate max-w-[200px]" title={req.requestedBy.join(', ')}>
                        Req by: {req.requestedBy.length} students
                      </span>
                  </div>
                </div>

                {req.status !== 'pending' && (
                    <div className={`text-center py-3 mt-8 rounded font-bold uppercase text-xs flex items-center justify-center gap-2 ${req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {req.status === 'approved' ? <Check className="w-4 h-4"/> : <X className="w-4 h-4"/>}
                        {req.status}
                    </div>
                )}
              </CardContent>

              {req.status === 'pending' && (
                <CardFooter className="grid grid-cols-2 gap-3 pt-2 bg-gray-50/50">
                    <Button 
                        variant="outline" 
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleReject(req)}
                    >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                    </Button>
                    <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApprove(req)}
                    >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                    </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="white">
            <CardContent className="py-12 text-center">
              <p className="text-gradient-700 mb-4">No requests found matching your criteria</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Header>
  );
}

export default AdminRequestClass;