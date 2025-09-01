"use client";
import ChatWindow from "@/components/Chat/ChatWindow";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Chat() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex-1">
      <ChatWindow />
    </div>
  );
}
