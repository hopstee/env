"use client"

import { HeartOffIcon, InfoIcon, MoreHorizontalIcon, Plus, Trash2Icon } from "lucide-react"
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
import { GroupType } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { IconTypes } from "@/lib/infoIcons"
import useModalStore from "@/modalsStore/useModalStore"
import { ModalTypes } from "@/constants/modals"
import GroupItem from "@/Components/GroupItem"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"

export default function FavoriteGroups({
    items,
    selectedTeamId,
    isAdmin,
}: {
    items: GroupType[];
    selectedTeamId: string;
    isAdmin: boolean;
}) {
    const { isMobile, open, openMobile } = useSidebar()
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
            isFavorite: true,
        })
    }

    const handleRemoveFromFavorite = (groupId: string) => {
        router.post(route('group.toggle-favorite', { group: groupId }), {
            preserveScroll: true,
        });
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Favourite Groups</SidebarGroupLabel>
            {isAdmin && (
                <SidebarGroupAction
                    title="Add Group"
                    onClick={openCreateGroup}
                >
                    <Plus /> <span className="sr-only">Add Group</span>
                </SidebarGroupAction>
            )}
            <SidebarGroupContent>
                {!items.length && (
                    <div className="w-full flex items-center justify-center gap-2 px-2 py-2 text-xs text-muted-foreground">
                        {(open || openMobile) && <span>No favorite groups</span>}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InfoIcon className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent side={open ? "bottom" : "right"} className="w-40">
                                You can add groups to favorite on groups page
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}
                {!!items.length && (
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
                                        <GroupItem
                                            name={item.name}
                                            color={item.color}
                                            compact={isMobile ? !openMobile : !open}
                                        />
                                    </Link>
                                </SidebarMenuButton>
                                {isAdmin ? (
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
                                            <DropdownMenuItem onClick={() => handleRemoveFromFavorite(item.id)}>
                                                <HeartOffIcon />
                                                Remove from favorite
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => confirmDelete(item.id)}>
                                                <Trash2Icon />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <SidebarMenuAction
                                        showOnHover
                                        onClick={() => handleRemoveFromFavorite(item.id)}
                                    >
                                        <HeartOffIcon />
                                        <span className="sr-only">Remove from favorite</span>
                                    </SidebarMenuAction>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                )}
            </SidebarGroupContent>
        </SidebarGroup>
    )
}