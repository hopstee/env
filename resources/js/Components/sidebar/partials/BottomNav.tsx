"use client"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { NavItemType } from "@/types"
import { Link } from "@inertiajs/react"

export default function BottomNav({
    items,
    ...props
}: {
    items: NavItemType[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item: NavItemType, index: number) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                                asChild
                                isActive={route().current(item.route)}
                                tooltip={item.title}
                            >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}