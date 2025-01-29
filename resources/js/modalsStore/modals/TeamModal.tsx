import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { FormEventHandler, useRef } from "react";

type InitialValues = {
    name: string;
    type: string;
}

export type TeamModalProps = {
    onClose: () => void;
    title: string;
    initialValues: InitialValues;
}

export default function TeamModal(props: TeamModalProps) {
    const projectNameInput = useRef<HTMLInputElement>(null);
    const projectTypeInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<InitialValues>({
        name: props.initialValues?.name || '',
        type: props.initialValues?.type || '',
    });

    const createTeam: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('team.create'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                handleOpenState()
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    projectNameInput.current?.focus();
                }

                if (errors.type) {
                    reset('type');
                    projectTypeInput.current?.focus();
                }
            },
        });
    };

    const handleOpenState = () => {
        props.onClose()
    }

    return (
        <Dialog open={true} onOpenChange={props.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={createTeam} className="space-y-6">
                    <div>
                        <Label
                            htmlFor="name"
                            className={cn(errors.name && "text-red-600")}
                        >
                            Name
                        </Label>

                        <Input
                            id="name"
                            ref={projectNameInput}
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="name"
                        />
                    </div>
                    
                    <div>
                        <Label
                            htmlFor="type"
                            className={cn(errors.type && "text-red-600")}
                        >
                            Type
                        </Label>

                        <Input
                            id="type"
                            ref={projectTypeInput}
                            value={data.type}
                            onChange={(e) =>
                                setData('type', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="type"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4">
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
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}