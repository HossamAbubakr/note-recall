"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  HomeHeader,
  HeroSection,
  FeaturesSection,
  CTASection,
  HomeFooter,
} from "@/components/HomePage";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      router.push("/chat");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner
          size="lg"
          textColor="text-gray-600 dark:text-gray-300"
        />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
}
