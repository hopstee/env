import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { ReactNode, createContext, useContext, useState } from 'react';

type ConfirmProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

type ConfirmAlertProps = ConfirmProps & {
    isOpen: boolean;
    onClose: () => void;
}

type ConfirmContextType = {
    openConfirm: (props: ConfirmProps) => void;
    closeConfirm: () => void;
};

const ConfirmContext = createContext<ConfirmContextType>({
    openConfirm: () => { },
    closeConfirm: () => { },
});

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmProps, setConfirmProps] = useState({
        title: '',
        description: '',
        onConfirm: () => { },
        onCancel: () => { },
    });

    const openConfirm = (props: ConfirmProps) => {
        setConfirmProps({
            title: props.title,
            description: props.description,
            onConfirm: props.onConfirm || (() => { }),
            onCancel: props.onCancel || (() => { }),
        });
        setIsOpen(true);
    };

    const closeConfirm = () => {
        setIsOpen(false);
    };

    return (
        <ConfirmContext.Provider value={{ openConfirm, closeConfirm }}>
            {children}
            <ConfirmAlert
                isOpen={isOpen}
                onClose={closeConfirm}
                title={confirmProps.title}
                description={confirmProps.description}
                onConfirm={() => {
                    confirmProps.onConfirm();
                    closeConfirm();
                }}
                onCancel={() => {
                    confirmProps.onCancel();
                    closeConfirm();
                }}
            />
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => useContext(ConfirmContext);

function ConfirmAlert({ isOpen, onClose, title, description, onConfirm, onCancel }: ConfirmAlertProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}