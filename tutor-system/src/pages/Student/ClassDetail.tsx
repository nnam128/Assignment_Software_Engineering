import { useParams } from "react-router-dom";
import { mockPosts, mockSessions } from "../../data/hardcodedData";
import { Community } from "../../component/Community";
import WeeklyCalendar from "../../component/WeeklyCalendar";
import { SessionNote } from "../../component/SessionNote";

export function StudentClassDetail(){
  const { id } = useParams();
  const classPosts = mockPosts.filter((p) => p.classId === id);
  const sessions = mockSessions.filter((s)=> s.classId === id)
  
    return(
      <>
      <p>kaka</p>
        <h1>{id}</h1>
        <div className="p-10">
          <Community classPosts = {classPosts} id = {id} />
        </div>
        <div className="p-10">
          <WeeklyCalendar sessions={sessions}/>
          <SessionNote sessions={sessions} />
        </div>
      </>
    )
}