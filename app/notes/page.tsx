"use client";

import { useEffect, useState } from "react";
import NotesList from "@/components/Notes/NotesList";
import { fetchNotes } from "@/actions/notes";
import { Note } from "@prisma/client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { eventManager } from "@/lib/event-manager";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Notes() {
  const { session, isLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchNotesData();
    }
  }, [session]);

  useEffect(() => {
    const handleNoteCreated = () => {
      fetchNotesData();
    };

    const handleNoteDeleted = () => {
      fetchNotesData();
    };

    const handleNoteUpdated = () => {
      fetchNotesData();
    };

    eventManager.onNoteCreated(handleNoteCreated);
    eventManager.onNoteDeleted(handleNoteDeleted);
    eventManager.onNoteUpdated(handleNoteUpdated);

    return () => {};
  }, []);

  const fetchNotesData = async () => {
    try {
      setLoading(true);
      const notesData = await fetchNotes();
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="flex-1">
      <NotesList notes={notes} />
    </div>
  );
}
