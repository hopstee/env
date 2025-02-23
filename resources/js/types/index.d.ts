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

export type GroupType = {
    id: string;
    name: string;
    color: string;
    is_favorite: boolean;
}

export type EnvType = {
    id: string;
    name: string;
}

export type EvironmentVariableType = {
    id: number;
    key: string;
    value: string;
    is_active: boolean;
    group_id: string;
    group_name: string;
    group_color: string;
    can_read: boolean;
    can_write: boolean;
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
    groups: GroupType[];
    favoriteGroups: GroupType[];
    envs: EnvType[];
    roles: RolesType;
    invitation: InvitationType;
    selectedGroupIds: string[];
};
