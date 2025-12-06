import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Clock, MapPin, ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import type { Session } from '../data/hardcodedData';
import { Link } from 'react-router-dom';
import { Label } from '@radix-ui/react-label';
import { Textarea } from './ui/TextArea';
import { Input } from './ui/input';
import { useToast } from './UseToast';

interface WeeklyCalendarProps {
  sessions: Session[];
  role: 'tutor' | 'student';
  inclass: boolean;
}

function WeeklyCalendar({ sessions, role, inclass = false }: WeeklyCalendarProps) {
  // --- STATE & CONFIG ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 - 22:00
  const weekDaysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // --- HELPER FUNCTIONS ---
  
  // Lấy ngày thứ 2 đầu tuần
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    // Điều chỉnh để tuần bắt đầu từ Thứ 2 (Monday) thay vì Chủ Nhật
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
  };

  // Tạo mảng 7 ngày trong tuần
  const generateWeekDays = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  // Check xem có phải hôm nay không
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();
  };

  // Format tiêu đề tháng/năm
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Memoize danh sách ngày để tối ưu performance
  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = useMemo(() => generateWeekDays(startOfWeek), [startOfWeek]);

  // --- NAVIGATION HANDLERS ---
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // --- POSITION & COLOR LOGIC ---
  const getSessionPosition = (session: Session) => {
    const dayMatch = session.date.match(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/);
    const timeMatch = session.time.match(/(\d+):(\d+)/);
    
    if (!dayMatch || !timeMatch) return null;
    
    const dayIndex = weekDaysName.indexOf(dayMatch[0]);
    const hour = parseInt(timeMatch[1]);
    const minute = parseInt(timeMatch[2]);
    
    const durationMatch = session.duration.match(/(\d+\.?\d*)\s*hour/);
    const duration = durationMatch ? parseFloat(durationMatch[1]) : 2;
    
    return {
      day: dayIndex,
      hour: hour,
      minute: minute,
      duration,
    };
  };

  function getStatusColor(status: string){
    switch (status) {
      case 'completed': return 'bg-secondary-700/20 border-secondary-700 text-secondary-700';
      case 'scheduled': return 'bg-primary/20 border-primary text-primary';
      case 'cancelled': return 'bg-destructive/20 border-destructive text-destructive';
      default: return 'bg-gradient border-gradient-700 text-black';
    }
  };

  const [change, setChange] = useState(false);
  function changeSession() : void{
    if(!inclass) return;
    setChange(!change);
  }

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    reason: '',
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
      reason: '',
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

  return (
    <div className="space-y-4">
      <div className='flex justify-between items-center py-2 px-0'>
        <div>
          <h2 className="p-2 md:pl-5 text-2xl font-bold text-black">
            {formatMonthYear(startOfWeek)}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <div className="flex items-center rounded-md border border-gradient bg-white">
            <Button variant="ghost" size="icon" onClick={handlePrevWeek} className="h-8 w-8 hover:bg-gradient-50">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="w-[1px] h-4 bg-gradient"></div>
            <Button variant="ghost" size="icon" onClick={handleNextWeek} className="h-8 w-8 hover:bg-gradient-50">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <Card className="border-none bg-white shadow-sm p-0 overflow-hidden rounded-none">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] p-0">
            
            <div className="grid grid-cols-8 border-b border-t border-gradient m-0">
              <div className="sticky left-0 z-40 flex justify-center items-center text-xs font-semibold uppercase text-gradient-700 border-r border-gradient bg-gradient-50 flex-col pb-2">
                TIME
              </div>
              
              {weekDays.map((date, index) => {
                const isCurrentDay = isToday(date);
                return (
                  <div key={index} className={`py-3 px-1 text-center border-r border-gradient last:border-r-0 ${isCurrentDay ? 'bg-primary/5' : 'bg-gradient-50'}`}>
                    <div className={`text-xs font-semibold uppercase ${isCurrentDay ? 'text-primary' : 'text-gradient-600'}`}>
                      {weekDaysName[index].slice(0, 3)}
                    </div>
                    <div className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold ${
                      isCurrentDay 
                        ? 'bg-primary text-white shadow-md transform scale-110 transition-transform' 
                        : 'text-gray-700 hover:bg-black/5 cursor-pointer rounded-full'
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b bg-white border-grid hover:bg-gradient-50/50 transition-colors h-[50px] overflow-visible">
                  
                  <div className="sticky left-0 z-30 w-full h-[50px] bg-white border-r border-b border-grid flex items-center justify-center">
                    <span className="bg-white px-1 text-xs text-gradient-700 font-medium z-10">
                      {hour.toString().padStart(2, '0')}:00
                    </span>
                  </div>

                  {weekDaysName.map((_, dayIndex) => (
                    <div key={dayIndex} className="border-r border-grid last:border-r-0 relative overflow-visible group">
                      
                      {sessions
                        .filter((session) => {
                          const pos = getSessionPosition(session);
                          return pos && pos.day === dayIndex && pos.hour === hour;
                        })
                        .map((session) => {
                          const pos = getSessionPosition(session);
                          if (!pos) return null;
                          
                          const topOffset = (pos.minute / 60) * 50;
                          const height = pos.duration * 50;
                          
                          return (
                            <Link key={session.id} to={(role === 'student') ?`/student/classes/${session.classId}` : `/tutor/classes/${session.classId}`}
                              onClick={changeSession}>
                              <div
                                className={`absolute left-0.5 right-1 border-l-[3px] rounded-r p-1.5 ${getStatusColor(session.status)} overflow-hidden shadow-sm hover:shadow-lg hover:z-20 hover:scale-[1.02] transition-all cursor-pointer`}
                                style={{
                                  top: `${topOffset}px`,
                                  height: `${height - 1}px`,
                                  zIndex: 10
                                }}
                              >
                                <div className="text-[11px] font-bold leading-tight mb-0.5 truncate">
                                  {session.title}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] opacity-90 mb-0.5">
                                  <Clock className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{session.time}</span>
                                </div>
                                {height > 40 && (
                                  <div className="flex items-center gap-1 text-[10px] opacity-80">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{session.location}</span>
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      {change && inclass &&
      <>
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

                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={changeSession}>
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
      </>}
    </div>
  );
};

export default WeeklyCalendar;