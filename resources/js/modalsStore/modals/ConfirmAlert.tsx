import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/Components/ui/alert-dialog"
import { IconTypes, getIcon } from "@/lib/infoIcons"

export type ConfirmAlertProps = {
    onClose: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
    type?: IconTypes;
}

export default function ConfirmAlert({ onClose, title, description, onConfirm, type }: ConfirmAlertProps) {
    const alertIconData = getIcon(type)

    return (
        <AlertDialog open={true} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader className="sm:text-center">
                    {alertIconData}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:flex-col-reverse sm:justify-normal sm:space-x-0">
                    <AlertDialogCancel className="sm:mt-2">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}