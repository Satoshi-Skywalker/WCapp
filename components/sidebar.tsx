"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Utensils,
    Pill,
    MessageSquare,
    User,
    LogOut,
    Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Food Log",
        icon: Utensils,
        href: "/food",
        color: "text-violet-500",
    },
    {
        label: "Workout Log",
        icon: Dumbbell,
        href: "/workout",
        color: "text-rose-500",
    },
    {
        label: "Medication",
        icon: Pill,
        href: "/medication",
        color: "text-emerald-500",
    },
    {
        label: "Support",
        icon: MessageSquare,
        href: "/support",
        color: "text-orange-700",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-background/50 text-foreground border-r border-border backdrop-blur-xl">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-primary font-bold">
                            WC
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">
                        WeightCare
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="space-y-1">
                    <Link
                        href="/profile"
                        className={cn(
                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                            pathname === "/profile" ? "text-primary bg-primary/10" : "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center flex-1">
                            <User className="h-5 w-5 mr-3 text-gray-500" />
                            Profile
                        </div>
                    </Link>
                    <div className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-destructive hover:bg-destructive/10 rounded-lg transition">
                        <div className="flex items-center flex-1">
                            <LogOut className="h-5 w-5 mr-3 text-destructive" />
                            Logout
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between px-3">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ModeToggle />
                </div>
            </div>
        </div>

    );
}
