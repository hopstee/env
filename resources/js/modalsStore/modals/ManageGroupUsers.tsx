import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { deepClone, deepEqual } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2Icon, PlusIcon, SaveIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { GroupType, GroupUserType, MembersDataType, User } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { useDebounce } from "@/hooks/use-debounce";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Checkbox } from "@/Components/ui/checkbox";
import UserListItem from "@/Components/UserListItem";
import { Input } from "@/Components/ui/input";

export type ManageGroupUsersProps = {
    onClose: () => void;
    group: GroupType;
    teamUsers: MembersDataType[],
    groupUsers: GroupUserType[],
    userData: User;
}

export default function ManageGroupUsers(props: ManageGroupUsersProps) {
    const { group, onClose } = props

    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Manage {group.name} Group Users</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-4">
                        <GroupUsers {...props} />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage {group.name} Group Users</DialogTitle>
                </DialogHeader>

                <GroupUsers {...props} />
            </DialogContent>
        </Dialog>
    )
}

function GroupUsers(props: ManageGroupUsersProps) {
    const {
        group,
        teamUsers,
        groupUsers,
        onClose,
        userData,
    } = props;

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const {
        data,
        setData,
        post,
        reset,
        processing,
    } = useForm({
        users: deepClone(groupUsers),
    });

    const excludeSet = new Set(data.users?.map(item => item.id));
    const searchList = teamUsers.filter(item => !excludeSet.has(item.user_id));
    const canUpdate = !deepEqual<GroupUserType[]>(data.users, groupUsers);

    const filteredTeamUsers = searchList.filter(user =>
        user.user_name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.user_email?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const filteredGroupUsers = data.users.filter(user =>
        user.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleAdd = (user: MembersDataType) => {
        setData('users', [
            ...data.users,
            {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email,
                avatar: user.user_avatar,
                can_read: true,
                can_write: false,
            },
        ]);
    }

    const handleRemove = (userId: number) => {
        setData('users', data.users.filter(user => user.id !== userId));
    }

    const handleChangeCanEdit = (userId: number, value: boolean) => {
        if (userData.is_admin) {
            setData('users', data.users?.map(user => {
                if (user.id === userId) {
                    user.can_write = value;
                }

                return user;
            }));
        }
    }

    const handleChangeCanRead = (userId: number, value: boolean) => {
        if (userData.is_admin) {
            setData('users', data.users?.map(user => {
                if (user.id === userId) {
                    user.can_read = value;
                }

                return user;
            }));
        }
    }

    const handleUpdateGroupUsers: FormEventHandler = (e) => {
        e.preventDefault();

        if (canUpdate) {
            post(route('group.update-users', { group: group.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    reset()
                    onClose()
                },
                onError: (errors) => {
                    toast.error('Errors', {
                        description: JSON.stringify(errors)
                    })
                },
            });
        }
    }

    return (
        <form>
            {userData.is_admin && (
                <Input
                    startIcon={<SearchIcon className="size-4" />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search user..."
                    className="mb-4"
                />
            )}

            <ScrollArea className="h-80 mb-4 border rounded-md">
                <p className="w-full px-4 py-2 font-semibold">Group members</p>
                {filteredGroupUsers?.map(user => (
                    <div className="flex justify-between items-center cursor-default py-2 pr-3 pl-1 rounded-md transition-colors">
                        <div className="flex items-center gap-2">
                            {userData.is_admin && (
                                <Button
                                    variant="ghost"
                                    size="sm-icon"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (userData.id !== user.id) {
                                            handleRemove(user.id)
                                        }
                                    }}
                                    disabled={userData.id === user.id}
                                >
                                    <Trash2Icon className="size-4" />
                                </Button>
                            )}
                            <UserListItem
                                name={user.name}
                                email={user.email}
                                avatar={user.avatar}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1">
                                <Checkbox
                                    checked={user.can_write}
                                    onCheckedChange={(value: boolean) => handleChangeCanEdit(user.id, value)}
                                    disabled={!userData.is_admin}
                                />
                                w
                            </div>
                            <div className="flex items-center gap-1">
                                <Checkbox
                                    checked={user.can_read}
                                    onCheckedChange={(value: boolean) => handleChangeCanRead(user.id, value)}
                                    disabled={!userData.is_admin}
                                />
                                r
                            </div>
                        </div>
                    </div>
                ))}

                <p className="w-full px-4 py-2 font-semibold">Team members</p>
                {filteredTeamUsers.length === 0 && (
                    <div className="w-full flex mb-4">
                        <p className="mx-auto text-xs">No members</p>
                    </div>
                )}
                {filteredTeamUsers?.map(user => (
                    <div className="flex justify-between items-center cursor-default py-2 pr-3 pl-1 rounded-md transition-colors">
                        <div className="flex items-center gap-2">
                            {userData.is_admin && (
                                <Button
                                    variant="ghost"
                                    size="sm-icon"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (userData.id !== user.user_id) {
                                            handleAdd(user)
                                        }
                                    }}
                                    disabled={userData.id === user.user_id}
                                >
                                    <PlusIcon className="size-4" />
                                </Button>
                            )}
                            <UserListItem
                                name={user.user_name}
                                email={user.user_email}
                                avatar={user.user_avatar}
                            />
                        </div>
                    </div>
                ))}
            </ScrollArea>

            <div className="flex gap-2">
                <Button
                    className="w-full"
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                {userData.is_admin && (
                    <Button
                        className="w-full"
                        disabled={!canUpdate || processing}
                        onClick={handleUpdateGroupUsers}
                    >
                        {processing
                            ? <Loader2Icon className="size-4 animate-spin" />
                            : <SaveIcon className="size-4" />
                        }
                        Update
                    </Button>
                )}
            </div>
        </form>
    )
}

const sortUsers = (users: GroupUserType[]) => [...users].sort((a, b) => a.id - b.id);