import { EllipsisVertical } from "lucide-react";
import type { Class, Resource, Session } from "../data/hardcodedData";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "./ui/card";
import { FileDate, FileFrame, FileGrid, FileIng, FileName, FileSize } from "./ui/file";

interface SessionProps{
  sessions: Session[],
  classInfo : Class[];
}

export function Resource({sessions, classInfo } : SessionProps){
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
  function File(resources : Resource[]){
    return(
      <>
        {resources.map((file, index)=>{
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
      </>
    )
    
  }
    return(
      <>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="mb-2">
                  Learning Resources
                </CardTitle>
                <CardDescription>Study materials and references</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileGrid  className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
            {sessions.map((session) => {
              return (
                <>
                  {session.resources && File(session.resources)}
                </>
              );
            })}
            {classInfo.map((cls) => {
              return(
                <>
                {cls.resource && File(cls.resource)}
                </>
            )})}
            </FileGrid>
          </CardContent>
        </Card>
      </>
    )
}