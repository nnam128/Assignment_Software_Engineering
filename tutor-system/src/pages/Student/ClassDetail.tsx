import { useParams } from "react-router-dom";
import WeeklyCalendar from "../../component/WeeklyCalendar";
import { mockSessions } from "../../data/hardcodedData";

export function StudentClassDetail(){
  const { id } = useParams();
  const session = mockSessions;
    return(
      <>
        <h1>{id}</h1>
        <WeeklyCalendar sessions={session}/>
      </>
    )
}