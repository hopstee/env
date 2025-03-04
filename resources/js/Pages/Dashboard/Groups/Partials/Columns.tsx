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
import { EditIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"

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
            header: () => <div className="text-left">Group</div>,
            cell: ({ row }) => {
                return <GroupItem name={row.getValue("name")} color={row.original.color} />
            },
        },
        {
            id: "users",
            header: () => <div className="text-left">Members</div>,
            cell: ({ row }) => {
                const showCount = 3;
                const groupUsers = row.original.users?.slice(0, showCount);
                const extraCount = row.original.users && row.original.users.length > showCount
                    ? row.original.users?.length - showCount
                    : null;

                return (
                    <div className="w-28">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="cursor-pointer flex w-fit"
                                    onClick={() => handelOpenManageGroupUsersDialog(row.original)}
                                >
                                    <div className="flex">
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
                                        {extraCount && (
                                            <Avatar
                                                className={cn(
                                                    "border-2 border-background -ml-4",
                                                )}
                                            >
                                                <AvatarFallback className="text-xs text-muted-foreground">{`+${extraCount}`}</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="w-40">
                                Manage group users
                            </TooltipContent>
                        </Tooltip>
                    </div>
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