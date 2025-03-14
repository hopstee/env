import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Loader2Icon, PlusIcon, SaveIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { GroupType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import { useIsMobile } from "@/hooks/use-mobile";
import GroupItem from "@/Components/GroupItem";

type InitialValues = {
    key: string;
    value?: string;
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
                        <EnvironmentVariableForm {...props} />
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

                <EnvironmentVariableForm {...props} />
            </DialogContent>
        </Dialog>
    )
}

function EnvironmentVariableForm(props: EnvironmentVariableModalProps) {
    const { onClose, groups, edit = false, initialValues } = props;

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
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
                ? route('environmebt_variables.update', { 'variable': initialValues?.env_id })
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

    return (
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
                        {groups?.filter(group => group.id && group.editable).map((group: GroupType, index: number) => (
                            <SelectItem
                                key={index}
                                value={group.id}
                            >
                                <GroupItem
                                    name={group.name}
                                    color={group.color}
                                />
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <InputError message={errors.group_id} className="mt-1" />
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