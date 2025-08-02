import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { CardContent, CardDescription, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <CardHeader>
                <CardDescription>
                    This is a secure area of the application. Please confirm your
                    password before continuing.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <Button className="mt-4 w-full" disabled={processing}>
                        {processing && <Loader2Icon className="animate-spin" />}
                        Confirm
                    </Button>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
