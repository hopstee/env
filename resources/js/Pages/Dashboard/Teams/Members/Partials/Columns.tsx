import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { MembersDataType, RoleType, RolesType, User } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

export const memberColumns = (user: User, roles: RolesType): ColumnDef<MembersDataType>[] => {

    return [
        {
            accessorKey: "user.name",
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc", true)}
                    >
                        Username
                        <ArrowUpDownIcon />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span className="px-4">
                        {row.original.user.name}
                    </span>
                )
            },
        },
        {
            accessorKey: "user.email",
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc", true)}
                    >
                        Email
                        <ArrowUpDownIcon />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span className="px-4">
                        {row.original.user.email}
                    </span>
                )
            },
        },
        {
            accessorKey: "created_at",
            header: () => <div className="text-left">Member From</div>,
            cell: ({ row }) => {
                return format(row.getValue("created_at"), "dd-MM-yyyy")
            },
        },
        {
            accessorKey: "role_id",
            enableHiding: false,
            header: () => <div className="text-left">Team Role</div>,
            cell: ({ row }) => {
                if (row.original.user.id === user.id) {
                    return (
                        <span
                            className="text-muted-foreground"
                        >
                            Owner
                        </span>
                    )
                }

                return (
                    <Select
                        defaultValue={String(row.getValue("role_id"))}
                        onValueChange={console.log}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {roles['team'].map((role: RoleType, index: number) => {
                                return <SelectItem key={index} value={String(role.id)}>{role.name}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                )
            }
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

                // const project = row.original

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
                                {/* <DropdownMenuItem
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
                                    onClick={() => router.post(route('project.archive', { project: project.id }))}
                                >
                                    <ArchiveIcon className="text-muted-foreground" />
                                    Archive
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
                                </DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
}