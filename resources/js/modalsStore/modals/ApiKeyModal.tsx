import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { CalendarIcon, Loader2Icon, PlusIcon, SaveIcon } from "lucide-react";
import { ApiKeyUserType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { addDays, addMonths, format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import UserSmallItem from "@/Components/UserSmallItem";

type InitialValues = {
    user_id?: string;
    expires_at?: string | Date | null;
    api_key_id?: number;
}

export type ApiKeyModalProps = {
    onClose: () => void;
    title: string;
    users: ApiKeyUserType[];
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
        setError,
        post,
        reset,
        processing,
    } = useForm({
        user_id: initialValues?.user_id || '',
        expires_at: initialValues?.expires_at || addMonths(new Date(), 1),
        team_id,
    });

    const selectedUser = users.find(user => String(user.id) === data.user_id)?.name || "Select user";

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
                        setError('user_id', 'Wrong user');
                    }

                    if (errors.expires_at) {
                        reset('expires_at');
                        setError('expires_at', 'Wrong expiration date');
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
                            {users?.map((user: ApiKeyUserType, index: number) => (
                                <SelectItem
                                    key={index}
                                    value={String(user.id)}
                                >
                                    <UserSmallItem
                                        name={user.name}
                                        avatar={user.avatar}
                                    />
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
                    setData={(date) => setData('expires_at', date as Date)}
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
    data?: string | Date | null;
    setData: (value: string | Date | null) => void;
}) {
    const [open, setOpen] = useState(false);

    const selectDate = (date: string | Date | null) => {
        setData(date);
        setOpen(false);
    }

    const selectPredefined = (value: string) => {
        setData(value === '-1' ? null : addDays(new Date(), parseInt(value)));
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
                    {data ? format(data, "PPP") : <span>Without expiration</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="center"
                // w-[--radix-popover-trigger-width]
                className="flex  flex-col space-y-2 p-2"
            >
                <Select onValueChange={selectPredefined}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="-1">No expiration</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border w-full">
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