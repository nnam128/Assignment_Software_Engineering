import { AlertCircle, Ban, BookAlert, BookOpen, Calendar, Check, Clock, EllipsisVertical, FileIcon, FileText, LinkIcon, Save, Trash2, UploadCloud, UserCheck, X } from "lucide-react";
import type { Session, Student } from "../data/hardcodedData";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileDate, FileFrame, FileGrid, FileIng, FileName, FileSize } from "./ui/file";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/TextArea";
import { useState } from "react";
import { useToast } from "./UseToast";

interface SessionProps{
  sessions: Session[],
  role: 'tutor' | 'student',
}

export function SessionNote({sessions, role} : SessionProps){
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
                  <div className="flex justify-end items-end"><EllipsisVertical className="w-6 h-6 text-gradient-700" /></div>
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

  const { toast } = useToast();
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const [postData, setPostData] = useState({
    preparation: '',
    summary: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const openSessionPostEditor = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setPostData({
      preparation: 'Read Chapter 4 before class.',
      summary: '',
    });
    setSelectedFiles([]);
    setIsEditingPost(true);
  };

  const closeSessionPostEditor = () => {
    setIsEditingPost(false);
    setCurrentSessionId(null);
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postData.preparation.length > 2000 || postData.summary.length > 2000) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Text content exceeds the maximum allowed length.",
      });
      return;
    }

    const largeFile = selectedFiles.find(file => file.size > 5 * 1024 * 1024);
    if (largeFile) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: `File "${largeFile.name}" exceeds 5MB limit. Please choose a smaller file.`, // AF2.5b1
      });
      return;
    }

    if (Math.random() < 0.1) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Internal server error while uploading files. Please try again.",
      });
      return;
    }

    console.log("Submitting:", { ...postData, files: selectedFiles });
    
    toast({
      title: "Post Updated",
      description: `Session details saved with ${selectedFiles.length} file(s). Students notified.`,
    });

    setTimeout(() => {
      closeSessionPostEditor();
    }, 500);
  };


  const MOCK_STUDENTS: Student[] = [
  { id: "S001", name: "Nguyen Van A", email: "anguyen@example.com" },
  { id: "S002", name: "Tran Thi B", email: "btran@example.com" },
  { id: "S003", name: "Le Van C", email: "cle@example.com" },
  { id: "S004", name: "Pham Thi D", email: "dpham@example.com" },
  { id: "S005", name: "Hoang Van E", email: "ehoang@example.com" },
];

  type AttendanceStatus = 'present' | 'absent' | 'late';

  const [isCheckingAttendance, setIsCheckingAttendance] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>({});

  const openAttendanceModal = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    const initialAttendance: Record<string, AttendanceStatus> = {};
    MOCK_STUDENTS.forEach(s => initialAttendance[s.id] = 'present');
    setAttendanceData(initialAttendance);
    setIsCheckingAttendance(true);
  };

  const closeAttendanceModal = () => {
    setIsCheckingAttendance(false);
    setCurrentSessionId(null);
  };

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleAttendanceSubmit = () => {
    if (Math.random() < 0.1) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "System cannot save the attendance due to server issue. Please retry.",
      });
      return;
    }

    console.log(`Submitting Attendance for Session ${currentSessionId}`, attendanceData);
    
    toast({
      title: "Attendance Recorded",
      description: "Student participation data has been updated.",
    });

    closeAttendanceModal();
  };


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
                    <div className="md:flex md:justify-between grid grid-cols-1 justify-center items-center gap-4 text-sm text-gradient-700">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="min-w-3 min-h-3" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="min-w-3 min-h-3" />
                          {session.time}
                        </span>
                      </div>
                      { role === 'tutor' &&
                      <div className="flex gap-4">
                        <Button
                        onClick={(e) => {
                            e.preventDefault();
                            openAttendanceModal(session.id);
                        }}
                        size={'sm'}
                        variant={'outline'}
                        >
                          Attendance
                        </Button>
                        <Button
                        onClick={(e) => {
                            e.preventDefault();
                            openSessionPostEditor(session.id);
                        }}
                        size={'sm'}
                        variant={'outline'}
                        >
                          Add Detail
                        </Button>
                      </div>}
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
              );
            })}
          </CardContent>
        </Card>
        {isEditingPost && role === 'tutor' && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-gradient opacity-50"></div>
            <div className="relative z-10 bg-gradient-50 rounded-2xl max-h-[99vh] w-[80%] md:w-[700px] overflow-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              
              <form onSubmit={handlePostSubmit} className="space-y-6 p-6 bg-white rounded-xl">
                
                <div className="flex justify-between items-start border-b border-gradient pb-4">
                  <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Session Post Details
                      </h3>
                      <p className="text-sm text-gray-500">
                        Update content for Session ID: <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">{currentSessionId}</span>
                      </p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={closeSessionPostEditor}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  
                  {/* Field 1: Preparation */}
                  <div className="space-y-2">
                    <Label htmlFor="preparation" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-orange-500" />
                      Preparation Tasks (Pre-session)
                    </Label>
                    <Textarea 
                      id="preparation" 
                      name="preparation" 
                      placeholder="e.g. Read Chapter 4, install VS Code..." 
                      rows={3}
                      value={postData.preparation}
                      onChange={handlePostChange}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      Lesson Summary (Post-session)
                    </Label>
                    <Textarea 
                      id="summary" 
                      name="summary" 
                      placeholder="e.g. Recap of the lesson..." 
                      rows={4}
                      value={postData.summary}
                      onChange={handlePostChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <FileIcon className="w-4 h-4 text-blue-500" />
                      Materials (PDF, DOC, PPT)
                    </Label>
                    
                    <div 
                      className="border-2 border-dashed border-gradient rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-primary mb-2 transition-colors" />
                        <p className="text-sm font-medium text-gray-600 group-hover:text-primary">Click to upload files</p>
                        <p className="text-xs text-gray-400 mt-1">Supported: .pdf, .doc, .docx, .ppt</p>
                        
                        <input 
                          id="file-upload" 
                          type="file" 
                          multiple 
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="grid gap-2 mt-2">
                          {selectedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gradient rounded-md text-sm group/item hover:bg-white hover:shadow-sm transition-all">
                                  <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase flex-shrink-0">
                                        {file.name.split('.').pop()}
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                          <span className="font-medium truncate text-gray-700">{file.name}</span>
                                          <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                      </div>
                                  </div>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50" 
                                    onClick={() => removeFile(idx)}
                                  >
                                      <Trash2 className="w-4 h-4" />
                                  </Button>
                              </div>
                          ))}
                      </div>
                    )}
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gradient">
                  <Button type="button" variant="outline" onClick={closeSessionPostEditor}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                      <UploadCloud className="w-4 h-4" />
                      Save & Upload
                  </Button>
                </div>

              </form>
            </div>
          </div>
        )}

        {isCheckingAttendance && role === 'tutor' && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all" onClick={closeAttendanceModal}></div>
          <div className="relative z-10 bg-white rounded-xl w-[90%] md:w-[800px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-gradient">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-secondary" />
                  Check Attendance
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Mark student status for Session ID: <span className="font-mono bg-gray-100 px-1 rounded">{currentSessionId}</span>
                </p>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={closeAttendanceModal}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 overflow-auto">
              <div className="border border-gradient rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gradient">
                    <tr>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3 text-center w-[120px] text-green-600">Present</th>
                      <th className="px-6 py-3 text-center w-[120px] text-red-500">Absent</th>
                      <th className="px-6 py-3 text-center w-[120px] text-orange-500">Late</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {MOCK_STUDENTS.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors bg-white">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div>{student.name}</div>
                          <div className="text-xs text-gray-400 font-normal">{student.email}</div>
                        </td>
                        
                        <td className="px-6 py-4 text-center">
                          <label className="flex justify-center items-center cursor-pointer p-2 rounded hover:bg-green-50">
                            <input 
                              type="radio"
                              name={`attendance-${student.id}`}
                              className="w-5 h-5 accent-green-600 cursor-pointer"
                              checked={attendanceData[student.id] === 'present'}
                              onChange={() => handleAttendanceChange(student.id, 'present')}
                            />
                          </label>
                        </td>
                        
                        <td className="px-6 py-4 text-center">
                          <label className="flex justify-center items-center cursor-pointer p-2 rounded hover:bg-red-50">
                            <input 
                              type="radio" 
                              name={`attendance-${student.id}`}
                              className="w-5 h-5 accent-red-500 cursor-pointer"
                              checked={attendanceData[student.id] === 'absent'}
                              onChange={() => handleAttendanceChange(student.id, 'absent')}
                            />
                          </label>
                        </td>
                        
                        <td className="px-6 py-4 text-center">
                          <label className="flex justify-center items-center cursor-pointer p-2 rounded hover:bg-orange-50">
                            <input 
                              type="radio" 
                              name={`attendance-${student.id}`}
                              className="w-5 h-5 accent-orange-500 cursor-pointer"
                              checked={attendanceData[student.id] === 'late'}
                              onChange={() => handleAttendanceChange(student.id, 'late')}
                            />
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex gap-4 text-sm text-gray-500 justify-end">
                  <div className="flex items-center gap-1"><Check className="w-4 h-4 text-green-600"/> Present: {Object.values(attendanceData).filter(x => x === 'present').length}</div>
                  <div className="flex items-center gap-1"><Ban className="w-4 h-4 text-red-500"/> Absent: {Object.values(attendanceData).filter(x => x === 'absent').length}</div>
                  <div className="flex items-center gap-1"><AlertCircle className="w-4 h-4 text-orange-500"/> Late: {Object.values(attendanceData).filter(x => x === 'late').length}</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gradient bg-gray-50 rounded-b-xl">
              <Button type="button" variant="outline" onClick={closeAttendanceModal}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAttendanceSubmit} className="bg-secondary hover:bg-secondary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Records
              </Button>
            </div>
          </div>
        </div>
      )}
      </>
    )
}