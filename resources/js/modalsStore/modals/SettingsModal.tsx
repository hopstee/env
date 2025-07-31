import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/Components/ui/dialog";
import CommonSettings from "@/Components/settings/Common";
import ApiKeysSettings from "@/Components/settings/ApiKeys";
import NotificationsSettings from "@/Components/settings/Notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/Components/ui/drawer";
import { ApiKeysType, NotificationSettingsType, SettingsType } from "@/types";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/Components/ui/sidebar";
import { BellIcon, KeyRoundIcon, Settings2Icon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/Components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { cn } from "@/lib/utils";

export type SettingsModalProps = {
    onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent className="overflow-hidden p-0 max-h-[500px]">
                    <DrawerTitle className="sr-only">Settings</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        Customize your settings here.
                    </DrawerDescription>

                    <div className="p-3">
                        <SettingsContent />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden p-0 max-w-3xl md:max-h-[500px]">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>

                <SettingsContent />
            </DialogContent>
        </Dialog>
    )
};

export default SettingsModal;

enum SectionsEnum {
    COMMON = 'common',
    API_KEYS = 'api_keys',
    NOTIFICATIONS = 'notifications',
};

const sections = [
    {
        key: SectionsEnum.COMMON,
        icon: Settings2Icon,
    },
    {
        key: SectionsEnum.API_KEYS,
        icon: KeyRoundIcon,
    },
    {
        key: SectionsEnum.NOTIFICATIONS,
        icon: BellIcon,
    },
];

function SettingsContent() {
    const isMobile = useIsMobile();

    const [selectedSection, setSelectedSection] = useState<SectionsEnum>(SectionsEnum.COMMON);

    if (isMobile) {
        return (
            <div>
                <Select defaultValue={selectedSection} onValueChange={(section) => setSelectedSection(section as SectionsEnum)}>
                    <SelectTrigger className="w-full">
                        <SelectValue className="flex-row" />
                    </SelectTrigger>
                    <SelectContent>
                        {sections.map((section) => (
                            <SelectItem
                                key={section.key}
                                value={section.key}
                            >
                                {section.key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <SettingsBody selectedSection={selectedSection} />
            </div>
        );
    }

    return (
        <SidebarProvider className="items-start">
            <Sidebar collapsible="none" className="hidden md:flex">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sections.map((section) => (
                                    <SidebarMenuItem key={section.key}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={section.key === selectedSection}
                                            onClick={() => setSelectedSection(section.key)}
                                        >
                                            <a href="#">
                                                <section.icon />
                                                <span>{section.key}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SettingsBody selectedSection={selectedSection} />
        </SidebarProvider>
    )
}

function SettingsBody({
    selectedSection,
}: {
    selectedSection: SectionsEnum
}) {
    const isMobile = useIsMobile();

    const [apiKeys, setApiKeys] = useState<ApiKeysType[]>([]);
    const [loadingApiKeys, setLoadingApiKeys] = useState(true);

    const [settings, setSettings] = useState<SettingsType>({
        language: 'english',
        notifications: {
            add_to_group: true,
            add_to_team: true,
            remove_from_group: true,
            remove_from_team: true,
            role_change: true,
            variable_modified: true,
        }
    });
    const [loadingSettings, setLoadingSettings] = useState(true);

    const [refreshApiKeys, setRefreshApiKeys] = useState(false);

    const updateNotificationSettings = (settings: NotificationSettingsType) => {
        setSettings((prevState) => {
            return { ...prevState, notifications: settings };
        });
    }

    useEffect(() => {
        const fetchApiKeys = async () => {
            try {
                setLoadingApiKeys(true);
                const response = await fetch(route('api-keys.users-api-keys'));
                const data = await response.json();

                if (data.success) {
                    setApiKeys(data.data);
                }
            } catch (error) {
                console.error("Ошибка загрузки API-ключей:", error);
            } finally {
                setLoadingApiKeys(false);
            }
        };
        fetchApiKeys();
    }, [refreshApiKeys]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoadingSettings(true);
                const response = await fetch(route('settings.users-settings'));
                const data = await response.json();

                if (data.success) {
                    setSettings(data.data);
                }
            } catch (error) {
                console.error("Ошибка загрузки настроек:", error);
            } finally {
                setLoadingSettings(false);
            }
        };
        fetchSettings();
    }, []);

    let section = <CommonSettings />
    switch (selectedSection) {
        case SectionsEnum.API_KEYS:
            section = <ApiKeysSettings
                apiKeys={apiKeys}
                loading={loadingApiKeys}
                refreshApiKeys={() => setRefreshApiKeys(prevState => !prevState)}
            />
            break;

        case SectionsEnum.NOTIFICATIONS:
            section = <NotificationsSettings
                notificationSettings={settings.notifications}
                updateNotificationSettings={updateNotificationSettings}
                loading={loadingSettings}
            />
            break;
    }

    return (
        <main className="flex h-[436px] md:h-[500px] flex-1 flex-col overflow-hidden">
            <header className={cn(
                "flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b",
                "group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
                isMobile && "h-4"
            )}>
                <div className="flex items-center gap-2 px-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink>{selectedSection}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto max-md:py-4 max-md:px-2 md:p-4">
                {section}
            </div>
        </main>
    );
}