import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import CommonSettings from "@/Components/settings/Common";
import ApiKeysSettings from "@/Components/settings/ApiKeys";
import NotificationsSettings from "@/Components/settings/Notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { ApiKeysType, NotificationSettingsType, SettingsType } from "@/types";

export type SettingsModalProps = {
    onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Settings</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-3">
                        <SettingTabs />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>

                <SettingTabs />
            </DialogContent>
        </Dialog>
    )
};

export default SettingsModal;

function SettingTabs() {
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
    const [refreshNotifications, setRefreshNotifications] = useState(false);

    const updateNotificationSettings = (settings: NotificationSettingsType) => {
        setSettings((prevState) => {
            console.log({ ...prevState, notifications: settings });
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
        const fetchApiKeys = async () => {
            try {
                setLoadingSettings(true);
                const response = await fetch(route('settings.users-settings'));
                const data = await response.json();

                if (data.success) {
                    setSettings(data.data);
                }
            } catch (error) {
                console.error("Ошибка загрузки API-ключей:", error);
            } finally {
                setLoadingSettings(false);
            }
        };
        fetchApiKeys();
    }, [refreshNotifications]);

    return (
        <Tabs
            defaultValue="common"
            orientation={isMobile ? "horizontal" : "vertical"}
            className="flex flex-col md:flex-row gap-4 flex-1 h-full"
        >
            <TabsList
                className="w-full md:w-1/3 flex md:flex-col flex-wrap md:h-full"
            >
                <TabsTrigger value="common">Common</TabsTrigger>
                <TabsTrigger value="api-keys">Api Keys</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-80 md:w-2/3 p-1">
                <TabsContent value="common">
                    <CommonSettings />
                </TabsContent>
                <TabsContent value="api-keys">
                    <ApiKeysSettings apiKeys={apiKeys} loading={loadingApiKeys} refreshApiKeys={() => setRefreshApiKeys(prevState => !prevState)} />
                </TabsContent>
                <TabsContent value="notifications">
                    <NotificationsSettings
                        notificationSettings={settings.notifications}
                        updateNotificationSettings={updateNotificationSettings}
                        loading={loadingSettings}
                    />
                </TabsContent>
            </ScrollArea>
        </Tabs>
    )
}