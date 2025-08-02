import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { NotificationSettingsType, SettingsType } from "@/types";
import { Separator } from "@/Components/ui/separator";
import { LoaderIcon } from "lucide-react";
import useModalStore from "@/modalsStore/useModalStore";
import { router } from "@inertiajs/react";
import { ModalTypes } from "@/constants/modals";
import { IconTypes } from "@/lib/infoIcons";

type NotificationsSettingsProps = {
    notificationSettings: NotificationSettingsType;
    loading: boolean;
    updateNotificationSettings: (settings: NotificationSettingsType) => void
}

const settingsText: { [key in keyof NotificationSettingsType]: string } = {
    add_to_group: "Notify when you are added to a group",
    add_to_team: "Notify when you are added to a team",
    remove_from_group: "Notify when you are removed from a group",
    remove_from_team: "Notify when you are removed from a team",
    role_change: "Notify when your role has been changed",
    variable_modified: "Notify when variables have been modified",
}

export default function NotificationsSettings({
    notificationSettings,
    loading,
    updateNotificationSettings,
}: NotificationsSettingsProps) {
    const { openModal } = useModalStore();

    const handleConfirmToggle = async (setting: keyof NotificationSettingsType) => {
        const updatedSettings = { ...notificationSettings, [setting]: !notificationSettings[setting] };

        try {
            router.post(route('settings.update-notifications'), {
                notifications: updatedSettings,
            }, {
                preserveScroll: true,
            });

            updateNotificationSettings(updatedSettings);
        } catch (error) {
            console.error("Error with changing notification settings:", error);
        }
    }

    const handleToggle = (setting: keyof NotificationSettingsType) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Are you sure?",
            description: notificationSettings[setting]
                ? "You will be not receive notifications on this actions"
                : "You will receive notifications on this actions",
            onConfirm: () => handleConfirmToggle(setting),
            type: notificationSettings[setting] ? IconTypes.ERROR : IconTypes.INFO,
        });
    }

    if (loading) {
        return (
            <div className="w-full flex justify-center">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {Object.keys(notificationSettings).map((setting, index) => [
                <div key={index} className="flex items-center justify-between">
                    <Label htmlFor="add-to-team">{settingsText[setting as keyof NotificationSettingsType]}</Label>
                    <Switch
                        id="add-to-team"
                        checked={notificationSettings[setting as keyof NotificationSettingsType]}
                        onCheckedChange={() => handleToggle(setting as keyof NotificationSettingsType)}
                    />
                </div>,
                index !== (Object.keys(notificationSettings).length) && <Separator />
            ])}
        </div>
    )
}