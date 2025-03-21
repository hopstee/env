import { ApiKeysType } from "@/types"
import HiddenValue from "@/Components/HiddenValue";
import { Button } from "@/Components/ui/button";
import { LoaderIcon, UnplugIcon } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/Components/ui/separator";
import { router } from "@inertiajs/react";
import useModalStore from "@/modalsStore/useModalStore";
import { ModalTypes } from "@/constants/modals";
import { IconTypes } from "@/lib/infoIcons";

type ApiKeysSettingsProps = {
    apiKeys: ApiKeysType[];
    loading: boolean;
    refreshApiKeys: () => void
}

export default function ApiKeysSettings({
    apiKeys,
    loading,
    refreshApiKeys,
}: ApiKeysSettingsProps) {
    const { openModal } = useModalStore();

    const handleConfirmDeactivate = (id: number) => {
        router.post(route('api-keys.update', { apiKey: id }), {
            is_active: false,
        }, {
            preserveScroll: true,
        });

        refreshApiKeys();
    }

    const handleDeactivate = (id: number) => {
        openModal(ModalTypes.CONFIRM_ALERT, {
            title: "Are you sure?",
            description: "This action cannot be undone. This will permanently delete variable and remove it data from our servers.",
            onConfirm: () => handleConfirmDeactivate(id),
            type: IconTypes.ERROR
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
            {apiKeys.length === 0 && (
                <p className="text-muted-foreground">You have no api keys. Ask admin to generate it for you.</p>
            )}
            {apiKeys.map((apiKey: ApiKeysType, index: number) => {
                const expiration = apiKey.expires_at
                    ? "Expires at " + format(apiKey.expires_at, 'dd-MM-yyyy')
                    : <span className="text-muted-foreground">Without expiration</span>;

                return (
                    <div key={index}>
                        <div className="flex items-center justify-between">
                            <div>
                                <HiddenValue value={apiKey.api_key} />
                            </div>

                            {apiKey.is_active ? (
                                <Button
                                    size="sm"
                                    variant="soft-error-ghost"
                                    onClick={() => handleDeactivate(apiKey.id)}
                                >
                                    <UnplugIcon />
                                    Revoke
                                </Button>
                            ) : (
                                <p className="text-xs font-bold text-muted-foreground px-3">Inactive</p>
                            )}
                        </div>

                        <div className="text-xs text-right px-3">
                            {expiration}
                        </div>
                        {(index + 1) !== apiKeys.length && (
                            <Separator className="mt-4" />
                        )}
                    </div>
                )
            })}
        </div>
    );
}