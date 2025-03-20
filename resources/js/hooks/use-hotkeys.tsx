import { ModalTypes } from "@/constants/modals";
import useModalStore from "@/modalsStore/useModalStore";
import { useEffect } from "react";

const isMac = navigator.platform.toUpperCase().includes("MAC");

export function useGlobalHotkeys() {
    const { openModal } = useModalStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const cmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

            if (cmdOrCtrl && event.shiftKey) {
                switch (event.key.toLowerCase()) {
                    case "k":
                        event.preventDefault();
                        openModal(ModalTypes.TEAM_MODAL);
                        break;
                    case "g":
                        event.preventDefault();
                        openModal(ModalTypes.GROUP_MODAL);
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
}
