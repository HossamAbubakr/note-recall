"use client";

import { Conversation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  fetchConversations,
  deleteConversation,
} from "@/actions/conversations";
import { eventManager } from "@/lib/event-manager";
import { Trash2 } from "lucide-react";
import ConfirmationModal from "../ConfirmationModal";

const CONVERSATIONS_CACHE_KEY = "chat_conversations_cache";
const CACHE_TIMESTAMP_KEY = "chat_conversations_timestamp";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function ChatList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const hasLoadedRef = useRef(false);
  const isInitializedRef = useRef(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadConversations = useCallback(async (forceRefresh = false) => {
    try {
      if (!forceRefresh && typeof window !== "undefined") {
        const cached = localStorage.getItem(CONVERSATIONS_CACHE_KEY);
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cached && timestamp) {
          const age = Date.now() - parseInt(timestamp);
          if (age < CACHE_DURATION) {
            const parsedConversations = JSON.parse(cached);
            setConversations(parsedConversations);
            hasLoadedRef.current = true;
            return;
          }
        }
      }

      setIsLoading(true);
      const data = await fetchConversations();
      setConversations(data);
      hasLoadedRef.current = true;

      if (typeof window !== "undefined") {
        localStorage.setItem(CONVERSATIONS_CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleConversationClick = useCallback(
    (conversation: Conversation) => {
      router.push(`/chat?conversation=${conversation.id}`);
    },
    [router]
  );

  const performDeleteById = useCallback(
    async (conversationId: string) => {
      const previous = conversations;
      const updated = conversations.filter((c) => c.id !== conversationId);
      setConversations(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem(CONVERSATIONS_CACHE_KEY, JSON.stringify(updated));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      }
      try {
        await deleteConversation(conversationId);
        eventManager.dispatchEvent("conversationUpdated");
        router.push("/chat");
      } catch (error) {
        console.error("Failed to delete conversation:", error);
        setConversations(previous);
      }
    },
    [conversations, router]
  );

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      loadConversations();
    }

    const handleConversationUpdate = () => {
      loadConversations(true);
    };

    eventManager.addEventListener(
      "conversationUpdated",
      handleConversationUpdate
    );

    return () => {
      eventManager.removeEventListener(
        "conversationUpdated",
        handleConversationUpdate
      );
    };
  }, [loadConversations]);

  const conversationsList = useMemo(() => {
    if (conversations.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No conversations yet</p>
          <p className="text-xs mt-1">Start a new chat to begin</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleConversationClick(conversation)}
            className="relative group w-full p-3 text-left bg-[#303030] hover:bg-[#404040] rounded-lg transition-colors text-white cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConversationClick(conversation);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-8">
                <p className="text-sm font-medium truncate">
                  {conversation.title || "New Chat"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {new Date(conversation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              aria-label="Delete conversation"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTargetId(conversation.id);
              }}
              className="absolute right-2 top-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 hover:bg-[#505050]"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  }, [conversations, handleConversationClick]);

  if (isLoading && !hasLoadedRef.current) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">{conversationsList}</div>
      </div>
      <ConfirmationModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) {
            void performDeleteById(deleteTargetId);
          }
          setDeleteTargetId(null);
        }}
        title="Delete Conversation"
        message="Are you sure you want to delete this conversation? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}
