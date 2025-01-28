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
import { Link, useRemember } from "@inertiajs/react"
import { ITeam } from "@/types"
import { cn } from "@/lib/utils"
import TeamCreateDialog from "./TeamCreateDialog"
import { DialogTrigger } from "@/Components/ui/dialog"

export default function TeamSwitcher({
    selectedTeamId,
    teams,
}: {
    selectedTeamId: string;
    teams: ITeam[];
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useRemember(false)

    const selectedTeam = teams.filter(team => team.id === selectedTeamId)[0]
    // const SelectedTeamIcon = lucideIcons[selectedTeam.icon as keyof typeof lucideIcons]

    return (
        <TeamCreateDialog>
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
                            {teams.map((team: ITeam) => <TeamItem key={team.id} team={team} />)}
                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Add team</div>
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </TeamCreateDialog>
    )
}

function TeamItem({ team }: { team: ITeam }) {
    return (
        <Link href={route('t.workspace', team.id)}>
            <DropdownMenuItem className="gap-2 p-2">
                {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <team.logo className="size-4 shrink-0" />
                                        </div> */}
                {team.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
            </DropdownMenuItem>
        </Link>
    )
}