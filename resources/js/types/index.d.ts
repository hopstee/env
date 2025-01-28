import { LucideIcon } from "lucide-react"

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface ITeam {
    id: string;
    name: string;
    icon: string;
    type: string;
}

export interface INavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    route: string;
}

export interface IProject {
    id: string;
    name: string;
    icon: string;
    is_fav: boolean;
}

export interface IProjectData {
    id: string;
    name: string;
    icon: string;
    created_at: Date;
    users_count: number;
    users: IUser[];
    is_fav: boolean;
}

export interface IBreadcrumb {
    name: string;
    url?: string;
}

export interface IEnv {
    id: string;
    name: string;
}

export interface IEnvField {
    id: number;
    env_key: string;
    env_value: string;
    is_available: boolean;
    is_archived: boolean;
    is_new?: boolean;
    error?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    selectedTeamId: string;
    teams: ITeam[];
    projects: IProject[];
    breadcrumbs: IBreadcrumb[];
    envs: IEnv[];
};
