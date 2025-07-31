import { Theme, useTheme } from "@/providers/ThemeProvider";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";

export default function CommonSettings() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="space-y-4">
            <div className="flex flex-row items-center justify-between">
                <Label className="block text-sm font-medium">Theme</Label>
                <Select
                    defaultValue={theme}
                    onValueChange={(theme: Theme) => setTheme(theme)}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Separator />
            <div className="flex flex-row items-center justify-between">
                <Label className="block text-sm font-medium">Languare</Label>
                <Select
                    defaultValue="russian"
                    // onValueChange={(theme: Theme) => setTheme(theme)}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                        <SelectItem value="russian">Russian</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}