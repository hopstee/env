import { BookOpenIcon, LayoutDashboardIcon, LifeBuoyIcon, SendIcon, SettingsIcon, UsersIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/Components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import TeamSwitcher from "./partials/TeamSwitcher"
import MainNav from "./partials/MainNav"
import Projects from "./partials/Projects"
import { NavItemType, ProjectType, TeamType } from "@/types"
import BottomNav from "./partials/BottomNav"

const navMain = (teamId: string): NavItemType[] => [
    {
        title: "Workspace",
        url: `/t/${teamId}`,
        icon: LayoutDashboardIcon,
        route: "t.active",
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

const secondaryItems = (teamId: string): NavItemType[] => [
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

export default function AppSidebar() {
    const {
        selectedTeamId,
        teams,
        projects,
    }: {
        selectedTeamId: string,
        teams: TeamType[],
        projects: ProjectType[],
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