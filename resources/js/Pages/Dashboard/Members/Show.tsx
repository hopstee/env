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
        selectedTeamId,
    } = usePage().props

    return (
        <AuthenticatedLayout>
            <Head title="Team Members" />

            <div className="w-full flex items-center justify-between">
                <span>
                    Members
                </span>
            </div>

            <MembersDataTable
                membersData={members}
                roles={roles}
                user={auth.user}
                selectedTeamId={selectedTeamId}
            />
        </AuthenticatedLayout>
    );
}
