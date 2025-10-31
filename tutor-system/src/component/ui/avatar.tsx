import * as React from "react";

import { cn } from "../../lib/utils";


const AvatarFrame = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) =>(
    <div ref={ref} className={cn(className, "w-10 h-10 overflow-hidden rounded-full border border-gradient-50 flex justify-center items-center shadow-2xl ")} {...props} />
));
AvatarFrame.displayName = "AvatarFrame";

const Avatar = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(({ className, ...props }, ref) =>(
    <img ref={ref} className={cn(className, " ")} {...props} />
));
Avatar.displayName = "Avatar"

const AvatarName = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) =>(
    <div ref={ref} className={cn(className, "w-10 h-10 overflow-hidden rounded-full border border-gradient-50 flex justify-center items-center shadow-2xl bg-primary text-white")} {...props} />
))
AvatarName.displayName = "AvatarName"

export {Avatar, AvatarFrame, AvatarName}