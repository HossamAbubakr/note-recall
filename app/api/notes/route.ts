import prisma from "@/lib/prisma";
import { getAuthenticatedUser, handleApiRequest } from "@/lib/api-utils";

export async function GET() {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();

    const notes = await prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return notes;
  });
}

export async function POST(req: Request) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { content } = body;

    const note = await prisma.note.create({
      data: { content, userId: user.id },
    });

    return note;
  });
}

export async function DELETE(req: Request) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("id");

    if (!noteId) {
      throw new Error("Note ID is required");
    }

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId: user.id },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    await prisma.note.delete({ where: { id: noteId } });
    return { success: true };
  });
}

export async function PATCH(req: Request) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("id");

    if (!noteId) {
      throw new Error("Note ID is required");
    }

    const body = await req.json();
    const { title } = body;

    if (!title || typeof title !== "string") {
      throw new Error("Title is required and must be a string");
    }

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId: user.id },
    });

    if (!note) {
      throw new Error("Note not found");
    }
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { title: title.trim() },
    });

    return updatedNote;
  });
}
