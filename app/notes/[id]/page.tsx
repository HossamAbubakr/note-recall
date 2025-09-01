"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import NoteDetail from "@/components/Notes/NoteDetail";
import { fetchNote } from "@/actions/notes";
import { Note } from "@prisma/client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/lib/hooks/useAuth";

export default function NotePage() {
  const { session, isLoading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  const loadNote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const noteData = await fetchNote(noteId);
      setNote(noteData);
    } catch (error) {
      console.error("Error loading note:", error);
      setError("Note not found or you don't have permission to view it");
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    if (session && noteId && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadNote();
    }
  }, [session, noteId, loadNote]);

  const handleBack = () => {
    router.push("/notes");
  };

  const handleNoteUpdated = (newTitle: string) => {
    setNote((prev) => (prev ? { ...prev, title: newTitle } : prev));
  };

  if (isLoading || loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
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
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Note Not Found
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-3 bg-[#303030] hover:bg-[#404040] border border-[#232323] hover:border-[#404040] rounded-lg transition-colors cursor-pointer text-white font-medium"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  if (note) {
    return (
      <NoteDetail
        note={note}
        onBack={handleBack}
        onNoteUpdated={handleNoteUpdated}
      />
    );
  }

  return null;
}
