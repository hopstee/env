import { Button } from '@/Components/ui/button';
import { router, usePage } from '@inertiajs/react';

const AcceptInvitation = () => {
    const { invitation } = usePage().props;

    const handleConfirm = () => {
        console.log('confirm')
        router.post(route('invitations.confirm', invitation.token));
    };

    const handleDecline = () => {
        router.post(route('invitations.decline', invitation.token));
    };

    return (
        <div>
            <h1>Invitation</h1>
            <p>You have been invited to {invitation.accessable.name} team as a {invitation.role_id}.</p>
            <div>
                <Button onClick={handleConfirm}>Accepr</Button>
                <Button onClick={handleDecline}>Decline</Button>
            </div>
        </div>
    );
};

export default AcceptInvitation;
