import InputError from '@/Components/InputError';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';

enum Genders {
    MALE = "male",
    FEMALE = "female",
}

const gendersList = [Genders.MALE, Genders.FEMALE];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: gendersList[0],
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
                <CardTitle>Register in Env</CardTitle>
                <CardDescription>
                    Create account in a workspace that's secure, powerfull and totally private
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit}>
                    <div>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div className="mt-2">
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="mt-2">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="mt-2">
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>

                    <RadioGroup
                        defaultValue={data.gender}
                        onValueChange={(value) => setData('gender', value as Genders)}
                        className="flex space-x-2 mt-4"
                    >
                        {gendersList.map((gender, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={gender} id={`r${index}`} />
                                <Label htmlFor={`r${index}`}>{gender}</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    <Button className="mt-4 w-full" disabled={processing}>
                        {processing && <Loader2Icon className="animate-spin" />}
                        Register
                    </Button>

                    <div className="mt-4">
                        <Link
                            href={route('login')}
                            className="text-sm text-main hover:text-main-dark font-semibold"
                        >
                            Already registered?
                        </Link>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
