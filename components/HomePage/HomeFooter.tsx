"use client";

import { Brain } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Note Recall
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          © 2025 Note Recall. Built By{" "}
          <a
            href="https://github.com/hossamAbubakr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            Hossam Abubakr
          </a>{" "}
          with ❤️ for better conversations and smarter notes.
        </div>
      </div>
    </footer>
  );
}
