import { BookOpenIcon, LayoutDashboardIcon, LifeBuoyIcon, SendIcon, SettingsIcon, UsersIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/Components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import { TeamSwitcher } from "./partials/teams/TeamSwitcher"
import { MainNav } from "./partials/MainNav"
import { Projects } from "./partials/projects/Projects"
import { INavItem, IProject, ITeam } from "@/types"
import { BottomNav } from "./partials/BottomNav"

const navMain = (teamId: string): INavItem[] => [
    {
        title: "Workspace",
        url: `/t/${teamId}`,
        icon: LayoutDashboardIcon,
        route: "t.workspace",
    },
    {
        title: "Readme",
        url: `/t/${teamId}/readme`,
        icon: BookOpenIcon,
        route: "t.readme",
    },
    {
        title: "Members",
        url: `/t/${teamId}/members`,
        icon: UsersIcon,
        route: "t.members",
    },
    {
        title: "Settings",
        url: `/t/${teamId}/settings`,
        icon: SettingsIcon,
        route: "t.settings",
    },
]

const secondaryItems = (teamId: string): INavItem[] => [
    {
        title: "Support",
        url: `/t/${teamId}`,
        icon: LifeBuoyIcon,
        route: "",
    },
    {
        title: "Feedback",
        url: `/t/${teamId}`,
        icon: SendIcon,
        route: "",
    },
]

export function AppSidebar() {
    const {
        selectedTeamId,
        teams,
        projects,
    }: {
        selectedTeamId: string,
        teams: ITeam[],
        projects: IProject[],
    } = usePage().props;
    
    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
        >
            <SidebarHeader>
                <TeamSwitcher teams={teams} selectedTeamId={selectedTeamId} />
                <MainNav items={navMain(selectedTeamId)} />
            </SidebarHeader>
            <SidebarContent>
                <Projects items={projects} selectedTeamId={selectedTeamId} />
                <BottomNav items={secondaryItems(selectedTeamId)} className="mt-auto" />
            </SidebarContent>
        </Sidebar>
    )
}