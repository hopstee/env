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
                console.log(row.original)
                const handleOpenCreateDialog = () => {
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
                    router.post(route('group.favorite', { group: row.original.id, favorite: !row.original.is_favorite }), {
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
                    <div>
                        <Button
                            variant="ghost"
                            size="sm-icon"
                            onClick={handleChangeFavoriteStatus}
                        >
                            {row.original.is_favorite
                                ? <HeartIcon className="size-4" />
                                : <HeartOffIcon className="size-4 stroke-2" />
                            }
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm-icon"
                            onClick={handleOpenCreateDialog}
                        >
                            <EditIcon className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm-icon"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-600"
                        >
                            <Trash2Icon className="size-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]
}