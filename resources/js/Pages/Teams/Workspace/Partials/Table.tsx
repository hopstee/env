import { IProjectData } from "@/types";
import { router, useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { projectColumns } from "./Columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/Components/ui/button";
import { ArchiveIcon, Trash2Icon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface IProjectsDataTable {
    projectsData: IProjectData[];
}

export function ProjectsDataTable({
    projectsData,
}: IProjectsDataTable) {
    const [sorting, setSorting] = useRemember<SortingState>([])
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({})
    const [rowSelection, setRowSelection] = useRemember({})

    const table = useReactTable({
        data: projectsData,
        columns: projectColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    console.log("name filtered", table.getColumn("name") || 'empty')
    const handleBulkDelete = () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
        if (confirm(`Delete ${selectedIds.length} projects?`)) {
            router.delete(route('project.destroy-many'), {
                data: { ids: selectedIds },
                onSuccess: () => router.reload(),
            })
        }
    }


    return (
        <div className="w-full space-y-3">
            <div className="flex items-center justify-between space-x-3">
                {/* <Input
                    placeholder="Filter projects..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                /> */}
                <div className="space-x-2">
                    <Button
                        disabled={!table.getFilteredSelectedRowModel().rows.length}
                        variant="ghost"
                        size="icon"
                    >
                        <ArchiveIcon />
                    </Button>
                    <Button
                        disabled={!table.getFilteredSelectedRowModel().rows.length}
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-600 hover:bg-red-50"
                        onClick={handleBulkDelete} // Добавлен обработчик
                    >
                        <Trash2Icon />
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
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
                                        <TableCell key={cell.id}>
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
                                    colSpan={projectColumns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}