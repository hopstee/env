import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { FormEventHandler, useRef } from "react";
import InputError from "@/Components/InputError";
import { useIsMobile } from "@/hooks/use-mobile";

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
    const isMobile = useIsMobile()

    const { title, onClose } = props;

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-4">
                        <TeamForm {...props}/>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={true} onOpenChange={props.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>

                <TeamForm {...props}/>
            </DialogContent>
        </Dialog>
    )
}

function TeamForm(props: TeamModalProps) {
    const { initialValues, onClose } = props;

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
        name: initialValues?.name || '',
        type: initialValues?.type || '',
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
        onClose()
    }

    return (
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
                <Button disabled={processing}>
                    {processing
                        ? <Loader2Icon className="animate-spin" />
                        : <PlusIcon />
                    }
                    Add
                </Button>
            </div>
        </form>
    )
}