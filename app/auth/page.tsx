"use client";

import AuthForm from "@/components/Auth/AuthForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Auth() {
  const { session, isLoading } = useAuth("/chat");

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#212121] text-white">
        <LoadingSpinner size="lg" textColor="text-white" />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return <AuthForm />;
}
