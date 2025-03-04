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
                `bg-${COLORS[color].default} hover:bg-${COLORS[color].default} text-${COLORS[color].foreground}`,
                compact && "px-0 h-4"
            )}
        >
            <span
                className={cn(
                    compact && "opacity-0"
                )}
            >
                {name}
            </span>
        </Badge>
    )

    // return (
    //     <div className="flex items-center gap-2">
    //         <div className="w-4 h-4 p-1">
    //             <div
    //                 className={cn(
    //                     "w-2 h-2 rounded-full",
    //                     `bg-${COLORS[color].default}`
    //                 )}
    //             ></div>
    //         </div>
    //         <span>{name}</span>
    //     </div>
    // )
}