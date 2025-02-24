import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { MembersDataType } from '@/types';
import MembersDataTable from './Partials/Table';

type TMembers = {
    members: MembersDataType[]
}

export default function Members({
    members,
}: TMembers) {
    const {
        auth,
        roles,
    } = usePage().props
    console.log(members)
    return (
        <AuthenticatedLayout>
            <Head title="Team Members" />

            <MembersDataTable
                membersData={members}
                roles={roles}
                user={auth.user}
            />
        </AuthenticatedLayout>
    );
}
