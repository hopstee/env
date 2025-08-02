import ProfileMenu from '@/Components/ProfileMenu';
import ThemeSwitcher from '@/Components/ThemeSwitcher';
import { Button } from '@/Components/ui/button';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { ArrowLeftIcon, UserPlusIcon } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Profile({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="min-h-full bg-background w-full">
            <nav className="bg-card border-b">
                <div className="px-3">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Button variant="ghost" onClick={() => window.history.back()}>
                                    <ArrowLeftIcon className="size-4" />
                                    Go back
                                </Button>
                            </div>
                        </div>

                        <div className="ms-6 flex items-center gap-3">
                            <ThemeSwitcher />
                            <Button
                                variant="ghost"
                                size="sm-icon"
                            >
                                <UserPlusIcon />
                            </Button>
                            <ProfileMenu />
                        </div>
                    </div>
                </div>
            </nav>

            <ScrollArea className='min-h-full'>
                <main>{children}</main>
            </ScrollArea>
        </div>
    );
}
