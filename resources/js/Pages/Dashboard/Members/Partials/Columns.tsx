import { Button } from "@/Components/ui/button"
import { MembersDataType, RoleType, User } from "@/types"
import { router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2Icon } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import { IconTypes } from "@/lib/infoIcons"
import { useMemo } from "react"
import UserListItem from "@/Components/UserListItem"

export const memberColumns = (user: User, roles: RoleType[], selectedTeamId: string): ColumnDef<MembersDataType>[] => {
    const { openModal } = useModalStore();

    const handleDelete = (userId: number) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Are you sure?",
            description: "This action cannot be undone. This will permanently delete member and remove it data from our servers.",
            onConfirm: () => {
                router.delete(route('members.destroy', { user: userId }), {
                    preserveScroll: true,
                });
            },
            type: IconTypes.ERROR
        });
    }

    const handleChangeRole = (userId: number, roleId: string) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Change User Role",
            description: "Are you sure you want to change this user's role? This action will update their permissions within the team and may affect their access to certain features.",
            onConfirm: () => {
                router.put(route('members.update-role', { user: userId }), {
                    role_id: roleId
                }, {
                    preserveScroll: true,
                });
            },
            type: IconTypes.INFO
        });
    }

    const columns = useMemo<ColumnDef<MembersDataType>[]>(() => {
        const baseColumns: ColumnDef<MembersDataType>[] = [
            {
                accessorKey: "user_name",
                header: () => <div className="text-left">User</div>,
                cell: ({ row }) => {
                    return (
                        <UserListItem
                            name={row.getValue("user_name")}
                            email={row.original.user_email}
                            avatar={row.original.user_avatar}
                        />
                    )
                },
            },
            {
                accessorKey: "created_at",
                header: () => <div className="text-left">Member From</div>,
                cell: ({ row }) => {
                    return format(row.original.pivot.created_at, "dd-MM-yyyy")
                },
            },
            {
                accessorKey: "role_id",
                header: () => <div className="text-left px-3">Team Role</div>,
                cell: ({ row }) => {
                    if (row.original.is_owner) {
                        return (
                            <span
                                className="text-muted-foreground px-3"
                            >
                                Owner
                            </span>
                        )
                    }

                    if (!user.is_admin || user.id === row.original.user_id) {
                        return (
                            <span
                                className="text-muted-foreground px-3"
                            >
                                {row.original.role_name}
                            </span>
                        )
                    }

                    return (
                        <Select
                            value={String(row.getValue("role_id"))}
                            onValueChange={(roleId) => handleChangeRole(row.original.user_id, roleId)}
                        >
                            <SelectTrigger
                                className="w-40 border-0 bg-transparent"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role: RoleType, index: number) => {
                                    return <SelectItem key={index} value={String(role.id)}>{role.name}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    )
                }
            },
        ];

        if (user.is_admin) {
            baseColumns.push({
                id: "actions",
                cell: ({ row }) => {
                    return (
                        <div className="w-9">
                            {(row.original.user_id !== user.id) && (
                                <Button
                                    size="sm-icon"
                                    variant="ghost"
                                    onClick={() => handleDelete(row.original.user_id)}
                                >
                                    <Trash2Icon />
                                </Button>
                            )}
                        </div>
                    )
                },
            });
        }

        return baseColumns;
    }, [user.is_admin]);

    return columns;
}