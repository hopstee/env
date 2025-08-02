import { KeyRoundIcon, LayoutDashboardIcon, LifeBuoyIcon, ListIcon, SendIcon, SettingsIcon, UserPlusIcon, UsersIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/Components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import TeamSwitcher from "./partials/TeamSwitcher"
import MainNav from "./partials/MainNav"
import FavoriteGroups from "./partials/FavoriteGroups"
import { NavItemType } from "@/types"
import BottomNav from "./partials/BottomNav"

const baseMainNav = (teamId: string): NavItemType[] => [
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
];

const adminMainNav = (teamId: string): NavItemType[] => [
    {
        title: "Members",
        url: `/t/${teamId}/members`,
        icon: UsersIcon,
        route: "t.members",
    },
    {
        title: "Invitations",
        url: `/t/${teamId}/invitations`,
        icon: UserPlusIcon,
        route: "t.invitations",
    },
    {
        title: "Api Keys",
        url: `/t/${teamId}/api-keys`,
        icon: KeyRoundIcon,
        route: "t.api-keys",
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
        auth,
    } = usePage().props;

    let nav = baseMainNav(selectedTeamId);

    if (auth.user.is_admin) {
        nav = [...nav, ...adminMainNav(selectedTeamId)];
    }

    return (
        <Sidebar
            collapsible="icon"
            // variant="inset"
        >
            <SidebarHeader>
                <TeamSwitcher teams={teams} selectedTeamId={selectedTeamId} />
                <MainNav items={nav} />
            </SidebarHeader>
            <SidebarContent>
                <FavoriteGroups items={favoriteGroups} selectedTeamId={selectedTeamId} isAdmin={auth.user.is_admin} />
                <BottomNav items={secondaryItems(selectedTeamId)} className="mt-auto" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}