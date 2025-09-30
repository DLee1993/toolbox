/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import NewNote from "@/components/notepad/NewNote";
import UpdateNote from "@/components/notepad/UpdateNote";
import FilterCategory from "@/components/notepad/FilterCategory";
import { deleteNote } from "@/lib/notepad/crud";
import { CheckCheck, ChevronsLeft, ChevronsRight, CircleX, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        className?: string;
    }
}

export function NotepadTable({
    data,
    setCurrentNotes,
}: {
    data: NotepadNoteValues[];
    setCurrentNotes: Dispatch<SetStateAction<NotepadNoteValues[] | null>>;
}) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const columns: ColumnDef<NotepadNoteValues>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <div className="font-semibold">{row.getValue("title")}</div>,
        },
        {
            accessorKey: "content",
            header: "Content",
            cell: ({ row }) => (
                <div>
                    {(row.getValue("content") as string)?.length > 30
                        ? `${(row.getValue("content") as string).slice(0, 30)}...`
                        : row.getValue("content")}
                </div>
            ),
            meta: {
                className: "hidden md:table-cell",
            },
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <div>
                    {row.getValue("category") === "" ? (
                        <p>-</p>
                    ) : (
                        <Badge className="rounded-full">{row.getValue("category")}</Badge>
                    )}
                </div>
            ),
            meta: {
                className: "hidden md:table-cell",
            },
        },
        {
            accessorKey: "completed",
            header: "Completed",
            cell: ({ row }) => (
                <div>
                    {row.getValue("completed") === true ? (
                        <CheckCheck size={15} className="text-green-700" />
                    ) : (
                        <CircleX size={15} className="text-red-700" />
                    )}
                </div>
            ),
            meta: {
                className: "hidden sm:table-cell",
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const note = row.original;

                return (
                    <div className="space-x-4 flex justify-end">
                        <UpdateNote setCurrentNotes={setCurrentNotes} id={note.id} />
                        <Button
                            variant="destructive"
                            size="icon"
                            aria-label="delete note"
                            className="hidden sm:flex hover:bg-foreground hover:text-background"
                            onClick={() => deleteData(note.id)}
                        >
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];
    const table = useReactTable({
        data: data.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            pagination,
        },
    });

    const pageCount = table.getPageCount(); // Total number of pages
    const currentPage = table.getState().pagination.pageIndex;

    const pageButtons = Array.from({ length: pageCount }, (_, i) => (
        <Button
            key={i}
            onClick={() => table.setPageIndex(i)}
            variant={currentPage === i ? "default" : "outline"}
        >
            {i + 1}
        </Button>
    ));

    function deleteData(id: string) {
        const updatedNotes = deleteNote(id);
        setCurrentNotes(updatedNotes);
    }

    return (
        <section>
            <div className="w-full h-[80vh] sm:h-[85vh] overflow-y-scroll">
                <div className="sticky top-0 py-4 gap-2 bg-background z-10 flex justify-between">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Filter by title..."
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            name="title filter"
                            className="w-36"
                        />
                        <FilterCategory table={table} />
                        <NewNote setCurrentNotes={setCurrentNotes} />
                    </div>
                    <section className="hidden sm:flex flex-wrap justify-between items-center gap-2">
                        <div className="flex justify-center items-center space-x-2">
                            <p className="text-sm text-muted-foreground flex gap-2">
                                {table.getState().pagination.pageIndex + 1}
                                <span>of</span>
                                {table.getPageCount()}
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                aria-label="previous page"
                            >
                                <ChevronsLeft />
                            </Button>
                            {pageButtons}
                            <Button
                                variant="outline"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                aria-label="next page"
                            >
                                <ChevronsRight />
                            </Button>
                        </div>
                    </section>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={cn(
                                                    header.column.columnDef.meta?.className,
                                                    "border-y-0"
                                                )}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    cell.column.columnDef.meta?.className,
                                                    ""
                                                )}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No notes found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {/* PAGINATION SECTION  */}
            <section className="flex flex-wrap justify-between items-center gap-2 py-1 sm:hidden border-t border-border">
                <div className="flex justify-center items-center space-x-2">
                    <p className="text-sm text-muted-foreground flex gap-2">
                        {table.getState().pagination.pageIndex + 1}
                        <span>of</span>
                        {table.getPageCount()}
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="previous page"
                    >
                        <ChevronsLeft />
                    </Button>
                    {pageButtons}
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        aria-label="next page"
                    >
                        <ChevronsRight />
                    </Button>
                </div>
            </section>
        </section>
    );
}
