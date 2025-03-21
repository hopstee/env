import { Button } from "@/Components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import CopyTooltip from "@/Components/ui/copy-tooltip";
import { Badge } from "@/Components/ui/badge";

type HiddenValueProps = {
    value: string;
}

export default function HiddenValue({ value }: HiddenValueProps) {
    const [showValue, setShowValue] = useState(false);

    const maskedValue = '•'.repeat(value.length).slice(0, 10);

    return (
        <div className="flex items-center w-[200px]">
            <Button
                variant="ghost"
                size="sm-icon"
                onClick={() => setShowValue(prevState => !prevState)}
                className="mr-2 min-w-9"
            >
                {showValue
                    ? <EyeOffIcon className="size-4" />
                    : <EyeIcon className="size-4" />
                }
            </Button>
            {showValue
                ? (
                    <CopyTooltip
                        trigger={
                            <Badge variant="secondary" className="max-w-[200px] block">
                                {value}
                            </Badge>
                        }
                        valueToCopy={value}
                    />
                ) : (
                    <div className="">{maskedValue}</div>
                )
            }
        </div>
    )
}