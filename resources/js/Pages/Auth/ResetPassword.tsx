import InputError from '@/Components/InputError';
import { CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
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
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="mt-4">
                        <Input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-1"
                        />
                    </div>

                    <Button className="mt-4 w-full" disabled={processing}>
                        {processing && <Loader2Icon className='animate-spin' />}
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
