import { EvironmentVariableType, GroupType } from "@/types";
import { router, usePage, useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { groupColumns } from "./Columns";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { ArchiveIcon, Trash2Icon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import GroupItem from "@/Components/GroupItem";
import GroupsFilter from "./GroupsFilter";
import { useState } from "react";

export default function GroupsDataTable({
    groups,
    variables,
}: {
    groups: GroupType[];
    variables: EvironmentVariableType[];
}) {
    const [sorting, setSorting] = useRemember<SortingState>([])
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({})
    const [rowSelection, setRowSelection] = useRemember({})

    const { selectedGroupIds } = usePage().props;

    const [selectedGroups, setSelectedGroups] = useRemember<GroupType[]>(groups.filter(group => selectedGroupIds.includes(group.id)), 'selectedFilterGroups')

    const table = useReactTable({
        data: variables,
        columns: groupColumns(groups),
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

    // TODO: добавить виртуализацию для горизонтального скрола
    // const rowVirtualizer = useVirtualizer({
    //     count: rows.length,
    //     estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    //     getScrollElement: () => tableContainerRef.current,
    //     //measure dynamic row height, except in firefox because it measures table border height incorrectly
    //     measureElement:
    //       typeof window !== 'undefined' &&
    //       navigator.userAgent.indexOf('Firefox') === -1
    //         ? element => element?.getBoundingClientRect().height
    //         : undefined,
    //     overscan: 5,
    //   })

    const handleBulkDelete = () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => row.original.id);
        if (confirm(`Delete ${selectedIds.length} projects?`)) {
            router.delete(route('project.destroy-many'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    setRowSelection({});
                    router.reload();
                },
            });
        }
    };

    const handleBulkArchive = () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => row.original.id);
        if (confirm(`Archive ${selectedIds.length} projects?`)) {
            router.post(
                route('project.archive-many'),
                { ids: selectedIds },
                {
                    onSuccess: () => {
                        setRowSelection({});
                        router.reload();
                    },
                }
            );
        }
    };

    return (
        <div className="space-y-3 mt-3">
            <div className="flex items-center justify-between space-x-3">
                {/* <Input
                    placeholder="Filter variables..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                /> */}
                <GroupsFilter
                    items={groups}
                    selectedItems={selectedGroups}
                    onStateChanged={setSelectedGroups}
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    {/* <TableHeader>
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
                    </TableHeader> */}
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
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div> */}
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

function useVirtualizer(arg0: {
    count: any; estimateSize: () => number; //estimate row height for accurate scrollbar dragging
    getScrollElement: () => any;
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement: ((element: any) => any) | undefined; overscan: number;
}) {
    throw new Error("Function not implemented.");
}
