"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import UserInfo from "./UserInfo";
import { Session } from "next-auth";

interface SidebarFooterProps {
  open: boolean;
  session?: Session;
}

export default function SidebarFooter({ open, session }: SidebarFooterProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth" });
  };

  return (
    <div className="p-2 border-t border-[#232323]">
      {session && <UserInfo open={open} session={session} />}
      <button
        onClick={handleLogout}
        className={`w-full flex items-center space-x-3 p-3 mt-3 text-gray-300 hover:bg-[#303030] hover:text-white rounded-lg transition-colors cursor-pointer ${
          !open && "justify-center"
        }`}
        title={!open ? "Logout" : undefined}
      >
        <LogOut className="w-5 h-5 flex-shrink-0" />
        {open && <span>Logout</span>}
      </button>
    </div>
  );
}
