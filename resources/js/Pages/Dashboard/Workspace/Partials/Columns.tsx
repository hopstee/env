import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import CopyTooltip from "@/Components/ui/copy-tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { COLORS } from "@/constants/colors"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { cn } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { EvironmentVariableType, GroupType } from "@/types"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDownIcon, EyeIcon, EyeOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"

export const environmentVariablesColumns = (groups: GroupType[]): ColumnDef<EvironmentVariableType>[] => {
    const { openModal } = useModalStore();
    
    return [
        {
            accessorKey: "key",
            enableColumnFilter: true,
            cell: ({ row }) => {
                return (
                    <div className="w-[200px]">
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
                    router.delete(route('environmebt_variables.destroy', { variable: originalData.id }), {
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