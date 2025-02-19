import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ConfirmProvider } from "./ConfirmAlertProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <ConfirmProvider>
                {children}
            </ConfirmProvider>
        </ThemeProvider>
    )
}