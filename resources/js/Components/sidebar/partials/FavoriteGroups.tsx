"use client"

import { CopyIcon, MoreHorizontalIcon, Plus, Trash2Icon } from "lucide-react"
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
import { Link, useForm } from "@inertiajs/react"
import { GroupType } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { IconTypes } from "@/lib/infoIcons"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import GroupItem from "@/Components/GroupItem"

export default function FavoriteGroups({
    items,
    selectedTeamId,
}: {
    items: GroupType[]
    selectedTeamId: string,
}) {
    const { isMobile, open } = useSidebar()
    const { openModal } = useModalStore()

    const { delete: destroy } = useForm()

    const handleConfirmDelete = (id: string) => {
        destroy(route('group.destroy', { 'group': id }), {
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
                    {items?.map((item: GroupType, index: number) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                                asChild
                                isActive={route().current('t.active', { 'team': selectedTeamId, 'g': item.id })}
                                tooltip={item.name}
                            >
                                <Link
                                    href={
                                        route('t.active', {
                                            preserveState: true,
                                            preserveScroll: true,
                                            ...route().params,
                                            'g': item.id,
                                        })
                                    }
                                >
                                    {/* <div className={cn(
                                        "px-0.5 py-0 text-xs rounded-md overflow-hidden transition-all duration-400",
                                        `bg-${COLORS[item.color].default} text-${COLORS[item.color].foreground}`,
                                        open && "px-2 py-0.5"
                                    )}>
                                        <span
                                            className={cn(
                                                "opacity-0 transition-opacity duration-400",
                                                open && "opacity-100"
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    </div> */}
                                    <GroupItem
                                        name={item.name}
                                        color={item.color}
                                        compact={!open}
                                    />
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
                                        <Link href={route('t.active', { 'team': selectedTeamId, 'g': item.id })}>
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