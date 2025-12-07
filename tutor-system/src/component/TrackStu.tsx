import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { 
  ArrowUpDown, 
  ChevronDown, 
  FileDown, 
  MoreHorizontal, 
  StickyNote, 
  Search, 
  X, 
  Save, 
  AlertCircle 
} from "lucide-react"

import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Progress } from "./ui/progress" 
import { Badge } from "./ui/badge"
import { Textarea } from "./ui/TextArea"

import type { Student } from "../data/hardcodedData"
import { useToast } from "./UseToast"


interface StudentTracking extends Student {
  participation: number;
  avgFeedback: number;
  notes?: string;
}

export function TrackStu({ students = [] }: { students?: Student[] }) {
  const { toast } = useToast();

  const data = React.useMemo(() => {
    return students.map(s => ({
      ...s,
      participation: Math.floor(Math.random() * 40) + 60,
      avgFeedback: Number((Math.random() * 5 + 5).toFixed(1)),
      notes: ""
    })) as StudentTracking[];
  }, [students]);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const [isNoteOpen, setIsNoteOpen] = React.useState(false);
  const [currentStudent, setCurrentStudent] = React.useState<StudentTracking | null>(null);
  const [noteContent, setNoteContent] = React.useState("");

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Generating student tracking report...",
    });

    setTimeout(() => {
      toast({
        title: "Success",
        description: "Student_Tracking_Report.csv has been downloaded.",
      });
    }, 1000);
  };

  const openNoteModal = (student: StudentTracking) => {
    setCurrentStudent(student);
    setNoteContent(student.notes || "");
    setIsNoteOpen(true);
  };

  const handleSaveNote = () => {
    if (Math.random() < 0.1) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Please retry.",
      });
      return;
    }

    console.log(`Updated note for ${currentStudent?.id}: ${noteContent}`);
    
    if (currentStudent) {
        currentStudent.notes = noteContent; 
    }

    toast({
      title: "Note Saved",
      description: `Remarks for ${currentStudent?.name} updated successfully.`,
    });
    setIsNoteOpen(false);
  };

  const columns: ColumnDef<StudentTracking>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost2" onClick={column.getToggleSortingHandler()}>
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("name")}</span>
          <span className="text-xs text-muted-foreground">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase text-muted-foreground">{row.getValue("email")}</div>,
    },
    // Normal Flow 2: Display participation summary
    {
      accessorKey: "participation",
      header: ({ column }) => (
        <Button variant="ghost2" onClick={column.getToggleSortingHandler()}>
          Participation <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const val = row.getValue("participation") as number;
        const isStruggling = val < 70;
        return (
          <div className="w-[140px] flex items-center gap-2">
            <Progress value={val} className={`h-2 ${isStruggling ? "bg-red-100" : ""}`} />
            <span className={`text-xs font-bold ${isStruggling ? 'text-red-500' : 'text-green-600'}`}>
              {val}%
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "avgFeedback",
      header: "Avg Feedback",
      cell: ({ row }) => {
        const val = row.getValue("avgFeedback") as number;
        return (
          <Badge variant={val >= 8.0 ? "default" : val >= 5.0 ? "secondary" : "destructive"}>
            {val} / 10
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => openNoteModal(student)}>
                {student.notes ? "Edit Note" : "Add Note"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(student.email)}>
                Copy Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      
      {/* --- Toolbar: AF1 & AF2 --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          {/* AF1: Tutor search students by name */}
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
           {/* AF2: Export student tracking data */}
           <Button variant="outline" onClick={handleExport} className="hidden md:flex">
             <FileDown className="mr-2 h-4 w-4" />
             Export Report
           </Button>

           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter((c) => c.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* --- Main Table: Normal Flow 2 --- */}
      <div className="rounded-md border border-gradient-600 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* EF1 check: If data retrieval fails or empty */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {/* EF1: System shows “Unable to load student records...” if actual error, 
                      here we show generic empty state */}
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <AlertCircle className="w-8 h-8 opacity-50" />
                    <p>Unable to load student records or no students found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* --- Note Modal: Normal Flow 4 & 5 --- */}
      {isNoteOpen && currentStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsNoteOpen(false)}></div>
            
            {/* Dialog Content */}
            <div className="relative z-50 w-full max-w-lg bg-white p-6 shadow-lg rounded-xl animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <StickyNote className="w-5 h-5 text-yellow-500" />
                        Student Tracking Note
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsNoteOpen(false)}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* Display context for Tutor */}
                    <div className="bg-slate-50 p-3 rounded border text-sm">
                        <p><strong>Student:</strong> {currentStudent.name}</p>
                        <p><strong>Status:</strong> {currentStudent.participation < 70 ? 
                            <span className="text-red-500 font-bold">Struggling (Participation {currentStudent.participation}%)</span> : 
                            <span className="text-green-600">Active (Participation {currentStudent.participation}%)</span>
                        } </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Remarks / Observation (BR-3)
                        </label>
                        <Textarea 
                            placeholder="Enter objective notes regarding student progress..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            rows={5}
                            className="resize-none"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsNoteOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveNote}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Note
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}