import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { CalendarIcon, Loader2Icon, PlusIcon, SaveIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { GroupType, MembersDataType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import { useIsMobile } from "@/hooks/use-mobile";
import GroupItem from "@/Components/GroupItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { addDays, addMonths, format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";

type InitialValues = {
    user_id?: string;
    expires_at?: string | Date;
    api_key_id?: number;
}

export type ApiKeyModalProps = {
    onClose: () => void;
    title: string;
    users: MembersDataType[];
    team_id?: string;
    edit?: boolean;
    initialValues?: InitialValues;
}

export default function ApiKeyModal(props: ApiKeyModalProps) {
    const {
        onClose,
        title,
    } = props;

    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-4">
                        <ApiKeyForm {...props} />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <ApiKeyForm {...props} />
            </DialogContent>
        </Dialog>
    )
}

function ApiKeyForm(props: ApiKeyModalProps) {
    const { onClose, users, team_id, edit = false, initialValues } = props;

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        user_id: initialValues?.user_id || '',
        expires_at: initialValues?.expires_at || addMonths(new Date(), 1),
        team_id,
    });

    const selectedUser = users.find(user => String(user.user_id) === data.user_id)?.user_name || "Select user";

    const createApiKey: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            edit
                ? route('api-keys.update', { 'variable': initialValues?.api_key_id })
                : route('api-keys.create'),
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset()
                    onClose()
                },
                onError: (errors) => {
                    if (errors.user_id) {
                        reset('user_id');
                    }

                    if (errors.expires_at) {
                        reset('expires_at');
                    }
                },
            }
        );
    };

    return (
        <form onSubmit={createApiKey} className="space-y-3">
            <div className="w-full">
                <Select
                    value={String(data.user_id)}
                    onValueChange={(user) => setData('user_id', user)}
                    disabled={edit}
                >
                    <SelectTrigger className="w-full text-base md:text-sm">
                        <SelectValue placeholder={selectedUser} />
                    </SelectTrigger>
                    {!edit && (
                        <SelectContent>
                            {users?.map((user: MembersDataType, index: number) => (
                                <SelectItem
                                    key={index}
                                    value={String(user.user_id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-6">
                                            {user.user_avatar && (
                                                <AvatarImage src={`/${user.user_avatar}`} alt={`${user.user_name}'s avatar`} />
                                            )}
                                            <AvatarFallback>{getInitials(user.user_name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm text-muted-foreground">{user.user_name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    )}
                </Select>

                <InputError message={errors.user_id} className="mt-1" />
            </div>

            <div className="w-full">
                <ExpiratesAtPicker
                    data={data.expires_at}
                    setData={(date) => setData('expires_at', date)}
                />

                <InputError message={errors.expires_at} className="mt-1" />
            </div>

            <DialogFooter>
                <Button disabled={processing}>
                    {processing
                        ? <Loader2Icon className="animate-spin" />
                        : edit ? <SaveIcon /> : <PlusIcon />
                    }
                    {edit ? "Update" : "Add"}
                </Button>
            </DialogFooter>
        </form>
    )
}

function ExpiratesAtPicker({
    data,
    setData,
}: {
    data?: string | Date;
    setData: (value: string | Date) => void;
}) {
    const [open, setOpen] = useState(false);

    const selectDate = (date: string | Date) => {
        setData(date);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !data && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {data ? format(data, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2"
            >
                <Select
                    onValueChange={(value) =>
                        setData(addDays(new Date(), parseInt(value)))
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border">
                    <Calendar
                        mode="single"
                        selected={data ? new Date(data) : undefined}
                        onSelect={(day) => selectDate(day || '')}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}