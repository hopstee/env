import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import InvitationsDataTable from './Partials/Table';

export default function Invitations({invitations}: {invitations: any}) {
    console.log(invitations)

    return (
        <AuthenticatedLayout>
            <Head title="Team Invitations" />

            <InvitationsDataTable
                invitationsData={invitations}
            />
        </AuthenticatedLayout>
    );
};
