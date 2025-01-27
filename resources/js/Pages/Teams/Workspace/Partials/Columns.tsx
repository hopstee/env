import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { IProject } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, ArrowUpDownIcon, CopyIcon, HeartIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"

export const projectColumns: ColumnDef<IProject>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
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
        // size: 200,
        enableColumnFilter: true,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Project
                    <ArrowUpDownIcon />
                </Button>
            )
        },
        cell: ({ row }) => {
            const {
                selectedTeamId,
            }: {
                selectedTeamId: string,
            } = usePage().props;

            return (
                <Link href={route('p.workspace', { 'team_id': selectedTeamId, 'project_id': row.original.id })}>
                    <Button
                        variant="link"
                    >
                        {row.original.icon + ' ' + row.getValue("name")}
                    </Button>
                </Link>
            )
        },
    },
    {
        accessorKey: "users_count",
        header: () => <div className="text-right">Members</div>,
        cell: ({ row }) => {
            const usersCount = parseFloat(row.getValue("users_count"))

            const formatted = <Badge>{usersCount}<UsersIcon className="size-4 ml-1" /></Badge>

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const project = row.original // Переименовано payment -> project

            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this project?')) {
                    router.delete(route('project.destroy', {
                        project_id: project.id
                    }))
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(project.id)}
                        >
                            <CopyIcon className="text-muted-foreground" />
                            Copy link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <PenSquareIcon className="text-muted-foreground" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ArchiveIcon className="text-muted-foreground" />
                            Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HeartIcon className="text-muted-foreground" />
                            Add to fav
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            onClick={handleDelete} // Добавлен обработчик
                        >
                            <Trash2Icon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]