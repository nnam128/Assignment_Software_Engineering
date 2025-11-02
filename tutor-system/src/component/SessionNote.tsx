import { BookAlert, Calendar, Clock, EllipsisVertical } from "lucide-react";
import type { Session } from "../data/hardcodedData";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileDate, FileFrame, FileGrid, FileIng, FileName, FileSize } from "./ui/file";

interface SessionProps{
  sessions: Session[],
}

export function SessionNote({sessions} : SessionProps){
  function getFileType(s: string){
    const TypeMatch = s.match(/([^/]+)\.([^.]+)$/);

    const type = TypeMatch ? TypeMatch[2] : "la"
    let src ="";
    switch(type){
      case 'doc':
        src = "/doc.png";
        break;
      case "csv":
        src = "/csv.png";
        break;
      case "pdf":
        src= "/pdf.png";
        break;
      default:
        src = "/file.png";
        break;
    }
    return{
      name: TypeMatch ? TypeMatch[0] : undefined,
      src: src,
    };
  }
  function File(sessions : Session){
    return(
      <>
      <h4 className="font-semibold text-tertiary my-3">Attacthment</h4>
      <FileGrid  className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
        
        {sessions.resources?.map((file, index)=>{
          const {name, src} = getFileType(file.name);
          return(
            <FileFrame key={index}>
              <div className="flex justify-between px-2">
                <FileIng src={src} />
                <div className="flex flex-col justify-center item-center gap-2">
                  <div className="flex justify-end items-end"><EllipsisVertical className="w-8 h-8 text-gradient-700" /></div>
                  <FileSize>{file.size}</FileSize>
                </div>
              </div>
              <FileName>{name}</FileName>
              <FileDate>{file.date}</FileDate>
            </FileFrame>
          )}
        )}
      </FileGrid>
      </>
    )
    
  }
    return(
      <>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Sessions
                </CardTitle>
                <CardDescription>Your scheduled and completed tutoring sessions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessions.filter((session) => session.status !== 'cancelled').reverse().map((session) => {
              return (
                <>
                  <div key={session.id} className="p-4 rounded-lg border border-gradient hover:border-primary/50 hover:shadow-card transition-all cursor-pointer mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-black">{session.title} - {session.type}</h4>
                      </div>
                      <div>
                      <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                        {session.status}
                      </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gradient-700">
                      <span className="flex items-center gap-1">
                        <Calendar className="min-w-3 min-h-3" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="min-w-3 min-h-3" />
                        {session.time}
                      </span>
                    </div>
                    <div className="border-t border-gradient mt-4 pt-2">
                      {session.status ==='scheduled'?
                        session.preparationNotes &&
                        <>
                          <h4 className="font-semibold text-primary mb-3">Preparation</h4>
                          <div className="flex items-center gap-4 text-sm text-black">
                            <span className="flex items-center gap-1">
                              <BookAlert className="min-w-3 min-h-3" />
                              {session.preparationNotes}
                            </span>
                          </div>
                        </>
                        :
                        session.homeworkNotes &&
                        <>
                          <h4 className="font-semibold text-secondary-700 mb-3">Homework</h4>
                          <div className="flex items-center gap-4 text-sm text-black">
                            <span className="flex items-center gap-1">
                              <BookAlert className="min-w-3 min-h-3" />
                              {session.preparationNotes}
                            </span>
                          </div>
                        </>
                      }

                      {session.resources && File(session)}
                    </div>
                  </div>
                  </>
              );
            })}
          </CardContent>
        </Card>
      </>
    )
}