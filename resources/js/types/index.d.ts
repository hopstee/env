import { ColorKeys } from "@/constants/colors";
import { LucideIcon } from "lucide-react"

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin: boolean;
    gender: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
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

export type GroupUserType = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    can_read: boolean;
    can_write: boolean;
}

export type GroupType = {
    id: string;
    name: string;
    color: ColorKeys;
    is_favorite: boolean;
    link: string;
    editable: boolean;
    users?: GroupUserType[];
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
    group_color: ColorKeys;
    can_read: boolean;
    can_write: boolean;
    updated_at: string;
}

export type RoleType = {
    id: number;
    name: string;
    value: string;
}

export type InvitationsDataType = {
    id: number;
    email: string;
    status: string;
    team_id: string;
    token: string;
    invited_by: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        updated_at: string;
        created_at: string;
    }
    role_id: number;
    role: {
        id: number
        name: string;
        value: string;
        updated_at: string;
        created_at: string;
    }
    expires_at: string;
    updated_at: string;
    created_at: string;
}

export type MembersDataType = {
    is_owner: boolean;
    is_admin: boolean;
    role_id: number;
    role_name: string;
    team_owner_id: number;
    user_email: string;
    user_id: number;
    user_name: string;
    user_avatar?: string;
    created_at: string;
    pivot: {
        created_at: string;
        team_id: string;
        user_id: number;
        role_id: number;
    }
}

export type EvironmentVariableFiltersType = {
    g: string;
    page: number;
    perPage: number;
    query: string;
    sortType: string;
}

export type VariablesPaginatedDataType = {
    current_page: number;
    data: EvironmentVariableType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    per_page_options: {
        label: number;
        link: string;
    }[];
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type ApiKeyUserType = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    link: string;
}

export type ApiKeysType = {
    id: number;
    user: ApiKeyUserType;
    api_key: string;
    team_id: string;
    is_active: boolean;
    expires_at: string;
    created_at: string;
    updated_at: string;
}

export type ApiKeysPaginatedDataType = {
    current_page: number;
    data: ApiKeysType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    per_page_options: {
        label: number;
        link: string;
    }[];
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type ApiKeyFiltersType = {
    u: number;
    page: number;
    perPage: number;
}

export type NotificationSettingsType = {
    add_to_group: boolean
    add_to_team: boolean
    remove_from_group: boolean
    remove_from_team: boolean
    role_change: boolean
    variable_modified: boolean
}

export type SettingsType = {
    language: string
    notifications: NotificationSettingsType
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string;
    }
    success: string;
    selectedTeamId: string;
    teams: TeamType[];
    groups: GroupType[];
    favoriteGroups: GroupType[];
    envs: EnvType[];
    roles: RoleType[];
};
