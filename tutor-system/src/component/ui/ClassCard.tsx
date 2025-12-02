import { type Class } from '../../data/hardcodedData';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useToast } from '../UseToast';


interface ClassCardProps {
  classData: Class;
  showEnrollButton?: boolean;
  enrolled?: boolean;
  link?: string;
  tutor?: boolean;
}


const ClassCard = ({ classData, showEnrollButton = false, enrolled = false, link = "", tutor = false }: ClassCardProps) => {
  const { toast } = useToast();
  
  function handleEnroll(title: string, descrip: string): void{
    toast({
      title: title,
      description: descrip,
    });
  }
  
  const isFull = classData.maxStudents === classData.enrolledStudents;
  const isActive = classData.status === 'active'
  const spotsLeft = classData.maxStudents - classData.enrolledStudents;

  return (
    <Card className="group shadow-2xs hover:shadow-2xl transition-all duration-300 bg-white">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
              {classData.subject}
            </CardTitle>
            <CardDescription className="font-mono text-sm">{classData.code}</CardDescription>
          </div>
          <Badge
            variant={isFull ? 'destructive' : classData.status === 'active' ? 'default' : 'secondary'}
            className="shrink-0"
          >
            {isFull ? 'Full' : classData.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-2 text-gradient-700">{classData.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>
              {classData.tutorName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-gradient-700">{classData.schedule}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-gradient-700">{classData.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gradient-700" />
            <span className="text-gradient-700">
              {classData.startDate} - {classData.endDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="text-sm">
            <span className="font-semibold text-black">{classData.enrolledStudents}</span>
            <span className="text-gradient-700">/{classData.maxStudents} students</span>
          </div>
          {!isFull && spotsLeft <= 5 && (
            <span className="text-xs text-accent-600 font-medium">
              {spotsLeft} spots left
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {classData.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Link to={tutor? (link === "" ?`/tutor/classes` : `/tutor/classes/${link}`): (link === "" ?`/student/classes` : `/student/classes/${link}`)} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {showEnrollButton && !enrolled && !tutor && (
          <Button
            className={cn('flex-1', isFull && 'opacity-50 cursor-not-allowed')}
            onClick={() => {
              if (isFull) {
                handleEnroll(
                  "Class is full",
                  "Please try again. You can register for another class or request a new one if you can't find a suitable class."
                );
              } else {
                handleEnroll(
                  "You have successfully submitted your join request.",
                  "Click again if you wish to cancel."
                );
              }
            }}
            >
            {isFull ? 'Class Full' : 'Enroll'}
          </Button>
        )}
        {showEnrollButton && enrolled && !tutor && (
          <Button className="flex-1" variant="active" onClick={() => {handleEnroll("You have left this class.", "Click again if you wish to rejoin.")}}>
            Enrolled
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
