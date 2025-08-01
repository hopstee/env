import { User, ApiKeysPaginatedDataType, ApiKeyFiltersType, ApiKeysType, ApiKeyUserType } from "@/types";
import { Link, useRemember } from "@inertiajs/react"
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { apiKeysColumns } from "./Columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import UsersFilter from "./UsersFilter";

export default function ApiKeysDataTable({
    apiKeys,
    user,
    metadata,
    filters,
    users,
}: {
    apiKeys: ApiKeysType[];
    user: User;
    metadata: ApiKeysPaginatedDataType;
    filters: ApiKeyFiltersType;
    users: ApiKeyUserType[];
}) {
    const [sorting, setSorting] = useRemember<SortingState>([]);
    const [columnFilters, setColumnFilters] = useRemember<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useRemember<VisibilityState>({});
    const [rowSelection, setRowSelection] = useRemember({});

    const perPage = String(metadata.per_page);
    const perPageOptions = metadata.per_page_options;

    const currentPage = metadata.current_page;
    const currentPageData = metadata.links[currentPage - 1]
    const totalPages = Math.ceil(metadata.total / metadata.per_page)

    const total = metadata.total;
    const shown = (currentPage - 1) * metadata.per_page + metadata.data.length;

    const isFirstPage = currentPage === 1;
    const prevPageUrl = isFirstPage ? null : metadata.prev_page_url;

    const isLastPage = metadata.last_page === currentPage;
    const nextPageUrl = isLastPage ? null : metadata.next_page_url;

    const columns = apiKeysColumns(user);

    const table = useReactTable({
        data: apiKeys,
        columns,
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

    return (
        <div className="space-y-3 mt-3">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                <UsersFilter
                    items={users}
                    selected={users.filter(user => user.id === filters.u)[0]}
                />
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
                                    colSpan={columns.length}
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
                                <Link key={index} href={option.link} preserveScroll={true}>
                                    <TabsTrigger value={String(option.label)}>
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
