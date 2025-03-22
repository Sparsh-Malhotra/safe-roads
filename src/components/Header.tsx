import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    FileBarChart,
    MapIcon,
    Menu,
    User2,
    ChevronRight,
    LogOut,
    Coins,
} from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import logo from "../assets/safe-roads.png";

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [open, setOpen] = useState(false);
    const { name, email } = JSON.parse(
        localStorage.getItem("user_data") || "{}"
    );
    const coins = localStorage.getItem("coins");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("tenant_data");
        localStorage.removeItem("coins");

        setOpen(false);

        toast.success("Logged out successfully");

        navigate("/");
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 h-16 z-20 glass-morphism flex items-center justify-between px-4 sm:px-6",
                className
            )}
        >
            <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate("/home")}
            >
                <div>
                    <img src={logo} className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-lg font-semibold tracking-tight">
                    Safe Roads
                </h1>
            </div>

            <button
                className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
            >
                <Menu className="h-4 w-4" />
            </button>

            <Drawer direction="right" open={open} onOpenChange={setOpen}>
                <DrawerContent className="p-0 max-w-xs">
                    {/* Profile header */}
                    <div className="relative">
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary h-32 z-0"></div>

                        {/* Profile info */}
                        <div className="pt-4 px-6 pb-5 relative z-10">
                            <div className="mt-3 flex items-start">
                                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-white shadow-md border-2 border-white overflow-hidden">
                                    <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                                        <User2 className="h-8 w-8 text-primary/60" />
                                    </div>
                                </div>

                                <div className="ml-4 pt-2">
                                    <p className="text-white font-semibold">
                                        {name || "Welcome"}
                                    </p>
                                    <p className="text-white/80 text-sm mt-0.5">
                                        {email || "User"}
                                    </p>

                                    <div
                                        className="flex items-center gap-1.5 mt-2 bg-white/20 rounded-full px-3 py-1 cursor-pointer hover:bg-white/30 transition-colors"
                                        onClick={() => {
                                            navigate("/incentive");
                                            setOpen(false);
                                        }}
                                    >
                                        <Coins className="h-3.5 w-3.5 text-yellow-300" />
                                        <span className="text-white text-sm font-medium">
                                            {coins} coins
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                        <div className="px-4 py-2">
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                                Menu
                            </span>
                        </div>

                        <nav>
                            <a
                                href="/home"
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <MapIcon className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        Map View
                                    </span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </a>

                            <a
                                href="/reports"
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                        <FileBarChart className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        Issue Reports
                                    </span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </a>

                            <a
                                href="/learn"
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                        <BookOpen className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        Learning Module
                                    </span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </a>
                        </nav>
                    </div>

                    <div className="mt-4 border-t border-gray-100">
                        <div className="px-4 py-2">
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                                Settings
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                            <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                <LogOut className="h-4 w-4" />
                            </div>
                            <span className="font-medium ml-3">Logout</span>
                        </button>
                    </div>

                    <div className="px-4 py-6 text-center text-gray-500 text-xs border-t border-gray-100 mt-auto">
                        <p>Safe Roads App &copy; 2025</p>
                        <p className="mt-1">Version 1.0.0</p>
                    </div>
                </DrawerContent>
            </Drawer>
        </header>
    );
};

export default Header;
