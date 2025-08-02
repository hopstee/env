import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { SysLogType } from '@/types';
import { Head } from '@inertiajs/react';
import SysLogsDataTable from './Partials/Table';

export default function ApiKeysPage({
    sysLogs,
}: {
    sysLogs: SysLogType[];
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Sys Logs" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Sys Logs
                </span>
            </div>

            <SysLogsDataTable
                sysLogs={sysLogs}
            />
        </AuthenticatedLayout>
    );
}
