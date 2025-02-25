import * as React from "react"

import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react";

type ExtendedInputType = {
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
} & React.ComponentProps<"input">

const Input = React.forwardRef<HTMLInputElement, ExtendedInputType>(
    ({ className, type, startIcon, endIcon, ...props }, ref) => {
        const [showPass, setShowPass] = React.useState(false);

        return (
            <div className={cn(
                "relative w-full",
                className
            )}>
                <div className="absolute top-0 left-0 h-10 w-10 flex items-center justify-center">
                    {startIcon}
                </div>
                <input
                    type={(type === "password" && showPass) ? "text" : type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        className,
                        startIcon && "pl-10",
                        (type === "password" || endIcon) && "pr-10",
                    )}
                    ref={ref}
                    {...props}
                />

                {type === "password" ? (
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        tabIndex={-1}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {showPass
                            ? <EyeOffIcon className={cn(
                                "size-4 transition-opacity",
                                showPass ? "opacity-100 scale-100" : "opacity-0 scale-0"
                            )} />
                            : <EyeIcon className={cn(
                                "size-4 transition-all",
                                showPass ? "opacity-0 scale-0" : "opacity-100 scale-100"
                            )} />
                        }
                    </button>
                ) : (
                    <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center">
                        {endIcon}
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
