import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EvironmentVariableFiltersType, EvironmentVariableType, GroupType, VariablesPaginatedDataType } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import EnvironmentVariablesDataTable from './Partials/Table';
import { Button } from '@/Components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import useModalStore from '@/modalsStore/useModalStore';
import { ModalTypes } from '@/constants/modals';
import GroupsDataTable from './Partials/Table';

export default function Groups({
    groups,
}: {
    groups: GroupType[];
}) {
    const {
        selectedTeamId,
        auth,
    } = usePage().props;

    const { openModal } = useModalStore();

    const handleOpenCreateDialog = () => {
        openModal(ModalTypes.GROUP_MODAL, {
            title: "Add group",
            teamId: selectedTeamId
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Groups
                </span>
                {auth.user.is_admin && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleOpenCreateDialog}
                    >
                        <PlusCircleIcon className="size-4 mr-1" />
                        Add
                    </Button>
                )}
            </div>

            <GroupsDataTable
                groups={groups}
                teamId={selectedTeamId}
            />
        </AuthenticatedLayout>
    );
}
