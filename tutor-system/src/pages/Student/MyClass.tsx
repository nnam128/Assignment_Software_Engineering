import { useEffect, useState } from 'react';
import { Header } from '../../component/Header';
import { mockClasses } from '../../data/hardcodedData';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '../../component/ui/input';
import { Badge } from '../../component/ui/badge';
import ClassCard from '../../component/ui/ClassCard';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../Authentic/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader } from '../../component/ui/card';


const StudentMyClasses = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  useEffect(() => {
    if (!currentUser || !hasRole('student')) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null; 



  const [searchQuery, setSearchQuery] = useState('');
  const enrolledClasses = mockClasses.slice(0, 4);

  const filteredClasses = enrolledClasses.filter((classData) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      classData.subject.toLowerCase().includes(searchLower) ||
      classData.code.toLowerCase().includes(searchLower) ||
      classData.tutorName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Header role="student">
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold mb-2">My Classes</h1>
          <p className="text-gradient-700">
            View and manage your enrolled classes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className='w-5 h-5 text-primary' />
              <CardDescription>Total Classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">{enrolledClasses.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className='w-5 h-5 text-secondary' />
              <CardDescription>Active Classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">{enrolledClasses.filter(c => c.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className='w-5 h-5 text-accent-600' />
              <CardDescription>Sessions This Week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">{enrolledClasses.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gradient-700" />
          <Input
            type="text"
            placeholder="Search your classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 "
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Enrolled Classes</h2>
            <Badge variant="outline">{filteredClasses.length} classes</Badge>
          </div>
          
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classData) => (
                <ClassCard
                  key={classData.id}
                  classData={classData}
                  enrolled={true}
                  link ={classData.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gradient">
              <p className="text-gradient-700">No classes found</p>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default StudentMyClasses;
