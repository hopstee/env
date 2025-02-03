import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { Input } from "@/Components/ui/input";

type InitialValues = {
    name: string;
}

export type EnvModalProps = {
    onClose: () => void;
    title: string;
    initialValues?: InitialValues;
}

export default function EnvModal(props: EnvModalProps) {
    const envNameInput = useRef<HTMLInputElement>(null);

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
        project_id: route().routeParams.project_id,
    });

    const createEnv: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('env.create'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                props.onClose()
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    envNameInput.current?.focus();
                }
            },
        });
    };

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

                <form onSubmit={createEnv} className="space-y-6">
                    <div className="w-full">
                        <Label
                            htmlFor="name"
                            className={cn(errors.name && "text-red-600")}
                        >
                            Env name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Dev env"
                            ref={envNameInput}
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="name"
                        />
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