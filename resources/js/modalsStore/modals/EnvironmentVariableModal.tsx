import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { CheckIcon, ChevronDownIcon, Loader2Icon, PlusIcon, SaveIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { Input } from "@/Components/ui/input";
import { GroupType, User } from "@/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import GroupItem from "@/Components/GroupItem";
import InputError from "@/Components/InputError";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/Components/ui/sheet";

type InitialValues = {
    key: string;
    value: string;
    env_id?: number;
    group_id?: string;
}

export type EnvironmentVariableModalProps = {
    onClose: () => void;
    title: string;
    groups: GroupType[];
    edit?: boolean;
    initialValues?: InitialValues;
}

export default function EnvironmentVariableModal(props: EnvironmentVariableModalProps) {
    const {
        onClose,
        title,
        groups,
        edit = false,
        initialValues,
    } = props;

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<InitialValues>({
        key: initialValues?.key || '',
        value: initialValues?.value || '',
        group_id: initialValues?.group_id,
    });

    const selectedGroup = groups.find(group => group.id === data.group_id)?.name || "Select group";

    const createEnv: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            edit
                ? route('environmebt_variables.update', {'variable': initialValues?.env_id})
                : route('environmebt_variables.create'),
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset()
                    onClose()
                },
                onError: (errors) => {
                    if (errors.key) {
                        reset('key');
                    }

                    if (errors.value) {
                        reset('value');
                    }

                    if (errors.group_id) {
                        reset('group_id');
                    }
                },
            }
        );
    };

    const handleOpenState = () => {
        reset()
        onClose()
    }

    return (
        <Dialog open={true} onOpenChange={handleOpenState}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={createEnv} className="space-y-3">
                    <div className="w-full flex space-x-3">
                        <div className="w-full">
                            <Input
                                id="name"
                                placeholder="key"
                                value={data.key}
                                onChange={(e) =>
                                    setData('key', e.target.value)
                                }
                                type="text"
                                className="block w-full"
                                autoComplete="name"
                            />

                            <InputError message={errors.key} className="mt-1" />
                        </div>

                        <div className="w-full">
                            <Input
                                id="name"
                                placeholder="value"
                                value={data.value}
                                onChange={(e) =>
                                    setData('value', e.target.value)
                                }
                                type="text"
                                className="block w-full"
                                autoComplete="name"
                            />

                            <InputError message={errors.value} className="mt-1" />
                        </div>
                    </div>

                    <div className="w-full">
                        <Select
                            value={data.group_id}
                            onValueChange={(group) => setData('group_id', group)}
                        >
                            <SelectTrigger className="w-full text-base md:text-sm">
                                <SelectValue placeholder={selectedGroup} />
                            </SelectTrigger>
                            <SelectContent>
                                {groups?.map((group: GroupType) => (
                                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.group_id} className="mt-1" />
                    </div>

                    <DialogFooter>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                👌 Done
                            </p>
                        </Transition>

                        <Button disabled={processing}>
                            {processing
                                ? <Loader2Icon className="animate-spin" />
                                : edit ? <SaveIcon /> : <PlusIcon />
                            }
                            {edit ? "Update" : "Add"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}