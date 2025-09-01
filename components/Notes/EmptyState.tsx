import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-[#303030] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No notes yet</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Start chatting with AI to automatically generate notes from your
        conversations. Your insights will appear here for easy reference.
      </p>
    </div>
  );
}
