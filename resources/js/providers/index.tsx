import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ConfirmProvider } from "./ConfirmAlertProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </ThemeProvider>
    )
}