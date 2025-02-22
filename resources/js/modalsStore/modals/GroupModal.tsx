import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, MouseEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { defaultEmoji } from "../../constants/emoji";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { COLORS, ColorKeys } from "@/constants/colors";
import InputError from "@/Components/InputError";

type InitialValues = {
    name: string;
    color: string;
}

export type GroupModalProps = {
    onClose: () => void;
    title: string;
    teamId: string;
    initialValues?: InitialValues;
}

export default function GroupModal(props: GroupModalProps) {
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
        name: props.initialValues?.name || '',
        color: props.initialValues?.color || COLORS.RED_500,
        team_id: props.teamId,
    });

    const addGroup: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('group.create'), {
            preserveScroll: true,
            onSuccess: () => {
                handleOpenState()
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    projectNameInput.current?.focus();
                }
            },
        });
    };

    const selectColor = (color: ColorKeys) => {
        setData('color', COLORS[color]);
    }

    const handleOpenState = () => {
        reset()
        props.onClose()
    }

    return (
        <Dialog open={true} onOpenChange={handleOpenState}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={addGroup} className="space-y-6">
                    <div className="w-full">
                        <div className="grid grid-cols-5 gap-1">
                            {(Object.keys(COLORS) as ColorKeys[]).map((color: ColorKeys, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => selectColor(color)}
                                    className={cn(
                                        "h-6 rounded-md bg-background hover:bg-muted cursor-pointer p-2",
                                        data.color === COLORS[color] && "bg-muted"
                                    )}
                                >
                                    <div className={cn(
                                        "h-full w-full rounded",
                                        `bg-${COLORS[color]}`,
                                    )}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex">
                        <div className="size-10 p-3">
                            <div className={cn(
                                'size-4 rounded-full',
                                `bg-${data.color}`,
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

                            <InputError message={errors.name} />
                        </div>
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
                                : <PlusIcon />
                            }
                            Add
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
