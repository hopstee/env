import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EvironmentVariableFiltersType, EvironmentVariableType, GroupType, VariablesPaginatedDataType, MembersDataType, ApiKeysPaginatedDataType, ApiKeyFiltersType, ApiKeyUserType } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import ApiKeysDataTable from './Partials/Table';
import { Button } from '@/Components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import useModalStore from '@/modalsStore/useModalStore';
import { ModalTypes } from '@/constants/modals';

export default function ApiKeysPage({
    apiKeys,
    users,
    filters,
}: {
    apiKeys: ApiKeysPaginatedDataType;
    users:  ApiKeyUserType[];
    filters: ApiKeyFiltersType;
}) {
    const {
        selectedTeamId,
        auth,
    } = usePage().props;

    const { openModal } = useModalStore();

    const handleOpenCreateDialog = () => {
        openModal(ModalTypes.API_KEYS_MODAL, {
            title: "Add api key",
            users,
            team_id: selectedTeamId,
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Api Keys" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Api Keys
                </span>
                {(auth.user.is_admin) && (
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

            <ApiKeysDataTable
                apiKeys={apiKeys.data}
                user={auth.user}
                metadata={apiKeys}
                filters={filters}
                users={users}
            />
        </AuthenticatedLayout>
    );
}
