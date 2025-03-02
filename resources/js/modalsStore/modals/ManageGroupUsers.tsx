import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { cn, deepClone, deepEqual, getInitials } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon, PlusIcon, SaveIcon, Trash2Icon, UserPlusIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { GroupType, GroupUserType, MembersDataType, RoleType, TeamType, User } from "@/types";
import TagInput from "@/Components/ui/tag-input";
import InputError from "@/Components/InputError";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Input } from "@/Components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Checkbox } from "@/Components/ui/checkbox";

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

    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const {
        data,
        setData,
        errors,
        setError,
        post,
        reset,
        processing,
    } = useForm({
        users: deepClone(groupUsers),
    });

    const excludeSet = new Set(data.users?.map(item => item.id));
    const searchList = teamUsers.filter(item => !excludeSet.has(item.user_id));
    const canUpdate = !deepEqual<GroupUserType[]>(data.users, groupUsers);

    const filteredUsers = searchList.filter(user =>
        user.user_name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.user_email?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleAdd = (user: MembersDataType) => {
        setData('users', [
            ...data.users,
            {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email,
                can_read: false,
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
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            Search user...
                            <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search user..." className="h-9" onValueChange={setSearch} />
                            <CommandList>
                                <CommandEmpty>No user found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredUsers.map((user, index) => (
                                        <CommandItem
                                            key={index}
                                            value={String(user.user_id)}
                                            onSelect={(value) => {
                                                handleAdd(filteredUsers.filter(u => String(u.user_id) === value)[0])
                                                setOpen(false)
                                            }}
                                            className="group flex justify-between"
                                        >
                                            {user.user_name}
                                            <div className={cn(
                                                "flex items-center text-xs text-muted-foreground gap-1",
                                                "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                                            )}>
                                                <PlusIcon className="size-3" />
                                                Add to group
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}

            <ScrollArea className="h-48 my-4">
                {data.users?.map(user => (
                    <div className="flex justify-between items-center cursor-default p-2 hover:bg-muted rounded-md transition-colors">
                        <div className="flex items-center gap-2">
                            {userData.is_admin && (
                                <Button
                                    variant="soft-error"
                                    size="sm-icon"
                                    onClick={() => {
                                        if (userData.id !== user.id) {
                                            handleRemove(user.id)
                                        }
                                    }}
                                    disabled={userData.id === user.id}
                                >
                                    <Trash2Icon className="size-4" />
                                </Button>
                            )}
                            <Avatar>
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="leading-5">{user.name}</span>
                                <span className="text-sm text-muted-foreground">{user.email}</span>
                            </div>
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