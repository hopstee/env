import { LucideIcon } from "lucide-react"

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type TeamType = {
    id: string;
    name: string;
    icon: string;
    type: string;
}

export type NavItemType = {
    title: string;
    url: string;
    icon: LucideIcon;
    route: string;
}

export type ProjectType = {
    id: string;
    name: string;
    icon: string;
    is_fav: boolean;
    is_archived: boolean;
}

export type ProjectDataType = {
    id: string;
    name: string;
    icon: string;
    created_at: Date;
    users_count: number;
    users: User[];
    is_fav: boolean;
    is_archived: boolean;
}

export type BreadcrumbType = {
    name: string;
    url?: string;
}

export type EnvType = {
    id: string;
    name: string;
}

export type EnvFieldType = {
    id: number;
    env_key: string;
    env_value: string;
    is_available: boolean;
    is_archived: boolean;
    is_new?: boolean;
    error?: string;
}

type RoleType = {
    id: number;
    name: string;
    value: string;
}

export type RolesType = {
    'team': RoleType[];
    'project': RoleType[];
    'env': RoleType[];
}

export type InvitationType = {
    token: string;
    role_id: number;
    accessable: {
        name: string;
    }
}

export type MembersDataType = {
    id: number;
    accessable_id: string;
    accessable_type: string;
    created_at: string;
    role_id: number;
    updated_at: string;
    user: User;
    user_id: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    selectedTeamId: string;
    teams: TeamType[];
    projects: ProjectType[];
    breadcrumbs: BreadcrumbType[];
    envs: EnvType[];
    roles: RolesType;
    invitation: InvitationType;
};
