import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, MapPin } from 'lucide-react';
import type { Session } from '../data/hardcodedData';
import { Link } from 'react-router-dom';

// chỉ bik làm cho 1 tuần :))))) chưa vip như gg calendar

interface WeeklyCalendarProps {
  sessions: Session[];
}

function WeeklyCalendar({ sessions }: WeeklyCalendarProps){
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7-22
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getSessionPosition = (session: Session) => {
    const dayMatch = session.date.match(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/);
    const timeMatch = session.time.match(/(\d+):(\d+)/);
    
    if (!dayMatch || !timeMatch) return null;
    
    const dayIndex = weekDays.indexOf(dayMatch[0]);
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
      case 'completed':
        return 'bg-secondary-700/20 border-secondary-700 text-secondary-700';
      case 'scheduled':
        return 'bg-primary/20 border-primary text-primary';
      case 'cancelled':
        return 'bg-destructive/20 border-destructive text-destructive';
      default:
        return 'bg-gradient border-gradient-700 text-black';
    }
  };

  return (
    <Card className="border-grid bg-white overflow-scroll">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day */}
          <div className="grid grid-cols-8 border-b border-gradient">
            <div className="p-3 text-sm font-medium text-gradient-700 border-r border-gradient bg-gradient-50">
              Time
            </div>
            {weekDays.map((day) => (
              <div key={day} className="p-3 text-sm font-semibold text-center border-r border-gradient last:border-r-0 bg-gradient-50">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* grid */}
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b bg-white border-grid hover:bg-gradient-50 transition-colors h-[50px] overflow-visible">
                <div className="px-3 text-xs text-gradient-700 border-r border-grid flex  items-center">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {weekDays.map((_, dayIndex) => (
                  <div key={dayIndex} className="border-r border-grid last:border-r-0 relative overflow-visible">
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
                          <Link to={`/student/classes/${session.classId}`}>
                            <div
                              key={session.id}
                              className={`absolute left-1 right-1 border-l-4 rounded-r-lg p-2 ${getStatusColor(session.status)} overflow-visible shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                              style={{
                                top: `${topOffset}px`,
                                height: `${height}px`,
                              }}
                            >
                              <div className="text-xs font-semibold mb-1 line-clamp-1">
                                {session.title} - {session.classId}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] opacity-80 mb-1">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{session.time}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] opacity-80">
                                <MapPin className="w-2.5 h-2.5" />
                                <span className="line-clamp-1">{session.location}</span>
                              </div>
                              {pos.duration > 1.5 && (
                                <div className="mt-1">
                                  <Badge variant="outline" className="text-[9px] h-4 px-1 ">
                                    {session.status}
                                  </Badge>
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
  );
};

export default WeeklyCalendar;
