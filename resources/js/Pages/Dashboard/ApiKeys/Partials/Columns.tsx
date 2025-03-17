import UserListItem from "@/Components/UserListItem"
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
import { ApiKeyUserType, ApiKeysType, EvironmentVariableType, GroupType, MembersDataType, User } from "@/types"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDownIcon, BanIcon, CheckCircle2Icon, CheckIcon, CopyIcon, CopyPlusIcon, EyeIcon, EyeOffIcon, MoreHorizontalIcon, PenSquareIcon, PlugIcon, RotateCcwIcon, Trash2Icon, UnplugIcon } from "lucide-react"
import { useState } from "react"

export const apiKeysColumns = (user: User): ColumnDef<ApiKeysType>[] => {
    const { openModal } = useModalStore();

    return [
        {
            accessorKey: "api_key",
            header: () => <div className="text-left">Api Key</div>,
            cell: ({ row }) => {
                const [showValue, setShowValue] = useState(false);

                const value = row.getValue("api_key") as string;
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
            id: "user",
            header: () => <div className="text-left">User</div>,
            cell: ({ row }) => {
                const user = row.original.user;
                return (
                    <UserListItem
                        name={user.name}
                        email={user.email}
                        avatar={user.avatar}
                    />
                )
            },
        },
        {
            accessorKey: "is_active",
            header: () => <div className="text-left">Status</div>,
            cell: ({ row }) => {
                const isActive = row.getValue('is_active');

                let color;

                if (isActive) {
                    color = COLORS['GREEN_500'];
                } else {
                    color = COLORS['STONE_300'];
                }

                return (
                    <Badge className={`bg-${color.default} hover:bg-${color.default} text-${color.foreground}`}>
                        {isActive
                            ? 'active'
                            : 'expired'
                        }
                    </Badge>
                )
            },
        },
        {
            accessorKey: "expires_at",
            header: () => <div className="text-left">Expires at</div>,
            cell: ({ row }) => {
                return row.getValue('expires_at')
                ? format(row.getValue('expires_at'), 'dd-MM-yyyy')
                : <span className="text-muted-foreground">Without expiration</span>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const originalData = row.original;
                
                const handleConfirmRegenerate = () => {
                    router.post(route('api-keys.regen', { apiKey: originalData.id }), {}, {
                        preserveScroll: true,
                    });
                }
                
                const handleRegenerate = () => {
                    openModal(ModalTypes.CONFIRM_ALERT, {
                        title: "Are you sure?",
                        description: "This action cannot be undone. This will permanently delete variable and remove it data from our servers.",
                        onConfirm: handleConfirmRegenerate,
                        type: IconTypes.ERROR
                    });
                }

                const handleConfirmDeactivate = () => {
                    router.post(route('api-keys.update', { apiKey: row.original.id }), {
                        is_active: false,
                    }, {
                        preserveScroll: true,
                    });
                }

                const handleDeactivate = () => {
                    if (originalData.is_active) {
                        openModal(ModalTypes.CONFIRM_ALERT, {
                            title: "Are you sure?",
                            description: "This action cannot be undone. This will permanently delete variable and remove it data from our servers.",
                            onConfirm: handleConfirmDeactivate,
                            type: IconTypes.ERROR
                        });
                    }
                }
                
                const handleConfirmDelete = () => {
                    router.delete(route('api-keys.destroy', { apiKey: originalData.id }), {
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

                return user.is_admin && (
                    <div className="space-x-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={handleRegenerate}>
                                    <RotateCcwIcon />
                                    Regenerate
                                </DropdownMenuItem>
                                {originalData.is_active && (
                                    <DropdownMenuItem onClick={handleDeactivate}>
                                        <UnplugIcon />
                                        Deactivate
                                    </DropdownMenuItem>
                                )}
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