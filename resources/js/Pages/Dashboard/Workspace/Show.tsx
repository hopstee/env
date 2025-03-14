import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EvironmentVariableFiltersType, EvironmentVariableType, GroupType, VariablesPaginatedDataType } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import EnvironmentVariablesDataTable from './Partials/Table';
import { Button } from '@/Components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import useModalStore from '@/modalsStore/useModalStore';
import { ModalTypes } from '@/constants/modals';

export default function Dashboard({
    groups,
    variablesData,
    filters,
}: {
    groups: GroupType[];
    variablesData: VariablesPaginatedDataType;
    filters: EvironmentVariableFiltersType;
}) {
    const {
        auth,
    } = usePage().props;

    const { openModal } = useModalStore();

    const handleOpenCreateDialog = () => {
        openModal(ModalTypes.ENVIRONMENT_VARIABLE_MODAL, {
            title: "Add environment variable",
            groups,
        })
    }

    const canEditAnyGroup = groups.some(group => group.editable === true)

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Environmet variables
                </span>
                {(auth.user.is_admin || canEditAnyGroup) && (
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

            <EnvironmentVariablesDataTable
                groups={groups}
                variables={variablesData.data}
                metadata={variablesData}
                filters={filters}
                user={auth.user}
            />
        </AuthenticatedLayout>
    );
}
