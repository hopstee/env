import { COLORS, ColorKeys } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

export default function GroupItem(
    {
        name,
        color,
        compact = false,
    }: {
        name: string,
        color: ColorKeys,
        compact?: boolean,
    }
) {
    return (
        <Badge
            className={cn(
                "flex w-fit",
                `bg-${COLORS[color].default} hover:bg-${COLORS[color].default} text-${COLORS[color].foreground}`,
                compact && "px-0 h-4"
            )}
        >
            <p
                className={cn(
                    "w-full truncate",
                    compact && "opacity-0"
                )}
            >
                {name}
            </p>
        </Badge>
    )
}