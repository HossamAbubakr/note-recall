"use client";

import { Brain } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="p-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Note Recall
        </h1>
      </div>
    </header>
  );
}
