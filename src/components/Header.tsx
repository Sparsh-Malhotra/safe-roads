import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  GraduationCap,
  MapIcon,
  Menu,
  UserCircle2,
  X,
} from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const {name,email} = JSON.parse(localStorage.getItem("user_data")) || {};

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 h-16 z-20 glass-morphism flex items-center justify-between px-4 sm:px-6",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <MapIcon className="h-5 w-5 text-primary" strokeWidth={2.5} />
        <h1 className="text-lg font-semibold tracking-tight">Safe Roads</h1>
      </div>

      <Menu
        className="h-5 w-5 text-primary strokeWidth={2.5} cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerContent className="p-4">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="bg-white w-full">
            <div className="flex items-center gap-4 p-4 border-b">
              <UserCircle2 className="w-12 h-12 text-gray-400 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Hi, {name || "-"}
                </p>
                <p className="text-xs text-gray-500">{email || "-"}</p>
              </div>
            </div>

            <ul className="py-3.5 mt-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:text-purple-700 hover:bg-purple-100 text-gray-700"
                >
                  <GraduationCap className="w-5 h-5" />
                  User Learning Module
                </a>
              </li>
              <li>
                <a
                  href="/reports"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                >
                  <AlertCircle className="w-5 h-5" />
                  View Issue Report
                </a>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
