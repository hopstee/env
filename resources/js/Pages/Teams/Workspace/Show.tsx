import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IProjectData } from '@/types';
import { Head } from '@inertiajs/react';
import { ProjectsDataTable } from './Partials/Table';

interface IDashboard {
    projectsData: IProjectData[];
}

export default function Dashboard({
    projectsData,
}: IDashboard) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <ProjectsDataTable projectsData={projectsData} />
        </AuthenticatedLayout>
    );
}
