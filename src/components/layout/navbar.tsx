'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Menu, PenSquare, User, AtSign, Rss, Briefcase, LogOut, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { config } from '@/config';
import { ThemeToggle } from '../ThemeToggle';
import { signOut, useSession } from '@/lib/auth-client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
    { href: '/#about', label: 'About', icon: User },
    { href: '/#projects', label: 'Posts', icon: Rss },
    { href: '/#experience', label: 'Experience', icon: Briefcase },
    { href: '/#contact', label: 'Contact', icon: AtSign },
    { href: '/blog', label: 'All Posts', icon: Book },
];

function UserNav() {
    const {data} = useSession();
    if (!data) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                    <Link href="/sign-up">Sign Up</Link>
                </Button>
            </div>
        );
    }

    const user = data.user;
    const initial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image ?? undefined} alt={user.email ?? ''} />
                        <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username ?? user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections = ['about', 'projects', 'experience', 'contact'];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const id of sections) {
                const element = document.getElementById(id);
                if (element && scrollPosition >= element.offsetTop && scrollPosition <= element.offsetTop + element.offsetHeight) {
                    setActiveSection(`#${id}`);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHomePage = pathname === '/';

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-background/80 backdrop-blur-sm"
            )}
        >
            <div className="container flex h-20 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <PenSquare className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">{config.website.name}</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map(item => {
                        if (!isHomePage && item.href.startsWith('/#')) {
                            return null;
                        }
                        const isActive = isHomePage ? activeSection === item.href : pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    'transition-colors hover:text-primary',
                                    isActive ? 'text-primary' : 'text-foreground/80'
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <ThemeToggle />
                    <UserNav />
                    <div className="md:hidden">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <div className="flex flex-col space-y-4 mt-8">
                                    <Link href="/" className="mr-6 flex items-center space-x-2 mb-4" onClick={handleLinkClick}>
                                        <PenSquare className="h-6 w-6 text-primary" />
                                        <span className="font-bold">{config.website.name}</span>
                                    </Link>
                                    {navItems.map(item => {
                                        if (!isHomePage && item.href.startsWith('/#')) {
                                            return null;
                                        }
                                        const isActive = isHomePage ? activeSection === item.href : pathname === item.href;
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                className={cn(
                                                    'flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                                                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                                )}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.label}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
