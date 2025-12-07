import { Header } from '../../component/Header';
import ClassCard from '../../component/ui/ClassCard';
import { Button } from '../../component/ui/button';
import { Input } from '../../component/ui/input';
import { Badge } from '../../component/ui/badge';
import { Card, CardContent } from '../../component/ui/card';
import { mockClasses } from '../../data/hardcodedData';
import { Search, Filter, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../../component/ui/label';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';


export function StudentClasses(){
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
    useEffect(() => {
      if (!currentUser || !hasRole('student')) {
        navigate('/');
      }
    }, [currentUser, navigate]);
  
    if (!currentUser) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { value: 'all', label: 'All Classes' },
    { value: 'available', label: 'Available' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'full', label: 'Full' },
  ];

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) || cls.code.toLowerCase().includes(searchQuery.toLowerCase()) 
                        || cls.tutorName.toLowerCase().includes(searchQuery.toLowerCase())|| cls.tutorId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
                          (selectedFilter === 'available' && (cls.status === 'active' || cls.status === 'inactive') && cls.enrolledStudents < cls.maxStudents) ||
                          (selectedFilter === 'full' && cls.enrolledStudents === cls.maxStudents) ||
                          cls.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Header role="student">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Find Classes</h1>
            <p className="text-gradient-700">
              Browse and enroll in available tutoring classes
            </p>
          </div>
          <Link to={`/student/request`}>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Request New Class
            </Button>
          </Link>
        </div>

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
            Showing <span className="font-semibold text-black">{filteredClasses.length}</span> classes
          </p>
        </div>

        {/* Class Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <ClassCard
              key={cls.id}
              classData={cls}
              showEnrollButton={true}
              enrolled = {cls.id === "C005" ? true : false}
              tutor={false}
            />
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <Card className="white">
            <CardContent className="py-12 text-center">
              <p className="text-gradient-700 mb-4">No classes found matching your criteria</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Header>
  );
};

export default StudentClasses;

