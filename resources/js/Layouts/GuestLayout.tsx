import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <Card className="w-full sm:max-w-md mt-6">
                {children}
            </Card>
        </div>
    );
}
