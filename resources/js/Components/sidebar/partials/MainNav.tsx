"use client"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { NavItemType } from "@/types"
import { Link } from "@inertiajs/react"

export default function MainNav({
    items,
}: {
    items: NavItemType[]
}) {
    return (
        <SidebarMenu>
            {items.map((item: NavItemType, index: number) => (
                <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                        asChild
                        isActive={route().current(item.route) && !('g' in route().params)}
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
    )
}
