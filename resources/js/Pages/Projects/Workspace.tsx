import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Empty from './Partials/Empty';

export default function Workspace() {
    const { envs } = usePage<PageProps>().props;
    console.log(envs)
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {envs.length === 0 && <Empty />}
        </AuthenticatedLayout>
    );
}
