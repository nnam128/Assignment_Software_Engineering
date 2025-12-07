import { useState, useMemo } from 'react';
import { Card, CardContent} from './ui/card';
import { Button } from './ui/button';
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar, BrushCleaning, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Session } from '../data/hardcodedData';
import { Link } from 'react-router-dom';
import { Label } from '@radix-ui/react-label';
import { Textarea } from './ui/TextArea';
import { Input } from './ui/input';
import { useToast } from './UseToast';
import { CancleTable } from './CancleTable';
import { Badge } from './ui/badge';

interface WeeklyCalendarProps {
  sessions: Session[];
  role: 'tutor' | 'student';
  inclass: boolean;
  cancleList: Session[];
}

function WeeklyCalendar({ sessions, role, inclass = false, cancleList }: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 - 22:00
  const weekDaysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
  };

  const generateWeekDays = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();
  };

  const formatMonthYear = (date: Date) => {
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });

    return `${month} - ${year}`;
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = useMemo(() => generateWeekDays(startOfWeek), [startOfWeek]);

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
  const { toast } = useToast();


  const [cancle, setCancle] = useState(false);
  function cancleSession() : void{
    setCancle(!cancle);
  }

  const [formCancle, setFormCancle] = useState({
    reason: '',
  });

  const [checkCancle, setCheckCancle] = useState(false) ;
  const handleChangeCancle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  setFormCancle((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmitCancle = (e: React.FormEvent) => {
  e.preventDefault();

  if (!checkCancle) {
    toast({
      variant: "destructive",
      title: "Sesssion Required",
      description: "Please choose a session to delete the session.",
    });
    return;
  }
  if (!formCancle.reason.trim()) {
    toast({
      variant: "destructive",
      title: "Reason Required",
      description: "Please provide a reason before deleting the session.",
    });
    return;
  }
  

  toast({
    title: "Session Deleted Successfully",
    description: "The session has been deleted.",
  });


  setTimeout(() => {
    setCancle(!cancle);
    setFormCancle({ reason: '' });
  }, 1000);
};

interface Suggestion {
  id: string;
  date: string;
  time: string;
  duration: string;
  score: number;
  reason: string;
}
const [create, setCreate] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionList, setSuggestionList] = useState<Suggestion[]>([]);

  const toggleCreate = () => {
    setCreate(!create);
    if (create) {
      setFormCreate({ date: '', time: '', title: '', classId : '',location : ''});
      setShowSuggestions(false);
      setSuggestionList([]);
    }
  };

  const [formCreate, setFormCreate] = useState({
    date: '',
    time: '',
    title: '',
    classId : '',
    location : '',
  });

  const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCreate((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetchSuggestions = () => {
    setIsSuggesting(true);
    setShowSuggestions(true);

    setTimeout(() => {
      if (Math.random() < 0.1) {
        setIsSuggesting(false);
        toast({
          variant: "destructive",
          title: "Suggestion Failed",
          description: "Data sync failure (room/calendar unavailable). Please retry later.",
        });
        setShowSuggestions(false);
        return;
      }

      if (Math.random() < 0.1) {
        setIsSuggesting(false);
        setSuggestionList([]);
        return;
      }

      const today = new Date();
      const suggestedSlots: Suggestion[] = [];
      
      for (let i = 0; i < 3; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 3 + i); 
        
        const year = futureDate.getFullYear();
        const month = String(futureDate.getMonth() + 1).padStart(2, '0');
        const day = String(futureDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        const hour = 9 + i;
        const timeStr = `${hour.toString().padStart(2, '0')}:00`; 

        suggestedSlots.push({
          id: `sug-${i}`,
          date: dateStr, 
          time: timeStr,
          duration: '2',
          score: 95 - (i * 10),
          reason: i === 0 ? "Highest student availability" : "Alternative slot"
        });
      }

      setSuggestionList(suggestedSlots);
      setIsSuggesting(false);
      
      toast({
        title: "Suggestions Ready",
        description: "AI has generated optimal slots.",
      });

    }, 1500);
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setFormCreate(prev => ({
      ...prev,
      date: suggestion.date,
      time: suggestion.time,
      title: prev.title || "Suggested Session"
    }));
    setShowSuggestions(false);
    toast({
      title: "Slot Selected",
      description: `Selected ${suggestion.date} at ${suggestion.time}.`,
    });
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formCreate.date || !formCreate.time || !formCreate.title) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please fill all required fields." });
      return;
    }

    const selectedDate = new Date(formCreate.date);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    selectedDate.setHours(0,0,0,0);
    minDate.setHours(0,0,0,0);

    if (selectedDate < minDate) {
      toast({
        variant: "destructive",
        title: "Invalid Date",
        description: "Sessions must be scheduled at least 3 days in advance.",
      });
      return;
    }

    toast({
      title: "Request Sent",
      description: "Session proposal created. Notifying students...",
    });
    setTimeout(() => toggleCreate(), 1000);
  };

  const hasUniqueClassId = (sessions: Session[]) => {
    const classIds = new Set(sessions.map(s => s.classId));
    if (classIds.size === 1 && inclass) {
      const arr = Array.from(classIds);
      return arr[0];
    }

    return '';
  };


  return (
    <div className="bg-white">
      <div className='flex items-center justify-center mt-2'>
          <h2 className="p-2 md:pl-5 md:text-4xl text-2xl font-extrabold text-black">
            {formatMonthYear(startOfWeek)}
          </h2>
        </div>
      <div className='flex justify-between items-center px-3 pb-2'>
        {(role === 'student') ? 
        <>
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <div className="flex items-center rounded-md border border-gradient bg-white">
            <Button variant="ghost" size="icon" onClick={handlePrevWeek} className="h-8 w-8 hover:bg-gradient-50 hover:text-black">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="w-[1px] h-4 bg-gradient"></div>
            <Button variant="ghost" size="icon" onClick={handleNextWeek} className="h-8 w-8 hover:bg-gradient-50 hover:text-black">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
        :
        <>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <div className="flex items-center rounded-md border border-gradient bg-white">
            <Button variant="ghost" size="icon" onClick={handlePrevWeek} className="h-8 w-8 hover:bg-gradient-50 hover:text-black">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="w-[1px] h-4 bg-gradient"></div>
            <Button variant="ghost" size="icon" onClick={handleNextWeek} className="h-8 w-8 hover:bg-gradient-50 hover:text-black">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" onClick={cancleSession}>
            Delete
          </Button>
          <Button variant="default" size="sm" onClick={toggleCreate}>
            Create
          </Button>
        </div>
        </>
        }
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
                            <Link key={session.id} to={(role === 'student') ?`/student/classes/${session.classId}` : `/tutor/classes/${session.classId}`}>
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
                                  <>
                                  <div className="flex items-center gap-1 text-[10px] opacity-80">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{session.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] opacity-90 mb-0.5">
                                  <Calendar className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{session.date.slice(0, 3)}</span>
                                </div>
                                </>
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
      {cancle && role === 'tutor' &&
      <>
      <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-gradient opacity-50 "></div>
          <div className="relative z-10 bg-gradient-50 rounded-2xl max-h-[99vh] w-[80%] md:w-[600px] overflow-auto">
            <form onSubmit={handleSubmitCancle} className="space-y-4 p-6 rounded shadow-lg">
              <CancleTable cancleList={cancleList}
                onSelectedChange={(selectedRows) => {
                  setCheckCancle(selectedRows.length !== 0);
                }}/>
              <Card>
                <CardContent className="p-6">
                    <div className="space-y-2">
                      <Label htmlFor="reason" className='text-xl font-semibold leading-none tracking-tight mb-10'>Reason for cancellation <span className='text-red-600'>*</span></Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        placeholder='Please provide a reason for canceling this session...'
                        value={formCancle.reason}
                        onChange={handleChangeCancle}
                        rows={2}
                      />
                    </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={cancleSession}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="gap-2"
                      variant={"destructive"}
                    >
                      <BrushCleaning className="w-4 h-4" />
                      Delete Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </>}
      {create && role === 'tutor' && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-gradient opacity-50"></div>
          <div className="relative z-10 bg-gradient-50 rounded-2xl max-h-[99vh] w-[80%] md:w-[600px] overflow-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <form onSubmit={handleSubmitCreate} className="space-y-4 p-6 bg-white rounded-xl">
              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Create New Session</h3>
                    <p className="text-sm text-gray-500">Schedule a new class for your students.</p>
                </div>
                {!showSuggestions && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="gap-2 text-primary border-primary/20 hover:bg-primary/5"
                        onClick={handleFetchSuggestions}
                    >
                        <Sparkles className="w-4 h-4" />
                        Suggestion
                    </Button>
                )}
              </div>
              {showSuggestions ? (
                <div className="space-y-4 min-h-[300px]">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            Recommended Slots
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setShowSuggestions(false)}>Back to Manual</Button>
                    </div>

                    {isSuggesting ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-sm text-gray-500">Gathering constraints & analyzing timetables...</p>
                        </div>
                    ) : suggestionList.length > 0 ? (
                        <div className="grid gap-3">
                            {suggestionList.map((slot) => (
                                <div key={slot.id} className="group flex items-center justify-between p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer" onClick={() => handleSelectSuggestion(slot)}>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800">{slot.date}</span>
                                            <Badge variant={slot.score >= 90 ? "default" : "secondary"} className={slot.score >= 90 ? "bg-green-600" : ""}>
                                                {slot.score}% Match
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {slot.time} ({slot.duration}h)</span>
                                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500"/> {slot.reason}</span>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">Select</Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-2 border-2 border-dashed rounded-lg">
                            <AlertCircle className="w-8 h-8 text-yellow-500" />
                            <p className="font-medium">No optimal slots found</p>
                            <p className="text-sm text-gray-500 px-4">Based on current constraints (Room/Time rules), we couldn't find a perfect match.</p>
                            <Button variant="default" onClick={() => setShowSuggestions(false)}>Switch to Manual Entry</Button>
                        </div>
                    )}
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Date <span className='text-red-500'>*</span></Label>
                            <Input id="date" name="date" type="date" value={formCreate.date} onChange={handleChangeCreate} />
                            <p className="text-[10px] text-gray-400">Must be at least 3 days from today.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Time <span className='text-red-500'>*</span></Label>
                            <Input id="time" name="time" type="time" value={formCreate.time} onChange={handleChangeCreate} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Class Id <span className='text-red-500'>*</span></Label>
                            <Input id="classId" name="classId" placeholder="e.g. CCO1" value={formCreate.classId || hasUniqueClassId(sessions)} onChange={handleChangeCreate}/>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Location <span className='text-red-500'>*</span></Label>
                            <Input id="location" name="location" placeholder="e.g. online"  value={formCreate.location} onChange={handleChangeCreate} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Title <span className='text-red-500'>*</span></Label>
                        <Input id="title" name="title" placeholder="e.g. Advanced Mathematics" value={formCreate.title} onChange={handleChangeCreate} />
                    </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={toggleCreate}>Cancel</Button>
                {!showSuggestions && (
                    <Button type="submit" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Create Proposal
                    </Button>
                )}
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;