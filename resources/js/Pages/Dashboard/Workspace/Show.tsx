import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EvironmentVariableType, GroupType } from '@/types';
import { Head } from '@inertiajs/react';
import GroupsDataTable from './Partials/Table';
import { Button } from '@/Components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import useModalStore from '@/modalsStore/useModalStore';
import { ModalTypes } from '@/constants/modals';

export default function Dashboard({
    groups,
    variables,
}: {
    groups: GroupType[];
    variables: EvironmentVariableType[];
}) {
    const { openModal } = useModalStore();

    const handleOpenCreateDialog = () => {
        openModal(ModalTypes.ENVIRONMENT_VARIABLE_MODAL, {
            title: "Add environment variable",
            groups,
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Environmet variables
                </span>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleOpenCreateDialog}
                >
                    <PlusCircleIcon className="size-4 mr-1" />
                    Add
                </Button>
            </div>

            <GroupsDataTable
                groups={groups}
                variables={variables}
            />
        </AuthenticatedLayout>
    );
}
