import { Button } from "@/Components/ui/button";
import { ModalTypes } from "@/constants/modals";
import { EnvModalProps } from "@/modalsStore/modals/EnvModal";
import useModalStore from "@/modalsStore/useModalStore";
import { PlusIcon } from "lucide-react";

export default function Empty() {
    const { openModal } = useModalStore()

    const handleOpenEnvModal = () => {
        openModal(ModalTypes.ENV_MODAL, {
            title: "Create Env",
        })
    }

    return (
        <div className="flex flex-col items-center space-y-3">
            <h1 className="text-3xl font-bold">No envs</h1>
            <p>You can create one by clicking on the button below</p>
            <Button
                variant="secondary"
                onClick={handleOpenEnvModal}
            >
                <PlusIcon />
                Create
            </Button>
        </div>
    );
}