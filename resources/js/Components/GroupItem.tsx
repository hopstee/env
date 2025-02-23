import { cn } from "@/lib/utils"

export default function GroupItem(
    {
        name,
        color,
    }: {
        name: string,
        color: string,
    }
) {
    return [
        <div className="w-4 h-4 p-1">
            <div
                className={cn(
                    "w-2 h-2 rounded-full",
                    `bg-${color}`
                )}
            ></div>
        </div>,
        <span>{name}</span>
    ]
}