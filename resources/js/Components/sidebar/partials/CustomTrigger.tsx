import { useSidebar } from "@/Components/ui/sidebar"
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react"
import { Button } from "@/Components/ui/button"

export function CustomTrigger() {
    const { toggleSidebar, open, openMobile, isMobile } = useSidebar()

    return (
        <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"

        >
            {((!isMobile && open) || (isMobile && openMobile))
                ? <SidebarCloseIcon />
                : <SidebarOpenIcon />
            }
        </Button>
    )
}