import { useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { groupColumns } from "./Columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { GroupType, MembersDataType, User } from "@/types";

export default function GroupsDataTable({
    groups,
    teamUsers,
    teamId,
    user,
}: {
    groups: GroupType[];
    teamUsers: MembersDataType[];
    teamId: string;
    user: User;
}) {
    const [sorting, setSorting] = useRemember<SortingState>([]);
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({});
    const [rowSelection, setRowSelection] = useRemember({});

    const table = useReactTable({
        data: groups,
        columns: groupColumns(user, teamId, teamUsers),
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
                                    colSpan={groupColumns.length}
                                    className="h-16 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
