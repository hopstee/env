import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/Components/ui/alert-dialog";
import { IconTypes, getIcon } from "@/lib/infoIcons";
import { cn } from "@/lib/utils";
import { ReactNode, createContext, useContext, useState } from 'react';

type ConfirmProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    type?: IconTypes;
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
        type: IconTypes.INFO
    });

    const openConfirm = (props: ConfirmProps) => {
        setConfirmProps({
            title: props.title,
            description: props.description,
            onConfirm: props.onConfirm || (() => { }),
            onCancel: props.onCancel || (() => { }),
            type: props.type || IconTypes.INFO
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
                type={confirmProps.type}
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

function ConfirmAlert({ isOpen, onClose, title, description, onConfirm, onCancel, type }: ConfirmAlertProps) {
    const alertIconData = getIcon(type)

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader className="sm:text-center">
                    {alertIconData}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:flex-col-reverse sm:justify-normal sm:space-x-0">
                    <AlertDialogCancel className="sm:mt-2" onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}