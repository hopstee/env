import ProfileMenu from '@/Components/ProfileMenu';
import ThemeSwitcher from '@/Components/ThemeSwitcher';
import AppSidebar from '@/Components/sidebar/AppSidebar';
import CustomTrigger from '@/Components/sidebar/partials/CustomTrigger';
import { Button } from '@/Components/ui/button';
import { SidebarProvider } from '@/Components/ui/sidebar';
import { ModalTypes } from '@/constants/modals';
import useModalStore from '@/modalsStore/useModalStore';
import { GroupType, RolesType, TeamType } from '@/types';
import { usePage } from '@inertiajs/react';
import { UserPlusIcon } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const {
        selectedTeamId,
        teams,
        groups,
        roles,
    }: {
        selectedTeamId: string,
        teams: TeamType[],
        groups: GroupType[],
        roles: RolesType,
    } = usePage().props

    const { openModal } = useModalStore()

    const handleOpenModal = () => {
        openModal(ModalTypes.ADD_MEMBER_MODAL, {
            title: "Invite members to team",
            selectedTeamId,
            teams,
            groups,
            roles,
        });
    }

    return (
        <SidebarProvider>
            <AppSidebar />

            <div className="min-h-full bg-background w-full">
                <nav className="bg-card">
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
                                    size="sm-icon"
                                    onClick={handleOpenModal}
                                >
                                    <UserPlusIcon />
                                </Button>
                                <ProfileMenu />
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-3 sm:py-6">
                    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-12 space-y-3 sm:space-y-6 lg:space-y-6">
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
