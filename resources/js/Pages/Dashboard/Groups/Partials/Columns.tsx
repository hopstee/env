import GroupItem from "@/Components/GroupItem"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import CopyTooltip from "@/Components/ui/copy-tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { COLORS } from "@/constants/colors"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { cn } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { EvironmentVariableType, GroupType } from "@/types"
import { Link, router, useForm, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArchiveIcon, ArchiveRestoreIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, EditIcon, EyeIcon, EyeOffIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"
import { useState } from "react"

export const groupColumns = (teamId: string): ColumnDef<GroupType>[] => {
    const { openModal } = useModalStore();

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
            id: "actions",
            size: 50,
            enableHiding: false,
            cell: ({ row }) => {
                const handleOpenEditDialog = () => {
                    openModal(ModalTypes.GROUP_MODAL, {
                        title: "Add group",
                        teamId,
                        edit: true,
                        initialValues: {
                            name: row.original.name,
                            color: row.original.color,
                            group_id: row.original.id,
                        }
                    })
                }

                const handleChangeFavoriteStatus = () => {
                    router.post(route('group.toggle-favorite', { group: row.original.id }), {
                        preserveScroll: true,
                    });
                }

                const handleDelete = () => {
                    openModal(ModalTypes.CONFIRM_ALERT, {
                        title: "Are you sure?",
                        description: "This action cannot be undone. This will permanently delete group and remove it data from our servers.",
                        onConfirm: handleConfirmDelete,
                        type: IconTypes.ERROR
                    })
                }

                const handleConfirmDelete = () => {
                    router.delete(route('group.destroy', { group: row.original.id }), {
                        preserveScroll: true,
                    });
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
                                onClick={handleChangeFavoriteStatus}
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
                                onClick={handleOpenEditDialog}
                            >
                                <EditIcon className="size-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 focus:bg-red-500/20"
                                onClick={handleDelete}
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
}