import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { useRemember } from "@inertiajs/react";
import { CheckIcon, Loader2Icon } from "lucide-react";

interface IConfirmationAlert {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    children: JSX.Element;
}

export default function ConfirmationAlert(props: IConfirmationAlert) {
    const {
        title,
        description,
        onConfirm,
        onCancel,
        children,
    } = props

    const [isOpen, setIsOpen] = useRemember(false)

    const handleCancelAlert = () => {
        if (onCancel) onCancel()
        setIsOpen(false)
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancelAlert}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            {children}
        </AlertDialog>
    )
}