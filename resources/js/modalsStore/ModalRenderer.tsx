import { ModalTypes } from '@/constants/modals';
import useModalStore from './useModalStore';
import { ComponentType } from 'react';

const ModalRenderer = () => {
    const { modals, isOpen, closeModal } = useModalStore();

    return (
        <>
            {(Object.entries(modals) as [ModalTypes, { component: ComponentType<any>; props: any }][]).map(
                ([id, { component: ModalComponent, props }]) => {
                    if (!isOpen[id]) return null;
                    
                    return (
                        <ModalComponent
                            key={id}
                            {...props}
                            onClose={() => closeModal(id)}
                        />
                    );
                }
            )}
        </>
    );
};

export default ModalRenderer;