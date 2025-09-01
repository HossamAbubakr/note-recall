"use client";

import {
  MessageSquare,
  FileText,
  Brain,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Interface",
    description:
      "Chat with our advanced AI assistant that understands context and helps you explore ideas, solve problems, and generate insights in real-time.",
    iconBgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "Smart Note Generation",
    description:
      "Automatically extract key points, summaries, and actionable items from your conversations. Turn every chat into organized, searchable notes.",
    iconBgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  {
    icon: Brain,
    title: "Intelligent Recall",
    description:
      "Never lose important information again. Our AI remembers context and helps you recall relevant conversations and notes when you need them most.",
    iconBgColor: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern technology for instant responses and seamless performance. Get your answers and notes faster than ever before.",
    iconBgColor: "bg-gradient-to-r from-orange-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your conversations and notes are protected with enterprise-grade security. Your data stays private and secure at all times.",
    iconBgColor: "bg-gradient-to-r from-red-500 to-red-600",
  },
  {
    icon: Users,
    title: "User-Friendly",
    description:
      "Beautiful, intuitive interface designed for everyone. No technical expertise required to start chatting and creating amazing notes.",
    iconBgColor: "bg-gradient-to-r from-indigo-500 to-indigo-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need to make your conversations more productive and
          your notes more intelligent
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconBgColor={feature.iconBgColor}
          />
        ))}
      </div>
    </section>
  );
}
