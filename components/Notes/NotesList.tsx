"use client";

import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import NoteCard from "./NoteCard";
import NotesHeader from "./NotesHeader";
import EmptyState from "./EmptyState";

interface Props {
  notes: Note[];
}

export default function NotesList({ notes }: Props) {
  const router = useRouter();

  const handleNoteClick = useCallback(
    (note: Note) => {
      router.push(`/notes/${note.id}`);
    },
    [router]
  );

  const handleNewNote = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const notesGrid = useMemo(() => {
    if (notes.length === 0) return null;

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
        ))}
      </div>
    );
  }, [notes, handleNoteClick]);

  return (
    <div className="flex-1 bg-[#212121] min-h-screen">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <NotesHeader noteCount={notes.length} onNewNote={handleNewNote} />

          {notes.length === 0 ? <EmptyState /> : notesGrid}
        </div>
      </div>
    </div>
  );
}
