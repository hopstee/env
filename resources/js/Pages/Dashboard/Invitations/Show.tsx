import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import InvitationsDataTable from './Partials/Table';
import useModalStore from "@/modalsStore/useModalStore";
import { ModalTypes } from "@/constants/modals";
import { UserPlusIcon } from "lucide-react";

export default function Invitations({ invitations }: { invitations: any }) {
    const {
        selectedTeamId,
        teams,
        roles,
        auth,
    } = usePage().props

    const { openModal } = useModalStore()

    const handleOpenModal = () => {
        openModal(ModalTypes.ADD_MEMBER_MODAL, {
            title: "Invite members to team",
            selectedTeamId,
            teams,
            roles,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Team Invitations" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Invitations
                </span>
                {auth.user.is_admin && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenModal}
                        className="ms-auto"
                    >
                        <UserPlusIcon className="size-4" />
                        Invite Members
                    </Button>
                )}
            </div>

            <InvitationsDataTable
                invitationsData={invitations}
            />
        </AuthenticatedLayout>
    );
};
