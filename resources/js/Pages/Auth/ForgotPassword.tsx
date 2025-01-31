import InputError from '@/Components/InputError';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <CardHeader>
                <CardDescription>
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that will
                    allow you to choose a new one.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <form onSubmit={submit}>
                    <Label
                        htmlFor="email"
                        className={cn(errors.email && "text-red-600")}
                    >
                        Email
                    </Label>

                    <Input
                        id="email"
                        placeholder="test@test.com"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="mt-4 flex items-center justify-end">
                        <Button disabled={processing}>
                            {processing && <Loader2Icon className='animate-spin' />}
                            Email Password Reset Link
                        </Button>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
