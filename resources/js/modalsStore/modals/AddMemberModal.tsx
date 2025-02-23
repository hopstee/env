import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { FormEventHandler } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { RoleType, RolesType, TeamType, GroupType } from "@/types";
import TagInput from "@/Components/ui/tag-input";
import InputError from "@/Components/InputError";
import { toast } from "sonner";

type FormData = {
    team: string;
    role: string;
    emails: string[];
}

export type AddMemberModalProps = {
    onClose: () => void;
    title: string;
    selectedTeamId: string,
    teams: TeamType[],
    groups: GroupType[],
    roles: RolesType,
}

export default function AddMemberModal(props: AddMemberModalProps) {
    const {
        selectedTeamId,
        teams,
        groups,
        roles,
    } = props

    const {
        data,
        setData,
        errors,
        setError,
        post,
        get,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<FormData>({
        team: selectedTeamId,
        role: roles['team'][1]?.value,
        emails: [],
    });

    const sendInvitations: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('invitations.send'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                props.onClose()
            },
            onError: (errors) => {
                console.log(errors)
                toast.error('Errors')
            },
        });
    };

    return (
        <Dialog open={true} onOpenChange={props.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={sendInvitations} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="w-full">
                            <Label
                                className={cn(errors.team && "text-destructive")}
                            >
                                Team
                            </Label>

                            <Select defaultValue={data.team} onValueChange={(teamId) => setData('team', teamId)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map((team: TeamType, index: number) => (
                                        <SelectItem key={index} value={team.id}>{team.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full">
                            <Label
                                className={cn(errors.role && "text-destructive")}
                            >
                                Role
                            </Label>

                            <Select defaultValue={data.role} onValueChange={(role) => setData('role', role)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles['team'].map((role: RoleType, index: number) => (
                                        <SelectItem key={index} value={role.value}>{role.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.role} className="mt-1" />
                        </div>
                    </div>

                    <div>
                        <Label
                            htmlFor="email"
                            className={cn(errors.emails && "text-destructive")}
                        >
                            Members
                        </Label>

                        <TagInput
                            id="email"
                            tags={data.emails}
                            onChange={(emails) => setData("emails", emails)}
                            type="email"
                            placeholder="Member Email"
                            className="mt-1 w-full"
                            autoComplete="email"
                            error={errors.emails}
                            setError={(msg: string) => setError("emails", msg)}
                            validationCallback={isValidEmail}
                            autoFocus={true}
                        />

                        <InputError message={errors.emails}  className="mt-1"/>
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

                        <Button disabled={processing || errors.emails !== "" || data.emails.length === 0}>
                            {processing
                                ? <Loader2Icon className="animate-spin" />
                                : <UserPlusIcon />
                            }
                            Invite
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);