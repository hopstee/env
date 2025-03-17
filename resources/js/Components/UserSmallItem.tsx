import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getInitials } from "@/lib/utils";

type UserSmallItem = {
    name: string;
    avatar?: string;
}

export default function UserSmallItem({ name, avatar }: UserSmallItem) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="size-6">
                {avatar && (
                    <AvatarImage src={`/${avatar}`} alt={`${name}'s avatar`} />
                )}
                <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{name}</span>
        </div>
    )
}