import { COLORS, ColorKeys } from "@/constants/colors"
import { cn } from "@/lib/utils"

export default function GroupItem(
    {
        name,
        color,
    }: {
        name: string,
        color: ColorKeys,
    }
) {
    return [
        <div className="w-4 h-4 p-1">
            <div
                className={cn(
                    "w-2 h-2 rounded-full",
                    `bg-${COLORS[color].default}`
                )}
            ></div>
        </div>,
        <span>{name}</span>
    ]
}