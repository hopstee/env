import HiddenValue from "@/Components/HiddenValue"
import UserListItem from "@/Components/UserListItem"
import { Badge } from "@/Components/ui/badge"
import useModalStore from "@/modalsStore/useModalStore"
import { SysLogType } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const sysLogsColumns = (): ColumnDef<SysLogType>[] => {
    const { openModal } = useModalStore();

    return [
        {
            accessorKey: "subject",
            header: () => <div className="text-left">Subject</div>,
            cell: ({ row }) => <Badge>{row.getValue("subject")}</Badge>,
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
            id: "payload",
            header: () => <div className="text-left">Payload</div>,
            cell: ({ row }) => {
                const payload = row.original.payload;
                return (
                    <code>{payload}</code>
                )
            },
        },
        {
            accessorKey: "created_at",
            header: () => <div className="text-left">Date</div>,
            cell: ({ row }) => {
                return format(row.getValue('created_at'), 'dd-MM-yyyy');
            },
        },
    ]
}