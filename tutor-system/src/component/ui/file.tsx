import * as React from 'react'
import { cn } from '../../lib/utils'

const FileFrame = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn('min-h-42 w-full flex flex-col border rounded-2xl border-gradient p-2 hover:border-primary hover:shadow-xl', className)} {...props} />
)
FileFrame.displayName = "FileFrame";

const FileIng = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(({className, ...props}, ref)=>
  <div className='bg-gradient-50 h-18 w-18 p-3 rounded-full flex items-center justify-center'>
  <img ref={ref} className={cn('max-h-8', className)} {...props} />
  </div>
);
FileIng.displayName = "FileImg";

const FileName = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn('whitespace-normal break-all font-semibold text-[16px] mt-3 text-left mx-3', className)} {...props} />
)
FileName.displayName = "FileName";

const FileDate = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn('whitespace-normal break-all text-gradient-700 font-semibold text-[12px] max-w-20 mt-1 text-left mx-3', className)} {...props} />
)
FileDate.displayName = "FileDate";

const FileSize = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn('whitespace-normal break-all text-gradient-700 font-semibold text-[12px] max-w-20 mt-1 text-left', className)} {...props} />
)
FileSize.displayName = "FileSize";

const FileGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref)=>
  <div ref={ref} className={cn('flex gap-1 justify-start m-2 items-stretch', className)} {...props} />
)
FileGrid.displayName = "FileGrid";

export {FileFrame, FileIng, FileName, FileGrid, FileDate, FileSize}