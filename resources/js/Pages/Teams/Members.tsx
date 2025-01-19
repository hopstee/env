import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export default function Edit() {
    return (
        <AuthenticatedLayout>
            <Head title="Team Members" />

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Page Title
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    Team Members
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
