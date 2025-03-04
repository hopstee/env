import GroupItem from "@/Components/GroupItem"
import { Avatar, AvatarFallback } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import CopyTooltip from "@/Components/ui/copy-tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { COLORS, ColorKeys } from "@/constants/colors"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { cn, getInitials } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { EvironmentVariableType, GroupType, MembersDataType, User } from "@/types"
import { Link, router, useForm, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArchiveIcon, ArchiveRestoreIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, EditIcon, EyeIcon, EyeOffIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"
import { useState } from "react"

export const groupColumns = (user: User, teamId: string, teamUsers: MembersDataType[]): ColumnDef<GroupType>[] => {
    const { openModal } = useModalStore();

    const handleOpenEditDialog = (name: string, color: ColorKeys, groupId: string) => {
        openModal(ModalTypes.GROUP_MODAL, {
            title: "Add group",
            teamId,
            edit: true,
            initialValues: {
                name,
                color,
                group_id: groupId,
            }
        })
    }

    const handleChangeFavoriteStatus = (groupId: string) => {
        router.post(route('group.toggle-favorite', { group: groupId }), {
            preserveScroll: true,
        });
    }

    const handleDelete = (groupId: string) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Are you sure?",
            description: "This action cannot be undone. This will permanently delete group and remove it data from our servers.",
            onConfirm: () => {
                router.delete(route('group.destroy', { group: groupId }), {
                    preserveScroll: true,
                });
            },
            type: IconTypes.ERROR
        })
    }

    const handelOpenManageGroupUsersDialog = (groupData: GroupType) => {
        openModal(ModalTypes.MANAGE_GROUP_USERS, {
            group: groupData,
            teamUsers: teamUsers,
            groupUsers: groupData.users || [],
            userData: user,
        })
    }

    return [
        {
            accessorKey: "name",
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDownIcon />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <GroupItem name={row.getValue("name")} color={row.original.color} />
            },
        },
        {
            id: "users",
            cell: ({ row }) => {
                // handelOpenManageGroupUsersDialog
                const groupUsers = row.original.users?.slice(0, 3);
                console.log(groupUsers)
                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="cursor-pointer flex"
                                onClick={() => handelOpenManageGroupUsersDialog(row.original)}
                            >
                                <div className="flex mx-auto">
                                    {groupUsers?.map((user, index) => (
                                        <Avatar
                                            className={cn(
                                                "border-2 border-background",
                                                index > 0 && "-ml-4"
                                            )}
                                        >
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-40">
                            Manage group users
                        </TooltipContent>
                    </Tooltip>
                )
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                if (!user.is_admin) {
                    return (
                        <Button
                            size="sm-icon"
                            variant="ghost"
                            onClick={() => handleChangeFavoriteStatus(row.original.id)}
                        >
                            {row.original.is_favorite
                                ? <HeartOffIcon className="size-4" />
                                : <HeartIcon className="size-4" />
                            }
                        </Button>
                    )
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
                            <DropdownMenuItem
                                onClick={() => handleChangeFavoriteStatus(row.original.id)}
                            >
                                {row.original.is_favorite
                                    ? <HeartOffIcon className="size-4 text-muted-foreground" />
                                    : <HeartIcon className="size-4 text-muted-foreground" />
                                }
                                {row.original.is_favorite
                                    ? "Remove from favorite"
                                    : "Add to favorite"
                                }
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleOpenEditDialog(row.original.name, row.original.color, row.original.id)}
                            >
                                <EditIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                                <Trash2Icon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}