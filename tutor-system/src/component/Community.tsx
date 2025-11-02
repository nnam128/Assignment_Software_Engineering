import { MessageSquare, Pin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/TextArea";
import { Badge } from "./ui/badge";
import type { Post } from "../data/hardcodedData";
import { useState } from "react";
import { Avatar, AvatarFrame, AvatarName } from "./ui/avatar";
import { useToast } from "./UseToast";
import { Label } from "./ui/label";

interface CommunityProps {
  classPosts: Post[];
  id ?: string
}
export function Community( {classPosts, id} : CommunityProps){
  const [formData, setFormData] = useState('');
  

  const {toast} = useToast()
  function handlePost(e: React.FormEvent, id?: string){
    e.preventDefault();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    toast({
      title: "You have successfully posted",
      description: `In class ${id} at ${timeString}`,
    })
    setFormData('');
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  setFormData(e.target.value);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Class Community</CardTitle>
          <CardDescription>Discuss and share with your classmates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* create new post */}
          <form onSubmit={(e) =>{handlePost(e, id)}} className="space-y-3">
            <Label htmlFor="post">Create Post *</Label>
            <Textarea
              id="post"
              placeholder="Share something with the class..."
              value={formData}
              onChange={handleChange}
              className="min-h-[100px] mt-2"
              required
            />
            <div className="flex justify-end">
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                Post
              </Button>
            </div>
          </form>

          {/* Posts */}
          <div className="space-y-4 pt-4 border-t border-gradient">
            {classPosts.map((post) => (
              <div key={post.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  {post.isPinned && <Pin className="w-4 h-4 text-accent shrink-0 mt-1" />}
                  <AvatarFrame className="shrink-0">
                    {
                    post.avatar ? <Avatar src={`${post.avatar}`}/> :
                    <AvatarName>
                      {post.authorName.charAt(0)}
                    </AvatarName>
                    }
                  </AvatarFrame>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-black">{post.authorName}</span>
                        <Badge variant="outline" className="text-xs border-gradient">
                          {post.authorRole}
                        </Badge>
                        <span className="text-xs text-gradient-700">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-black mt-2 text-sm md:text-base">{post.content}</p>
                    </div>

                    {/* Comments */}
                    {post.comments.length > 0 && (
                      <div className="pl-4 border-l-2 border-gradient space-y-3 mt-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2">
                            <AvatarFrame className="shrink-0">
                              {
                              comment.avatar ? <Avatar src={`${comment.avatar}`}/> :
                              <AvatarName>
                                {comment.authorName.charAt(0)}
                              </AvatarName>
                              }
                            </AvatarFrame>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-sm text-black">
                                  {comment.authorName}
                                </span>
                                <span className="text-xs text-gradient-700">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-xs md:text-sm text-black mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button variant="ghost" size="sm" className="gap-2 text-gradient-700">
                      <MessageSquare className="w-3 h-3" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
            
}