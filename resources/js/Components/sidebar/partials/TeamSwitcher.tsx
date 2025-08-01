"use client"

import { Plus, ChevronDownIcon, CookieIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Link } from "@inertiajs/react"
import { TeamType } from "@/types"
import { cn } from "@/lib/utils"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import { useState } from "react"

export default function TeamSwitcher({
    selectedTeamId,
    teams,
}: {
    selectedTeamId: string;
    teams: TeamType[];
}) {
    const { openModal } = useModalStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const selectedTeam = teams.filter(team => team.id === selectedTeamId)[0]

    const openTeamCreateDialog = () => {
        setIsDropdownOpen(false);
        openModal(ModalTypes.TEAM_MODAL, {
            title: "Add Team"
        });
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-foreground text-sidebar">
                                <CookieIcon className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {selectedTeam.name}
                                </span>
                                <span className="truncate text-xs">{selectedTeam.type}</span>
                            </div>
                            <ChevronDownIcon className={cn("w-5 h-5 duration-200", {
                                "rotate-180": isDropdownOpen,
                            })} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Teams
                        </DropdownMenuLabel>
                        {teams.map((team: TeamType, index: number) => <TeamItem key={index} team={team} />)}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-2 p-2"
                            onClick={openTeamCreateDialog}
                        >
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Add team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

function TeamItem({ team }: { team: TeamType }) {
    const currentRoute = route().current() || "t.active";

    return (
        <Link href={route(currentRoute, { ...route().params, team: team.id })}>
            <DropdownMenuItem className="gap-2 p-2">
                {team.name}
            </DropdownMenuItem>
        </Link>
    )
}