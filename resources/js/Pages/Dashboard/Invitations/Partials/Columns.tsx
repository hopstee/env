import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { InvitationsDataType, MembersDataType, RoleType, User } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, ArrowRightIcon, ArrowUpDownIcon, CopyIcon, HeartIcon, HeartOffIcon, MoreHorizontalIcon, PenSquareIcon, RotateCwIcon, Trash2Icon, UsersIcon, XCircleIcon } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { COLORS } from "@/constants/colors"

export const invitationColumns = (): ColumnDef<InvitationsDataType>[] => {
    const { openModal } = useModalStore();

    return [
        {
            accessorKey: "email",
            enableColumnFilter: true,
            cell: ({ row }) => {
                return (
                    <span className="px-4">
                        {row.getValue("email")}
                    </span>
                )
            },
        },
        {
            accessorKey: "role",
            enableHiding: false,
            header: () => <div className="text-left">Team Role</div>,
            cell: ({ row }) => {
                return (
                    <span>
                        {row.original.role.name}
                    </span>
                )
            }
        },
        {
            accessorKey: "expires_at",
            enableColumnFilter: true,
            cell: ({ row }) => {
                return (
                    <div className="flex">
                        <Badge variant="secondary">
                            {format(row.getValue('expires_at'), "dd-MM-yyyy")}
                        </Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="text-left">Status</div>,
            cell: ({ row }) => {
                let color;

                switch (row.getValue('status')) {
                    case 'pending':
                        color = COLORS['YELLOW_300'];
                        break;

                    case 'expired':
                        color = COLORS['ORANGE_500'];
                        break;

                    case 'declined':
                        color = COLORS['RED_500'];
                        break;

                    case 'revoked':
                        color = COLORS['STONE_300'];
                        break;

                    default:
                        color = COLORS['GREEN_500'];
                        break;
                }

                return (
                    <div className="flex">
                        <Badge className={`bg-${color.default} hover:bg-${color.default} text-${color.foreground}`}>
                            {row.getValue('status')}
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
                const handleConfirmRevoke = () => {
                    router.post(route('invitations.revoke', { invitation: row.original.id }), {
                        preserveScroll: true,
                    });
                }

                const handleRevoke = () => {
                    openModal(ModalTypes.CONFIRM_ALERT, {
                        title: "Are you sure?",
                        description: "This action cannot be undone. This will revoke invitation.",
                        onConfirm: handleConfirmRevoke,
                        type: IconTypes.WARNING
                    });
                }

                return (
                    <div className="space-x-1 w-[100px]">
                        {row.original.status === 'pending' && (
                            <Button
                                variant="soft-warning-ghost"
                                size="sm"
                                onClick={handleRevoke}
                            >
                                <XCircleIcon className="size-4" />
                                Revoke
                            </Button>
                        )}

                        {row.original.status === 'expired' && (
                            <Button
                                variant="soft-success-ghost"
                                size="sm"
                                onClick={handleRevoke}
                            >
                                <RotateCwIcon className="size-4" />
                                Revoke
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]
}