import { MembersDataType, RoleType, User } from "@/types";
import { useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { memberColumns } from "./Columns";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface MemberTypesDataTable {
    membersData: MembersDataType[];
    roles: RoleType[];
    user: User;
    selectedTeamId: string;
}

export default function MembersDataTable({
    membersData,
    roles,
    user,
    selectedTeamId,
}: MemberTypesDataTable) {
    const [sorting, setSorting] = useRemember<SortingState>([])
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({})
    const [rowSelection, setRowSelection] = useRemember({})

    const table = useReactTable({
        data: membersData,
        columns: memberColumns(user, roles, selectedTeamId),
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

    return (
        <div className="space-y-3 mt-3">
            <div className="flex items-center justify-between space-x-3">
                {/* <Input
                    placeholder="Filter projects..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                /> */}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <TableRow key={index}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <TableHead key={index}>
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
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell key={index}>
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
                                    colSpan={memberColumns.length}
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
                
            </div>
        </div>
    )
}