import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import EmojiSelect from "@/Components/EmojiSelect";
import { useForm, useRemember } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { Input } from "@/components/ui/input";

interface IProps {
    children: JSX.Element;
}

export default function EnvCreateDialog(props: IProps) {
    const {
        children,
    } = props

    const envNameInput = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useRemember(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: '',
        project_id: route().routeParams.project_id,
    });

    const createEnv: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('env.create'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setIsOpen(false)
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
        setIsOpen(prevState => !prevState)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenState}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Env</DialogTitle>
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
            {children}
        </Dialog>
    )
}