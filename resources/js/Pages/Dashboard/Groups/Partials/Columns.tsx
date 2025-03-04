import GroupItem from "@/Components/GroupItem"
import { Avatar, AvatarFallback } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { ColorKeys } from "@/constants/colors"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { cn, getInitials } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { GroupType, MembersDataType, User } from "@/types"
import { router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon, EditIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"

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
                const groupUsers = row.original.users?.slice(0, 3);
                
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
                                    ? <HeartOffIcon className="size-4" />
                                    : <HeartIcon className="size-4" />
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