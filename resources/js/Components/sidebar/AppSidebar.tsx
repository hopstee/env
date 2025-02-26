import { BookOpenIcon, LayoutDashboardIcon, LifeBuoyIcon, ListIcon, SendIcon, SettingsIcon, UsersIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/Components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import TeamSwitcher from "./partials/TeamSwitcher"
import MainNav from "./partials/MainNav"
import FavoriteGroups from "./partials/FavoriteGroups"
import { NavItemType, GroupType, TeamType } from "@/types"
import BottomNav from "./partials/BottomNav"

const navMain = (teamId: string): NavItemType[] => [
    {
        title: "Workspace",
        url: `/t/${teamId}`,
        icon: LayoutDashboardIcon,
        route: "t.active",
    },
    {
        title: "Groups",
        url: `/t/${teamId}/groups`,
        icon: ListIcon,
        route: "t.groups",
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
        favoriteGroups,
    }: {
        selectedTeamId: string,
        teams: TeamType[],
        favoriteGroups: GroupType[],
    } = usePage().props;

    return (
        <Sidebar
            collapsible="icon"
            // variant="inset"
        >
            <SidebarHeader>
                <TeamSwitcher teams={teams} selectedTeamId={selectedTeamId} />
                <MainNav items={navMain(selectedTeamId)} />
            </SidebarHeader>
            <SidebarContent>
                <FavoriteGroups items={favoriteGroups} selectedTeamId={selectedTeamId} />
                <BottomNav items={secondaryItems(selectedTeamId)} className="mt-auto" />
            </SidebarContent>
        </Sidebar>
    )
}