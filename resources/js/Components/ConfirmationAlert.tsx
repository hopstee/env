import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { CheckIcon, Loader2Icon } from "lucide-react";

interface IConfirmationAlert {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    children: JSX.Element;
}

export function ConfirmationAlert(props: IConfirmationAlert) {
    const {
        title,
        description,
        onConfirm,
        onCancel,
        children,
    } = props

    return (
        <AlertDialog>
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
            {children}
        </AlertDialog>
    )
}