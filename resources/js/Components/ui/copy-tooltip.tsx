import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";

export default function CopyTooltip({
    trigger,
    valueToCopy,
}: {
    trigger: ReactNode,
    valueToCopy: string,
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(valueToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // TODO: не серывать тултип при клике на тригер

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div onClick={handleCopy} className="cursor-pointer w-full">
                    {trigger}
                </div>
            </TooltipTrigger>
            <TooltipContent side="top">
                {copied ? "Copied!" : "Click to copy"}
            </TooltipContent>
        </Tooltip>
    )
}