import { EvironmentVariableFiltersType, EvironmentVariableType, GroupType, User, VariablesPaginatedDataType, ApiKeysPaginatedDataType, MembersDataType } from "@/types";
import { Link, useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { apiKeysColumns } from "./Columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function ApiKeysDataTable({
    apiKeys,
    user,
    users,
}: {
    apiKeys: ApiKeysPaginatedDataType;
    user: User;
    users: MembersDataType[];
}) {
    const [sorting, setSorting] = useRemember<SortingState>([]);
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({});
    const [rowSelection, setRowSelection] = useRemember({});

    const table = useReactTable({
        data: apiKeys.data,
        columns: apiKeysColumns(user, users),
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
                                    colSpan={apiKeysColumns.length}
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

function useVirtualizer(arg0: {
    count: any; estimateSize: () => number; //estimate row height for accurate scrollbar dragging
    getScrollElement: () => any;
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement: ((element: any) => any) | undefined; overscan: number;
}) {
    throw new Error("Function not implemented.");
}
