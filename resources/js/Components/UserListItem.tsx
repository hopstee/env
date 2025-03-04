import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getInitials } from "@/lib/utils";

type UserListItemType = {
    name: string;
    email: string;
    avatar?: any;
}

export default function UserListItem({ name, email, avatar }: UserListItemType) {
    return (
        <div className="flex items-center gap-2">
            <Avatar>
                {avatar && (
                    <AvatarImage src={avatar} alt={`${name}'s avatar`} />
                )}
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="leading-5">{name}</span>
                <span className="text-sm text-muted-foreground">{email}</span>
            </div>
        </div>
    )
}