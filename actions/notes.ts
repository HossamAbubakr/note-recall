import { Note } from "@prisma/client";

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch("/api/notes");

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchNote(noteId: string): Promise<Note> {
  const response = await fetch(`/api/notes/${noteId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch note: ${response.statusText}`);
  }

  return response.json();
}

export async function createNote(
  content: string,
  title?: string
): Promise<Note> {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create note: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteNote(noteId: string): Promise<void> {
  const response = await fetch(`/api/notes?id=${noteId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete note: ${response.statusText}`);
  }
}

export async function updateNoteTitle(
  noteId: string,
  title: string
): Promise<Note> {
  const response = await fetch(`/api/notes?id=${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update note: ${response.statusText}`);
  }

  return response.json();
}
