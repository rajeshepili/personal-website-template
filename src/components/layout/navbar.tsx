'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Home, Menu, PenSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: Book },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold font-headline sm:inline-block">JD</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map(item => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'transition-colors hover:text-primary',
                                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
                                    <PenSquare className="h-6 w-6 text-primary" />
                                    <span className="font-bold font-headline">PersonaPulse</span>
                                </Link>
                                {navItems.map(item => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                                            pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
