"use client";

import { useCallback } from "react";
import { Plus } from "lucide-react";

interface NotesHeaderProps {
  noteCount: number;
  onNewNote: () => void;
}

export default function NotesHeader({
  noteCount,
  onNewNote,
}: NotesHeaderProps) {
  const handleNewNote = useCallback(() => {
    onNewNote();
  }, [onNewNote]);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Notes</h1>
        <p className="text-gray-300">
          {noteCount === 0
            ? "No notes yet"
            : noteCount === 1
            ? "1 note"
            : `${noteCount} notes`}{" "}
          • All your conversations and insights
        </p>
      </div>
      <button
        onClick={handleNewNote}
        className="flex items-center space-x-2 px-4 py-3 bg-[#303030] hover:bg-[#404040] border border-[#232323] hover:border-[#404040] rounded-lg transition-colors cursor-pointer text-white font-medium"
      >
        <Plus size={20} />
        <span>New Note</span>
      </button>
    </div>
  );
}
