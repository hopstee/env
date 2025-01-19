import WorkspaceBreadcrumb from '@/Components/Breadcrumb';
import { ProfileMenu } from '@/Components/ProfileMenu';
import { ThemeSwitcher } from '@/Components/ThemeSwitcher';
import { AppSidebar } from '@/Components/sidebar/AppSidebar';
import { CustomTrigger } from '@/Components/sidebar/partials/CustomTrigger';
import { Button } from '@/Components/ui/button';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import { UserPlusIcon } from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className='border overflow-hidden !ml-0'>
                <div className="min-h-full bg-background w-full">
                    <nav className="bg-card border-b">
                        <div className="px-3">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex shrink-0 items-center">
                                        <CustomTrigger />
                                    </div>
                                </div>

                                <div className="ms-6 flex items-center gap-3">
                                    <ThemeSwitcher />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <UserPlusIcon />
                                    </Button>
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    </nav>

                    <ScrollArea className='min-h-full'>
                        <div className="py-3 sm:py-6 lg:py-12">
                            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-12 space-y-3 sm:space-y-6 lg:space-y-6">
                                <WorkspaceBreadcrumb />
                                <main>{children}</main>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
