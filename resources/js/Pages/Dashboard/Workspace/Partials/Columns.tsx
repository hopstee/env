import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { cn } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { EvironmentVariableType, GroupType } from "@/types"
import { Link, router, useForm, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, ArchiveRestoreIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, EyeIcon, EyeOffIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"
import { useState } from "react"

export const groupColumns = (groups: GroupType[]): ColumnDef<EvironmentVariableType>[] => {
    return [
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
            accessorKey: "key",
            enableColumnFilter: true,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Key
                        <ArrowUpDownIcon />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return row.getValue("key")
            },
        },
        {
            accessorKey: "value",
            enableColumnFilter: true,
            header: ({ column }) => <div className="text-left">value</div>,
            cell: ({ row }) => {
                const [showValue, setShowValue] = useState(false);

                const value = row.getValue("value") as string;
                const maskedValue = '*'.repeat(value.length).slice();

                return (
                    <div>
                        <Tooltip>
                            <TooltipTrigger>
                                {showValue ? value : maskedValue}
                            </TooltipTrigger>
                            <TooltipContent>
                                Click to copy
                            </TooltipContent>
                        </Tooltip>
                        <Button
                            variant="ghost"
                            size="sm-icon"
                            onClick={() => setShowValue(prevState => !prevState)}
                            className="ml-2"
                        >
                            {showValue
                                ? <EyeOffIcon className="size-4" />
                                : <EyeIcon className="size-4" />
                            }
                        </Button>
                    </div>
                )
            },
        },
        {
            accessorKey: "group_name",
            header: () => <div className="text-left">group</div>,
            cell: ({ row }) => {
                const bgColor = row.original.group_color;

                return (
                    <Badge className={cn(
                        `bg-${bgColor}/90 hover:bg-${bgColor} border-${bgColor}`
                    )}>
                        {row.getValue("group_name")}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            size: 50,
            enableHiding: false,
            cell: ({ row }) => {
                const { openModal } = useModalStore();
                const { delete: destroy } = useForm();

                const originalData = row.original;

                const handleOpenEditModal = () => {
                    openModal(ModalTypes.ENVIRONMENT_VARIABLE_MODAL, {
                        title: "Edit environment variable",
                        groups,
                        initialValues: {
                            key: originalData.key,
                            value: originalData.value,
                            group_id: originalData.group_id
                        }
                    })
                };

                const handleConfirmDelete = () => {
                    destroy(route('environmebt_variables.destroy', { env_id: originalData.id }), {
                        preserveScroll: true,
                    });
                }

                const handleDelete = () => {
                    openModal(ModalTypes.CONFIRM_ALERT, {
                        title: "Are you sure?",
                        description: "This action cannot be undone. This will permanently delete variable and remove it data from our servers.",
                        onConfirm: handleConfirmDelete,
                        type: IconTypes.ERROR
                    });
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
                                    onClick={handleOpenEditModal}
                                >
                                    <PenSquareIcon className="text-muted-foreground" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                    onClick={handleDelete}
                                >
                                    <Trash2Icon />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
}