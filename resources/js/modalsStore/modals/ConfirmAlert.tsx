import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/Components/ui/alert-dialog"
import { Button } from "@/Components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconTypes, getIcon } from "@/lib/infoIcons"

export type ConfirmAlertProps = {
    onClose: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
    type?: IconTypes;
}

export default function ConfirmAlert(props: ConfirmAlertProps) {
    const { onClose, title, description, onConfirm, type } = props;

    const alertIconData = getIcon(type)

    const isMobile = useIsMobile()

    const handleCancel = () => {
        onClose();
    }

    const handleConfirm = () => {
        onConfirm();
        onClose();
    }

    if (isMobile) {
        return (
            <Drawer open={true} onOpenChange={onClose}>
                <DrawerContent>
                    <DrawerHeader className="sm:text-center">
                        {alertIconData}
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter className="sm:flex-col-reverse sm:justify-normal sm:space-x-0">
                        <Button onClick={handleCancel} className="sm:mt-2" variant="outline">Cancel</Button>
                        <Button onClick={handleConfirm}>Continue</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

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