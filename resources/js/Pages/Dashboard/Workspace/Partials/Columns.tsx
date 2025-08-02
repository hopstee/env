import HiddenValue from "@/Components/HiddenValue"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import CopyTooltip from "@/Components/ui/copy-tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { COLORS } from "@/constants/colors"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { cn } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { EvironmentVariableType, GroupType, User } from "@/types"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDownIcon, CheckIcon, CopyIcon, CopyPlusIcon, EyeIcon, EyeOffIcon, MoreHorizontalIcon, PenSquareIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"

export const environmentVariablesColumns = (user: User, groups: GroupType[]): ColumnDef<EvironmentVariableType>[] => {
    const { openModal } = useModalStore();
    console.log(groups)
    return [
        {
            id: "full_copy",
            cell: ({ row }) => {
                const [copied, setCopied] = useState(false);

                const handleCopy = (valueToCopy: string) => {
                    navigator.clipboard.writeText(valueToCopy);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                };

                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm-icon"
                                onClick={() => handleCopy(`${row.original.key}=${row.original.value}`)}
                            >
                                {copied && <CheckIcon />}
                                {!copied && <CopyIcon />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            {copied ? "Copied" : "Copy 'key=value'"}
                        </TooltipContent>
                    </Tooltip>
                )
            },
        },
        {
            accessorKey: "key",
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
            cell: ({ row }) => <HiddenValue value={row.getValue("value") as string} />,
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
                    router.delete(route('environmebt-variables.destroy', { variable: originalData.id }), {
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

                const handleDuplicate = () => {
                    openModal(ModalTypes.ENVIRONMENT_VARIABLE_MODAL, {
                        title: "Duplicate environment variable",
                        groups,
                        initialValues: {
                            key: originalData.key,
                            value: originalData.value,
                        }
                    })
                }

                return (user.is_admin || row.original.can_write) && (
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
                                    <PenSquareIcon />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDuplicate}>
                                    <CopyPlusIcon />
                                    Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDelete}>
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