import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import EmojiSelect from "@/Components/EmojiSelect";
import { useForm, useRemember } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { defaultEmoji } from "../../constants/emoji";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

type InitialValues = {
    icon: string;
    name: string;
    description: string;
}

export type ProjectModalProps = {
    onClose: () => void;
    title: string;
    initialValues: InitialValues;
}

export default function ProjectModal(props: ProjectModalProps) {
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
        icon: props.initialValues?.icon || defaultEmoji,
        name: props.initialValues?.name || '',
        description: props.initialValues?.description || '',
    });

    const createProject: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('project.create'), {
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

    const selectEmoji = (emoji: string) => {
        setData('icon', emoji);
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

                        <Textarea
                            id="description"
                            placeholder="Project description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
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
        </Dialog>
    )
}
