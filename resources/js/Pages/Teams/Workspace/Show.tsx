import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IProjectData } from '@/types';
import { Head, router, usePage, useRemember } from '@inertiajs/react';
import ProjectsDataTable from './Partials/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

enum ProjectTypes {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
};


interface IDashboard {
    projects: IProjectData[];
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
