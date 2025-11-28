import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, PenSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { headers } from "next/headers";

async function UserNav() {
    const session = await auth.api.getSession({
        headers: new Headers(),
    })
    const user = session?.user;

    if (!user) {
        return null;
    }

    const initial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-left h-auto p-2">
                    <Avatar className="size-8">
                        <AvatarImage src={user.image ?? undefined} alt={user.email ?? ''} />
                        <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.username ?? user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                    <form action={async () => {
                        'use server';
                        await auth.api.signOut({
                            headers: new Headers(),
                        });
                        redirect('/');
                    }}>
                        <button type="submit" className="w-full text-left">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/sign-in');
    }

    return (
        <SidebarProvider>
            <Sidebar side="left" variant="sidebar" collapsible="icon">
                <SidebarHeader>
                    <Button variant="ghost" asChild className="h-auto p-2 justify-start">
                        <Link href="/" className="flex items-center gap-3">
                            <PenSquare className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg">{config.website.name}</span>
                        </Link>
                    </Button>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Dashboard">
                                <LayoutDashboard />
                                Dashboard
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Posts">
                                <PenSquare />
                                Posts
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <UserNav />
                </SidebarFooter>
            </Sidebar>
            <SidebarInset className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <SidebarTrigger className="md:hidden" />
                    <div className="md:hidden">
                        <UserNav />
                    </div>
                </div>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}