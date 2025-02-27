import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, router, usePage } from '@inertiajs/react';

const AcceptInvitation = ({
    invitation,
}: {
    invitation: any
}) => {
    console.log(invitation)
    const handleConfirm = () => {
        router.post(route('invitations.confirm', invitation.token));
    };

    const handleDecline = () => {
        router.post(route('invitations.decline', invitation.token));
    };

    return (
        <GuestLayout>
            <CardHeader>
                <CardTitle>Invitation</CardTitle>
                <CardDescription>
                    You have been invited to{' '}
                    <span className="font-bold text-main">{invitation.team.name}</span>
                    {' '}team as a{' '}
                    <span className="font-bold text-main">{invitation.role.name}</span>.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        size="sm"
                        className="w-full sm:w-1/2"
                        onClick={handleConfirm}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full sm:w-1/2"
                        onClick={handleDecline}
                    >
                        Decline
                    </Button>
                </div>
            </CardContent>
        </GuestLayout>
    );
};

export default AcceptInvitation;
