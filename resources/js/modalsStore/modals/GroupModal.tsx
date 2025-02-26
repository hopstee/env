import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Loader2Icon, PlusIcon, SaveIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { COLORS, ColorKeys } from "@/constants/colors";
import InputError from "@/Components/InputError";
import { useIsMobile } from "@/hooks/use-mobile";

type InitialValues = {
    name: string;
    color: ColorKeys;
    group_id?: string;
}

export type GroupModalProps = {
    onClose: () => void;
    title: string;
    teamId: string;
    edit?: boolean;
    initialValues?: InitialValues;
}

export default function GroupModal(props: GroupModalProps) {
    const { onClose, title } = props;

    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-4">
                        <GroupForm {...props}/>
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

                <GroupForm {...props}/>
            </DialogContent>
        </Dialog>
    )
}

function GroupForm(props: GroupModalProps) {
    const { onClose, teamId, edit = false, initialValues } = props;

    const projectNameInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: initialValues?.name || '',
        color: initialValues?.color || "RED_500",
        team_id: teamId,
    });

    const addGroup: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            edit
                ? route('group.update', { group: initialValues?.group_id })
                : route('group.create'),
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset()
                    onClose()
                },
                onError: (errors) => {
                    if (errors.name) {
                        reset('name');
                        projectNameInput.current?.focus();
                    }
                },
            }
        );
    };

    const selectColor = (color: ColorKeys) => {
        setData('color', color);
    }

    return (
        <form onSubmit={addGroup} className="space-y-6">
            <div className="w-full">
                <div className="grid grid-cols-5 gap-1">
                    {(Object.keys(COLORS) as ColorKeys[]).map((color: ColorKeys, index: number) => (
                        <div
                            key={index}
                            onClick={() => selectColor(color)}
                            className={cn(
                                "h-6 rounded-md bg-background hover:bg-muted cursor-pointer p-2",
                                data.color === color && "bg-muted"
                            )}
                        >
                            <div className={cn(
                                "h-full w-full rounded",
                                `bg-${COLORS[color].default}`,
                            )}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex">
                <div className="size-10 p-3">
                    <div className={cn(
                        'size-4 rounded-full',
                        `bg-${COLORS[data.color].default}`,
                    )}></div>
                </div>
                <div className="w-full">
                    <Input
                        id="name"
                        placeholder="Dev, Prod, ..."
                        ref={projectNameInput}
                        value={data.name}
                        onChange={(e) =>
                            setData('name', e.target.value)
                        }
                        type="text"
                        className="block w-full"
                        autoComplete="name"
                    />

                    <InputError message={errors.name} className="mt-1" />
                </div>
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