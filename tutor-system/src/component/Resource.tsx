import { EllipsisVertical, Plus } from "lucide-react";
import type { Class, Resource, Session } from "../data/hardcodedData";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "./ui/card";
import { FileDate, FileFrame, FileGrid, FileIng, FileName, FileSize } from "./ui/file";
import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "./ui/button";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getCurrentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // Ex: 08 Nov 2025
};

interface SessionProps {
  sessions: Session[];
  classInfo: Class;
  role: "tutor" | "student";
}

export function Resource({ sessions, classInfo, role }: SessionProps) {
  const [newResources, setNewResources] = useState<Resource[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      
      setTimeout(() => {
            const newFile: Resource = {
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              size: formatFileSize(file.size),
              date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              url: URL.createObjectURL(file)
            };
            setNewResources(prev => [...prev, newFile]);
          }, 500);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  function getFileType(s: string) {
    const TypeMatch = s.match(/([^/]+)\.([^.]+)$/);
    const type = TypeMatch ? TypeMatch[2].toLowerCase() : "la";
    let src = "";
    switch (type) {
      case 'doc':
      case 'docx':
        src = "/doc.png";
        break;
      case "csv":
      case "xlsx":
        src = "/csv.png";
        break;
      case "pdf":
        src = "/pdf.png";
        break;
      default:
        src = "/file.png";
        break;
    }
    return {
      name: TypeMatch ? TypeMatch[0] : s,
      src: src,
    };
  }

  interface ResourceProps {
    resources: Resource[];
  }

  function File({ resources }: ResourceProps) {
    return (
      <>
        {resources.map((file, index) => {
          const { name, src } = getFileType(file.name);
          return (
            <FileFrame key={`${file.id}-${index}`}>
              <div className="flex justify-between px-2">
                <FileIng src={src} />
                <div className="flex flex-col justify-center item-center gap-2">
                  <div className="flex justify-end items-end">
                    <EllipsisVertical className="w-6 h-6 text-gradient-700 cursor-pointer hover:text-black" />
                  </div>
                  <FileSize>{file.size}</FileSize>
                </div>
              </div>
              <FileName>{name}</FileName>
              <FileDate>{file.date}</FileDate>
            </FileFrame>
          );
        })}
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="mb-2">Learning Resources</CardTitle>
              <CardDescription>Study materials and references</CardDescription>
            </div>

            {role === 'tutor' && (
              <>
                <input
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                
                <Button onClick={handleAddClick}>
                  <Plus className="w-4 h-4" />
                  Add Resource
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileGrid className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
            
            {sessions.map((session) =>
              session.resources ? (
                <File resources={session.resources} key={session.id} />
              ) : null
            )}

            {classInfo.resource ? (
              <File resources={classInfo.resource} key={classInfo.id} />
            ) : null}

            {newResources.length > 0 && (
              <File resources={newResources} />
            )}

          </FileGrid>
        </CardContent>
      </Card>
    </>
  );
}