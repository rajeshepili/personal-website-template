'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const formSchema = z.object({
    login: z.string().min(1, { message: 'Email or username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
});

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);
        try {
            let session;
            if (isEmail(values.login)) {
                const result = await authClient.signIn.email({
                    email: values.login,
                    password: values.password,
                });
                session = result.data;
            } else {
                const result = await authClient.signIn.username({
                    username: values.login,
                    password: values.password,
                });
                session = result.data;
            }

            if (session) {
                router.push('/dashboard');
            } else {
                setError('Invalid login credentials. Please try again.');
            }
        } catch (e) {
            setError('An unexpected error occurred.');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="login"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email or Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name@example.com or your_username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-6 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="font-medium text-primary hover:underline">
                                Sign Up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
