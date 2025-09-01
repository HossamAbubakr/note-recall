"use client";

import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, FileText } from "lucide-react";
import { useCallback, useMemo } from "react";
import ChatList from "./ChatList";

interface SidebarContentProps {
  open: boolean;
}

export default function SidebarContent({ open }: SidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNotesClick = useCallback(() => {
    router.push("/notes");
  }, [router]);

  const handleNewChatClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const navigationButtons = useMemo(
    () => (
      <div className="p-2 space-y-2">
        <button
          onClick={handleNotesClick}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
            pathname.startsWith("/notes")
              ? "bg-[#303030] text-white"
              : "text-gray-300 hover:bg-[#303030] hover:text-white"
          }`}
          title={!open ? "Notes" : undefined}
        >
          <FileText className="w-5 h-5 flex-shrink-0" />
          {open && <span>Notes</span>}
        </button>

        <button
          onClick={handleNewChatClick}
          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer text-gray-300 hover:bg-[#303030] hover:text-white"
          title={!open ? "New Chat" : undefined}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          {open && <span>New Chat</span>}
        </button>
      </div>
    ),
    [open, pathname, handleNotesClick, handleNewChatClick]
  );

  const chatList = useMemo(() => {
    if (!open) return null;
    return (
      <div className="flex-1 overflow-hidden">
        <ChatList key="chat-list-persistent" />
      </div>
    );
  }, [open]);

  return (
    <div className="flex-1 flex flex-col">
      {navigationButtons}
      {chatList}
    </div>
  );
}
