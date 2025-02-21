import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Loader2Icon, TrashIcon } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <>
            <Dialog open={confirmingUserDeletion} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and
                            data will be permanently deleted. Please enter your
                            password to confirm you would like to permanently delete
                            your account.
                        </DialogDescription>
                    </DialogHeader>

                    <div>
                        <Label
                            htmlFor="password"
                            className={cn(
                                "sr-only",
                                errors.password && "text-destructive"
                            )}
                        >
                            Confirm Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full"
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose>
                            <Button
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            variant="destructive"
                            disabled={processing}
                            onClick={deleteUser}
                        >
                            {processing && <Loader2Icon className="animate-spin" />}
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>

                    <CardDescription>
                        Once your account is deleted, all of its resources and data
                        will be permanently deleted. Before deleting your account,
                        please download any data or information that you wish to
                        retain.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button
                        variant='destructive'
                        onClick={confirmUserDeletion}
                    >
                        <TrashIcon />
                        Delete Account
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}
