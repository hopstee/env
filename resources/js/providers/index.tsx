import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}