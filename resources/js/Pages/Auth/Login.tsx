import InputError from '@/Components/InputError';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type FormData = {
    email: string;
    password: string;
    remember: boolean;
}

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <CardHeader>
                <CardTitle>Login to Env</CardTitle>
                <CardDescription>
                    Welcome to a workspace that's secure, powerfull and totally private
                </CardDescription>
            </CardHeader>

            <CardContent>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <form onSubmit={submit}>
                    <div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="mt-2">
                        <Input
                            id="password"
                            type={"password"}
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked: boolean) =>
                                    setData('remember', checked)
                                }
                            />
                            <span className="ms-2 text-sm text-muted-foreground">
                                Remember me
                            </span>
                        </label>
                    </div>


                    <Button className="mt-4 w-full" disabled={processing}>
                        {processing && <Loader2Icon className="animate-spin" />}
                        Log in
                    </Button>


                    <div className="mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-main hover:text-main-dark font-semibold"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className='mt-2 text-sm'>
                        Don't have an account?
                        <Link
                            href={route('register')}
                            className="ml-2 text-main hover:text-main-dark font-semibold"
                        >
                            Sign Up
                        </Link>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
