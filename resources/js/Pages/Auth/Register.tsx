import InputError from '@/Components/InputError';
import { CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <CardHeader>
                <CardTitle>Welcome! Create your account 🚀</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit}>
                    <div>
                        <Label
                            htmlFor="name"
                            className={cn(errors.name && "text-red-600")}
                        >
                            Name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
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
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
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
                            required
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
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-muted-foreground hover:text-foreground underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>

                        <Button className="ms-4" disabled={processing}>
                            {processing && <Loader2Icon className="animate-spin" />}
                            Register
                        </Button>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
