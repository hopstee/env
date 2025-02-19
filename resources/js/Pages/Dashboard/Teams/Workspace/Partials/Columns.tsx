import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { ProjectType } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, ArchiveRestoreIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"

export const projectColumns: ColumnDef<ProjectType>[] = [
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
            return row.original.icon + ' ' + row.getValue("name")
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
        size: 50,
        enableHiding: false,
        cell: ({ row }) => {
            const {
                selectedTeamId,
            }: {
                selectedTeamId: string,
            } = usePage().props;

            const project = row.original


            const handleFavToggle = () => {
                router.post(
                    route('project.favToggle', { project: project.id }),
                    { is_fav: !project.is_fav }
                );
            };

            const handleArchiveToggle = () => {
                console.log(project.is_archived)
                router.post(
                    route('project.archiveToggle', { project: project.id }),
                    { is_archived: !project.is_archived }
                );
            };


            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this project?')) {
                    router.delete(route('project.destroy', {
                        project_id: project.id
                    }))
                }
            }

            return (
                <div className="space-x-1">
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
                            <DropdownMenuItem
                                onClick={handleArchiveToggle}
                            >
                                {project.is_archived ? (
                                    <ArchiveRestoreIcon className="text-muted-foreground" />
                                ) : (
                                    <ArchiveIcon className="text-muted-foreground" />
                                )}
                                {project.is_archived ? 'Unarchive' : 'Archive'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleFavToggle}
                            >
                                {project.is_fav ? (
                                    <HeartOffIcon className="text-muted-foreground" />
                                ) : (
                                    <HeartIcon className="text-muted-foreground" />
                                )}
                                {project.is_fav ? 'Remove from fav' : 'Add to fav'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                onClick={handleDelete}
                            >
                                <Trash2Icon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href={route('p.workspace', { 'team_id': selectedTeamId, 'project_id': row.original.id })}>
                        <Button
                            variant="ghost"
                            size="sm-icon"
                        >
                            <ArrowRightIcon />
                        </Button>
                    </Link>
                </div>
            )
        },
    },
]