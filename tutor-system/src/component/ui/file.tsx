import * as React from 'react'
import { cn } from '../../lib/utils'

const FileFrame = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn(className, 'min-h-30 w-25 flex flex-col items-center justify-center border rounded-2xl border-gradient p-2 hover:border-primary hover:shadow-xl')} {...props} />
)
FileFrame.displayName = "FileFrame";

const FileIng = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(({className, ...props}, ref)=>
  <img ref={ref} className={cn(className, 'max-h-15')} {...props} />
);
FileIng.displayName = "FileImg";

const FileName = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn(className, 'whitespace-normal break-all text-[10px] max-w-20 mt-3 text-center')} {...props} />
)
FileName.displayName = "FileName";

const FileGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn(className, 'flex gap-1 items-center justify-start m-2')} {...props} />
)
FileGrid.displayName = "FileGrid";

export {FileFrame, FileIng, FileName, FileGrid}