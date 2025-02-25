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
import { ArchiveIcon, ArchiveRestoreIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, EyeIcon, EyeOffIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon, UsersIcon } from "lucide-react"
import { useState } from "react"

export const groupColumns = (groups: GroupType[]): ColumnDef<EvironmentVariableType>[] => {
    return [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
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
                return (
                    <div className="max-w-[200px] w-fit">
                        <CopyTooltip
                            trigger={
                                <div className="truncate">{row.getValue("key")}</div>
                            }
                            valueToCopy={row.getValue("key")}
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: "value",
            enableColumnFilter: false,
            enableResizing: true,
            header: ({ column }) => <div className="text-left">Value</div>,
            cell: ({ row }) => {
                const [showValue, setShowValue] = useState(false);

                const value = row.getValue("value") as string;
                const maskedValue = '•'.repeat(value.length).slice(0, 10);

                return (
                    <div className="flex items-center w-[200px]">
                        <Button
                            variant="ghost"
                            size="sm-icon"
                            onClick={() => setShowValue(prevState => !prevState)}
                            className="mr-2 min-w-9"
                        >
                            {showValue
                                ? <EyeOffIcon className="size-4" />
                                : <EyeIcon className="size-4" />
                            }
                        </Button>
                        {showValue
                            ? (
                                <CopyTooltip
                                    trigger={
                                        <Badge variant="secondary" className="max-w-[200px]">
                                            {value}
                                        </Badge>
                                    }
                                    valueToCopy={value}
                                />
                            ) : (
                                <div className="">{maskedValue}</div>
                            )
                        }
                    </div>
                )
            },
        },
        {
            accessorKey: "group_name",
            header: () => <div className="text-left">Group</div>,
            cell: ({ row }) => {
                const colorKey = row.original.group_color;
                const defaultColor = COLORS[colorKey].default;
                const mutedColor = COLORS[colorKey].muted;
                const foregroundColor = COLORS[colorKey].foreground;

                return (
                    <Badge className={cn(
                        `bg-${defaultColor} hover:bg-${mutedColor} text-${foregroundColor}`
                    )}>
                        {row.getValue("group_name")}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "updated_at",
            header: () => <div className="text-left">Last updated</div>,
            cell: ({ row }) => {
                const date = format(row.getValue("updated_at"), 'dd-MM-yyyy')

                return (
                    <div className="w-[200px]">
                        <Badge variant="secondary">
                            Updated at {date}
                        </Badge>
                    </div>
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
                        title: "Update environment variable",
                        groups,
                        edit: true,
                        initialValues: {
                            key: originalData.key,
                            value: originalData.value,
                            env_id: originalData.id,
                            group_id: originalData.group_id,
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