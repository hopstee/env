import {
    ChevronsUpDownIcon,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    SettingsIcon,
    User,
    UserIcon,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Link, usePage } from "@inertiajs/react";

const getInitials = (name: string) => {
    const dividedName = name.split(' ')
    const firstLetter = dividedName[0]?.slice(0, 1)?.toUpperCase() || ''
    const secondLetter = dividedName[1]?.slice(0, 1)?.toUpperCase() || ''

    return firstLetter + secondLetter
}

export default function ProfileMenu() {
    const user = usePage().props.auth.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    {/* <AvatarImage></AvatarImage> */}
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                side="bottom"
                align="end"
            >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={route('profile.edit')}>
                        <DropdownMenuItem>
                            <User />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <CreditCard />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users />
                        <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UserPlus />
                        <span>Invite users</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Plus />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                    <LifeBuoy />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Cloud />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={route('logout')} method="post" className="w-full">
                    <DropdownMenuItem>
                        <LogOut />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
