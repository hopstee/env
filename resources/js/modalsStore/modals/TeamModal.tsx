import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { FormEventHandler, useRef } from "react";
import InputError from "@/Components/InputError";

type InitialValues = {
    name: string;
    type: string;
}

export type TeamModalProps = {
    onClose: () => void;
    title: string;
    initialValues?: InitialValues;
}

export default function TeamModal(props: TeamModalProps) {
    const teamNameInput = useRef<HTMLInputElement>(null);
    const teamTypeInput = useRef<HTMLInputElement>(null);

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
                    teamNameInput.current?.focus();
                }

                if (errors.type) {
                    reset('type');
                    teamTypeInput.current?.focus();
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

                <form onSubmit={createTeam} className="space-y-4">
                    <div>
                        <Input
                            id="name"
                            placeholder="Team"
                            ref={teamNameInput}
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="name"
                        />

                        <InputError message={errors.name} className="mt-1" />
                    </div>
                    
                    <div>
                        <Input
                            id="type"
                            placeholder="Type"
                            ref={teamTypeInput}
                            value={data.type}
                            onChange={(e) =>
                                setData('type', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="type"
                        />

                        <InputError message={errors.type} className="mt-1" />
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