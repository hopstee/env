import InputError from '@/Components/InputError';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit}>
                    <div>
                        <Label
                            htmlFor="email"
                            className={cn(errors.email && "text-red-600")}
                        >
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label
                            htmlFor="password"
                            className={cn(errors.password && "text-red-600")}
                        >
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label
                            htmlFor="password_confirmation"
                            className={cn(errors.password_confirmation && "text-red-600")}
                        >
                            Confirm Password
                        </Label>

                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Button disabled={processing}>
                            {processing && <Loader2Icon className='animate-spin' />}
                            Reset Password
                        </Button>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
