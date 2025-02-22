"use client"

import { CopyIcon, HeartOffIcon, MoreHorizontalIcon, Plus, Trash2Icon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/Components/ui/sidebar"
import { Link, router, useForm } from "@inertiajs/react"
import { ProjectType } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { IconTypes } from "@/lib/infoIcons"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import { cn } from "@/lib/utils"

export default function FavouriteGroups({
    items,
    selectedTeamId,
}: {
    items: ProjectType[]
    selectedTeamId: string,
}) {
    const { isMobile } = useSidebar()
    const { openModal } = useModalStore()

    const { delete: destroy } = useForm()

    const handleConfirmDelete = (id: string) => {
        destroy(route('group.destroy', { 'group_id': id }), {
            preserveScroll: true,
        });
    }

    const confirmDelete = (id: string) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Are you sure?",
            description: "This action cannot be undone. This will permanently delete group and remove it data from our servers.",
            onConfirm: () => handleConfirmDelete(id),
            type: IconTypes.ERROR
        });
    }

    const openCreateGroup = () => {
        openModal(ModalTypes.GROUP_MODAL, {
            title: "Create Group",
            teamId: selectedTeamId,
        })
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Favourite Groups</SidebarGroupLabel>
            <SidebarGroupAction
                title="Add Group"
                onClick={openCreateGroup}
            >
                <Plus /> <span className="sr-only">Add Group</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items?.map((item: ProjectType, index: number) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                                isActive={route().current('t.active', { 'team_id': selectedTeamId, 'g': item.id })}
                                asChild
                            >
                                    <Link href={route('t.active', { 'team_id': selectedTeamId, 'g': item.id })}>
                                        <span className={cn(
                                            "w-4 h-1.5 min-w-4 rounded-full",
                                            `bg-${item.color}`
                                        )}></span>
                                        <span>{item.name}</span>
                                    </Link>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                {/* <DropdownMenuContent
                                    className="w-48"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <div>
                                        <Link href={route('t.active', { 'team_id': selectedTeamId, 'g': item.id })}>
                                            <div className="w-4 h-4 ">

                                            </div>
                                            <span className="text-xs">{item.color}</span>
                                            <span>{item.name}</span>
                                        </Link>
                                    </div>
                                </DropdownMenuContent> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction showOnHover>
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">More</span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-48"
                                        side={isMobile ? "bottom" : "right"}
                                        align={isMobile ? "end" : "start"}
                                    >
                                        <DropdownMenuItem
                                            onClick={() => navigator.clipboard.writeText(item.id)}
                                        >
                                            <CopyIcon className="text-muted-foreground" />
                                            Copy link
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600 focus:bg-red-600/10"
                                            onClick={() => confirmDelete(item.id)}
                                        >
                                            <Trash2Icon />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}