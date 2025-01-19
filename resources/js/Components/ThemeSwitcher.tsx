import { Button } from "@/Components/ui/button"
import { useTheme } from "../providers/ThemeProvider"
import { MoonIcon, SunIcon } from "lucide-react"

interface Props {
    appearance?: "plain" | "outline"
}

export function ThemeSwitcher({ appearance = "plain" }: Props) {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Switch theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <SunIcon className="transition-all dark:scale-100 dark:rotate-0 scale-0 -rotate-90 h-[1.2rem] w-[1.2rem]" />
            <MoonIcon className="absolute transition-all dark:scale-0 dark:rotate-90 scale-100 rotate-0 h-[1.2rem] w-[1.2rem]" />
        </Button>
    )
}
