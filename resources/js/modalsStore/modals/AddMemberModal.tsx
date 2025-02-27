import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { RoleType, TeamType } from "@/types";
import TagInput from "@/Components/ui/tag-input";
import InputError from "@/Components/InputError";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Input } from "@/Components/ui/input";

type FormData = {
    team_id: string;
    role: string;
    // emails: string[];
    email: string;
}

export type AddMemberModalProps = {
    onClose: () => void;
    title: string;
    selectedTeamId: string,
    teams: TeamType[],
    roles: RoleType[],
}

export default function AddMemberModal(props: AddMemberModalProps) {
    const { title, onClose } = props

    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-4">
                        <AddMemberForm {...props}/>
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

                <AddMemberForm {...props}/>
            </DialogContent>
        </Dialog>
    )
}

function AddMemberForm(props: AddMemberModalProps) {
    const { onClose, selectedTeamId, teams, roles } = props;

    const [emailValid, setEmailValid] = useState(false);

    const {
        data,
        setData,
        errors,
        setError,
        post,
        reset,
        processing,
    } = useForm<FormData>({
        team_id: selectedTeamId,
        role: String(roles[1]?.value),
        // emails: [],
        email: ""
    });

    const sendInvitations: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('invitations.send'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                onClose()
            },
            onError: (errors) => {
                toast.error('Errors', {
                    description: JSON.stringify(errors)
                })
            },
        });
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (isValidEmail(value)) {
            setError('email', "")
            setEmailValid(true);
        } else {
            setError('email', 'Email is not valid')
            setEmailValid(false);
        }
        
        setData('email', value);
    }

    return (
        <form onSubmit={sendInvitations} className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                    <Label
                        className={cn(errors.team_id && "text-destructive")}
                    >
                        Team
                    </Label>

                    <Select defaultValue={data.team_id} onValueChange={(teamId) => setData('team_id', teamId)}>
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
                            {roles.map((role: RoleType, index: number) => (
                                <SelectItem key={index} value={String(role.value)}>{role.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError message={errors.role} className="mt-1" />
                </div>
            </div>

            <div>
                <Label
                    htmlFor="email"
                    className={cn(errors.email && "text-destructive")}
                >
                    Member
                </Label>

                <Input
                    id="email"
                    value={data.email}
                    onChange={handleChangeEmail}
                    type="email"
                    placeholder="Member Email"
                    className="mt-1 w-full"
                    autoComplete="email"
                    autoFocus={true}
                />

                {/* <TagInput
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
                /> */}

                <InputError message={errors.email} className="mt-1" />
            </div>

            <div className="flex items-center justify-end gap-4">
                <Button disabled={processing || errors.email !== "" || !emailValid}>
                    {processing
                        ? <Loader2Icon className="animate-spin" />
                        : <UserPlusIcon />
                    }
                    Invite
                </Button>
            </div>
        </form>
    )
}

const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);