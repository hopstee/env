import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Empty from './Partials/Empty';
import EnvDataTable from './Partials/Table';

export default function Workspace() {
    const { envs } = usePage<PageProps>().props;
    
    return (
        <AuthenticatedLayout>
            <Head title="Project" />

            {!envs.length && <Empty />}
            {!!envs.length && <EnvDataTable envs={envs} />}
        </AuthenticatedLayout>
    );
}
