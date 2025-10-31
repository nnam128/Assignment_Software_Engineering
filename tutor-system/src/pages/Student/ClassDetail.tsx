import { useParams } from "react-router-dom";
import { mockPosts } from "../../data/hardcodedData";
import { Community } from "../../component/Community";

export function StudentClassDetail(){
  const { id } = useParams();
  const classPosts = mockPosts.filter((p) => p.classId === id);
  
    return(
      <>
      <p>kaka</p>
        <h1>{id}</h1>
        <div className="p-20">
        <Community classPosts = {classPosts} id = {id} />
        </div>
      </>
    )
}