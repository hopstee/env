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
import { Link, router, useForm } from "@inertiajs/react" // Добавлен router
import { IProject } from "@/types"
import ProjectCreateDialog from "./ProjectCreateDialog"
import { DialogTrigger } from "@/Components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import ConfirmationAlert from "@/Components/ConfirmationAlert"
import { AlertDialogTrigger } from "@/Components/ui/alert-dialog"

export default function Projects({
    items,
    selectedTeamId,
}: {
    items: IProject[]
    selectedTeamId: string,
}) {
    const { isMobile } = useSidebar()

    const {
        data,
        setData,
        delete: destroy,
    } = useForm({
        'project_id': '',
    })

    const handleConfirmDelete = () => {
        destroy(route('project.destroy', { 'project_id': data.project_id }), {
            preserveScroll: true,
        });
    }

    const handleCancelDelete = () => {
        setData('project_id', '');
    }

    const favoriteProjects = items.filter(item => item.is_fav === true);

    // Функция handleFavToggle теперь принимает project как аргумент
    const handleFavToggle = (project: IProject) => {
        const updatedFavStatus = !project.is_fav;

        router.post(
            route('project.favToggle', { project: project.id }),
            { is_fav: updatedFavStatus }
        );
    };

    return (
        <ProjectCreateDialog>
            <ConfirmationAlert
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete project and remove it data from our servers."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            >
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <DialogTrigger asChild>
                        <SidebarGroupAction title="Add Project">
                            <Plus /> <span className="sr-only">Add Project</span>
                        </SidebarGroupAction>
                    </DialogTrigger>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {favoriteProjects.map((item: IProject) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={route().current('p.workspace', { 'team_id': selectedTeamId, 'project_id': item.id })}
                                        asChild
                                    >
                                        <Link href={route('p.workspace', { 'team_id': selectedTeamId, 'project_id': item.id })}>
                                            <span className="text-xs">{item.icon}</span>
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
                                                onClick={() => handleFavToggle(item)} // Привязка функции
                                            >
                                                <HeartOffIcon className="text-muted-foreground" />
                                                Remove from fav
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <AlertDialogTrigger
                                                asChild
                                                onClick={() => setData('project_id', item.id)}
                                            >
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-600/10">
                                                    <Trash2Icon />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </ConfirmationAlert>
        </ProjectCreateDialog>
    )
}