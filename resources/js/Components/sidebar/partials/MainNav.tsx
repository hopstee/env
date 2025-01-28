"use client"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { INavItem } from "@/types"
import { Link } from "@inertiajs/react"

export default function MainNav({
    items,
}: {
    items: INavItem[]
}) {
    return (
        <SidebarMenu>
            {items.map((item: INavItem, index: number) => (
                <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild isActive={route().current(item.route)}>
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
