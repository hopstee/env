import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ProjectDataType } from '@/types';
import ProjectsDataTable from './Partials/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Head, router, usePage } from '@inertiajs/react';

enum ProjectTypes {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
};


interface IDashboard {
    projects: ProjectDataType[];
    type: ProjectTypes;
}

export default function Dashboard({
    projects,
    type,
}: IDashboard) {

    const { selectedTeamId } = usePage().props

    const handleChangedValue = (value: string) => {
        router.get(route(`t.${value}`, { team_id: selectedTeamId }));
        // console.log(value);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <Tabs defaultValue={type} onValueChange={handleChangedValue}>
                <TabsList>
                    <TabsTrigger value={ProjectTypes.ACTIVE}>Active</TabsTrigger>
                    <TabsTrigger value={ProjectTypes.ARCHIVED}>Archived</TabsTrigger>
                </TabsList>

                <TabsContent value={ProjectTypes.ACTIVE}>
                    <ProjectsDataTable projectsData={projects} />
                </TabsContent>
                <TabsContent value={ProjectTypes.ARCHIVED}>
                    <ProjectsDataTable projectsData={projects} />
                </TabsContent>


            </Tabs>




        </AuthenticatedLayout>
    );
}
