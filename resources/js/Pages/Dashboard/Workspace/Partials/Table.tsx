import { EvironmentVariableFiltersType, EvironmentVariableType, GroupType, VariablesPaginatedDataType } from "@/types";
import { Link, router, usePage, useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { groupColumns } from "./Columns";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/Components/ui/table";
import GroupsFilter from "./GroupsFilter";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function GroupsDataTable({
    groups,
    variables,
    metadata,
    filters,
}: {
    groups: GroupType[];
    variables: EvironmentVariableType[];
    metadata: VariablesPaginatedDataType;
    filters: EvironmentVariableFiltersType;
}) {
    const [sorting, setSorting] = useRemember<SortingState>([]);
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({});
    const [rowSelection, setRowSelection] = useRemember({});

    const selectedGroupIds = filters.g || [];

    const [queryString, setQueryString] = useState("");

    const perPage = String(metadata.per_page);
    const perPageOptions = metadata.per_page_options;

    const currentPage = metadata.current_page;
    const currentPageData = metadata.links[currentPage - 1]
    const totalPages = Math.ceil(metadata.total / metadata.per_page)

    const total = metadata.total;
    const shown = (currentPage - 1) * metadata.per_page + metadata.data.length;

    const isFirstPage = currentPage === 1;
    const firstPageUrl = isFirstPage ? null : metadata.first_page_url;
    const prevPageUrl = isFirstPage ? null : metadata.prev_page_url;

    const isLastPage = metadata.last_page === currentPage;
    const lastPageUrl = isLastPage ? null : metadata.last_page_url;
    const nextPageUrl = isLastPage ? null : metadata.next_page_url;

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
            pagination: {
                pageIndex: 0,
                pageSize: Number(perPage)
            }
        },
    })

    const handleSelectGroup = (group: GroupType) => {
        router.get(group.link);
    }

    return (
        <div className="space-y-3 mt-3">
            <div className="flex flex-col md:flex-row items-center gap-3">
                <Input
                    placeholder="Filter variables..."
                    value={queryString}
                    onChange={(event) => setQueryString(event.target.value)}
                    className="w-full md:max-w-sm"
                />
                <GroupsFilter
                    items={groups}
                    onValueChanged={handleSelectGroup}
                    selected={groups.filter(group => group.id === filters.g)[0]}
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                disabled={isFirstPage}
                                href={prevPageUrl}
                                size="sm-icon"
                                preserveScroll={true}
                            />
                        </PaginationItem>

                        <PaginationItem>
                            <span className="text-sm text-muted-foreground mx-2">
                                {`${currentPageData?.label}/${totalPages}`}
                            </span>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                disabled={isLastPage}
                                href={nextPageUrl}
                                size="sm-icon"
                                preserveScroll={true}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {shown} of{" "}
                        {total} row(s).
                    </div>
                    <Tabs defaultValue={perPage}>
                        <TabsList>
                            {perPageOptions.map((option, index: number) => (
                                <Link href={option.link} preserveScroll={true}>
                                    <TabsTrigger key={index} value={String(option.label)}>
                                        {option.label}
                                    </TabsTrigger>
                                </Link>
                            ))}
                        </TabsList>
                    </Tabs>
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
