"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import NotesNotification from "../Notes/NotesNotification";
import {
  fetchConversation,
  fetchMessages,
  createConversation,
  sendMessage,
} from "@/actions/conversations";
import { Conversation } from "@prisma/client";
import { dispatchAppEvent } from "@/lib/event-manager";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const loadConversation = useCallback(async (convId: string) => {
    try {
      const convData = await fetchConversation(convId);
      setConversation(convData);

      const messagesData = await fetchMessages(convId);
      const uiMessages: Message[] = messagesData.map((msg) => ({
        id: msg.id,
        role: msg.role as "user" | "assistant",
        content: msg.content,
        createdAt: msg.createdAt,
      }));
      setMessages(uiMessages);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  }, []);

  const createOrGetConversation = useCallback(async () => {
    setConversation(null);
    setMessages([]);
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      if (conversationId) {
        loadConversation(conversationId);
      } else {
        createOrGetConversation();
      }
    }
  }, [session, conversationId, loadConversation, createOrGetConversation]);

  const handleSend = useCallback(
    async (msg: string) => {
      if (!msg.trim()) return;

      setIsLoading(true);

      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: msg,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        let currentConversation = conversation;

        if (!currentConversation) {
          currentConversation = await createConversation("New Chat");
          setConversation(currentConversation);

          if (currentConversation && currentConversation.id) {
            const url = new URL(window.location.href);
            url.searchParams.set("conversation", currentConversation.id);
            window.history.replaceState({}, "", url.toString());
          }
        }

        const data = await sendMessage(currentConversation!.id, msg);

        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== userMessage.id);

          const userMessageFromAPI = data.messages.find(
            (m: {
              role: string;
              id: string;
              content: string;
              createdAt: Date;
            }) => m.role === "user"
          );
          const aiMessage = data.messages.find(
            (m: {
              role: string;
              id: string;
              content: string;
              createdAt: Date;
            }) => m.role === "assistant"
          );

          const newMessages: Message[] = [];
          if (
            userMessageFromAPI &&
            !filtered.some((m) => m.id === userMessageFromAPI.id)
          ) {
            newMessages.push({
              id: userMessageFromAPI.id,
              role: userMessageFromAPI.role as "user" | "assistant",
              content: userMessageFromAPI.content,
              createdAt: userMessageFromAPI.createdAt,
            });
          }
          if (aiMessage && !filtered.some((m) => m.id === aiMessage.id)) {
            newMessages.push({
              id: aiMessage.id,
              role: aiMessage.role as "user" | "assistant",
              content: aiMessage.content,
              createdAt: aiMessage.createdAt,
            });
          }

          return [...filtered, ...newMessages];
        });

        if (data.noteCreated) {
          setShowNotification(true);

          dispatchAppEvent("noteCreated");
        }

        if (
          data.conversationTitle &&
          conversation?.title !== data.conversationTitle
        ) {
          setConversation((prev) =>
            prev ? { ...prev, title: data.conversationTitle || null } : null
          );

          dispatchAppEvent("conversationUpdated");
        }
      } catch (error) {
        console.error("Error sending message:", error);

        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));

        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            createdAt: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversation]
  );

  const handleCloseNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  const messagesList = useMemo(() => {
    return messages.map((message) => (
      <ChatMessage
        key={message.id}
        role={message.role}
        content={message.content}
      />
    ));
  }, [messages]);

  return (
    <>
      <main className="flex-1 flex flex-col bg-[#212121] h-full w-full">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 w-full">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-400">
                Ask me anything and I&apos;ll help you capture insights as notes
              </p>
            </div>
          ) : (
            messagesList
          )}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>

      <NotesNotification
        show={showNotification}
        onClose={handleCloseNotification}
      />
    </>
  );
}
