import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { MembersDataType, RoleType, User } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { Column, ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { useMemo } from "react"

export const memberColumns = (user: User, roles: RoleType[], selectedTeamId: string): ColumnDef<MembersDataType>[] => {
    const { openModal } = useModalStore();

    const handleDelete = (userId: number) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Are you sure?",
            description: "This action cannot be undone. This will permanently delete member and remove it data from our servers.",
            onConfirm: () => {
                router.delete(route('members.destroy', { user: userId }), {
                    preserveScroll: true,
                });
            },
            type: IconTypes.ERROR
        });
    }

    const handleChangeRole = (userId: number, roleId: string) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Change User Role",
            description: "Are you sure you want to change this user's role? This action will update their permissions within the team and may affect their access to certain features.",
            onConfirm: () => {
                router.put(route('members.update-role', { user: userId }), {
                    role_id: roleId
                }, {
                    preserveScroll: true,
                });
            },
            type: IconTypes.INFO
        });
    }

    const columns = useMemo<ColumnDef<MembersDataType>[]>(() => {
        const baseColumns: ColumnDef<MembersDataType>[] = [
            {
                accessorKey: "user_name",
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
                            {row.getValue("user_name")}
                        </span>
                    )
                },
            },
            {
                accessorKey: "user_email",
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
                            {row.getValue("user_email")}
                        </span>
                    )
                },
            },
            {
                accessorKey: "created_at",
                header: () => <div className="text-left">Member From</div>,
                cell: ({ row }) => {
                    return format(row.original.pivot.created_at, "dd-MM-yyyy")
                },
            },
            {
                accessorKey: "role_id",
                enableHiding: false,
                header: () => <div className="text-left">Team Role</div>,
                cell: ({ row }) => {
                    if (row.original.is_owner) {
                        return (
                            <span
                                className="text-muted-foreground"
                            >
                                Owner
                            </span>
                        )
                    }

                    if (!user.is_admin || user.id === row.original.user_id) {
                        return (
                            <span
                                className="text-muted-foreground"
                            >
                                {row.original.role_name}
                            </span>
                        )
                    }

                    return (
                        <Select
                            value={String(row.getValue("role_id"))}
                            onValueChange={(roleId) => handleChangeRole(row.original.user_id, roleId)}
                        >
                            <SelectTrigger
                                className="w-40"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role: RoleType, index: number) => {
                                    return <SelectItem key={index} value={String(role.id)}>{role.name}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    )
                }
            },
        ];

        if (user.is_admin) {
            baseColumns.push({
                id: "actions",
                size: 50,
                enableHiding: false,
                cell: ({ row }) => {
                    return (
                        <div className="w-8">
                            {(row.original.user_id !== user.id) && (
                                <Button
                                    size="sm-icon"
                                    variant="soft-error"
                                    // className="text-red-600 focus:text-red-600 focus:bg-red-500/20"
                                    onClick={() => handleDelete(row.original.user_id)}
                                >
                                    <Trash2Icon />
                                </Button>
                            )}
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    {(row.original.user_id !== user.id) && (
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600 focus:bg-red-500/20"
                                            onClick={() => handleDelete(row.original.user_id)}
                                        >
                                            <Trash2Icon />
                                            Delete
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu> */}
                        </div>
                    )
                },
            });
        }

        return baseColumns;
    }, [user.is_admin]);

    return columns;
}