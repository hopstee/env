import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 justify-center sm:pt-0">
            <Card className="w-full sm:max-w-md mt-6 border-none shadow-none">
                <div className="px-6">
                    <Link href="/">
                        <ApplicationLogo className="h-16 w-16 fill-current text-gray-500" />
                    </Link>
                </div>
                {children}
            </Card>
        </div>
    );
}
