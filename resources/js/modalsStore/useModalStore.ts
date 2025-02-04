import { ModalTypes } from '@/constants/modals';
import { create } from 'zustand';
import { ModalPropsMapping } from './modalsRegistry';

type ModalComponent<T = {}> = React.ComponentType<T>;

type ModalStore = {
    modals: Record<ModalTypes, { component: ModalComponent<any>; props: any }>;
    isOpen: Record<ModalTypes, boolean>;
    registerModal: <K extends ModalTypes>(id: K, component: ModalComponent<ModalPropsMapping[K]>) => void;
    openModal: <K extends ModalTypes>(id: K, props?: Omit<ModalPropsMapping[K], 'onClose'>) => void;
    closeModal: (id: ModalTypes) => void;
};

const useModalStore = create<ModalStore>((set) => ({
    modals: {} as Record<ModalTypes, { component: ModalComponent<any>; props: any }>,
    isOpen: {} as Record<ModalTypes, boolean>,
    registerModal: (id, component) =>
        set((state) => ({
            modals: { ...state.modals, [id]: { component, props: {} } },
        })),
    openModal: (id, props) =>
        set((state) => ({
            modals: { ...state.modals, [id]: { ...state.modals[id], props } },
            isOpen: { ...state.isOpen, [id]: true },
        })),
    closeModal: (id) =>
        set((state) => ({
            isOpen: { ...state.isOpen, [id]: false },
        })),
}));

export default useModalStore;