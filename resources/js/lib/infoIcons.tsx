import { AlertTriangleIcon, BadgeInfoIcon, CheckCircle2Icon, XOctagonIcon } from "lucide-react";
import { cn } from "./utils";

enum IconTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

function getIcon(type: IconTypes = IconTypes.INFO) {
    const props = getProps(type)

    return (
        <div className={cn("relative rounded-xl p-3 w-fit mx-auto", props.bgColor)}>
            <div className={cn("absolute size-10 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10", props.bgColor)}></div>
            <props.icon className={props.iconColor} />
        </div>
    )
}

function getProps(type: IconTypes) {
    let iconProps = {
        icon: BadgeInfoIcon,
        bgColor: "bg-muted",
        iconColor: "text-muted-foreground",
    }
    
    switch (type) {
        case IconTypes.SUCCESS:
            iconProps.icon = CheckCircle2Icon;
            iconProps.bgColor = "bg-green-600/10";
            iconProps.iconColor = "text-green-600";
            break;
    
        case IconTypes.WARNING:
            iconProps.icon = AlertTriangleIcon;
            iconProps.bgColor = "bg-amber-500/20";
            iconProps.iconColor = "text-amber-500";
            break;
    
        case IconTypes.ERROR:
            iconProps.icon = XOctagonIcon;
            iconProps.bgColor = "bg-red-600/10";
            iconProps.iconColor = "text-red-600";
            break;
    
        default:
            break;
    }

    return iconProps
}

export {
    IconTypes,
    getIcon,
}