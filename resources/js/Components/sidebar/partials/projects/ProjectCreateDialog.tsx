import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import EmojiSelect from "@/Components/EmojiSelect";
import { useForm, useRemember } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { defaultEmoji } from "../../../../constants/emoji";
import { Input } from "@/components/ui/input";

interface IProps {
    children: JSX.Element;
}

export function ProjectCreateDialog(props: IProps) {
    const {
        children,
    } = props

    const projectNameInput = useRef<HTMLInputElement>(null);

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
        icon: defaultEmoji,
        name: '',
        description: '', // Добавлено поле описания
    });

    const createProject: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('project.create'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setIsOpen(false)
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    projectNameInput.current?.focus();
                }
            },
        });
    };

    const selectEmoji = (emoji: string) => {
        setData('icon', emoji);
    }

    const handleOpenState = () => {
        reset()
        setIsOpen(prevState => !prevState)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenState}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={createProject} className="space-y-6">
                    <EmojiSelect onSelect={selectEmoji} selected={data.icon} />
                    
                    <div className="w-full">
                        <Label
                            htmlFor="name"
                            className={cn(errors.name && "text-red-600")}
                        >
                            Project name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Hastle project"
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

                    <div className="w-full">
                        <Label
                            htmlFor="description"
                            className={cn(errors.description && "text-red-600")}
                        >
                            Description
                        </Label>

                        <textarea
                            id="description"
                            placeholder="Project description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.description && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
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
