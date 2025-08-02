import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EvironmentVariableFiltersType, EvironmentVariableType, GroupType, VariablesPaginatedDataType } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import EnvironmentVariablesDataTable from './Partials/Table';
import { Button } from '@/Components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import useModalStore from '@/modalsStore/useModalStore';
import { ModalTypes } from '@/constants/modals';
import { useEffect } from 'react';

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

    const canEditAnyGroup = groups.some(group => group.editable === true);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            const cmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

            if (cmdOrCtrl && event.shiftKey) {
                switch (event.key.toLowerCase()) {
                    case "v":
                        event.preventDefault();
                        handleOpenCreateDialog();
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Workspace" />

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
