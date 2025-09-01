import prisma from "@/lib/prisma";
import { processMessageWithContext } from "@/lib/ai/langchain";
import { detectNoteIntent } from "@/lib/ai/noteDetector";
import { getAuthenticatedUser, handleApiRequest } from "@/lib/api-utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const { id: conversationId } = await params;

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    return messages;
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { message } = body;
    const { id: conversationId } = await params;

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const userMessage = await prisma.message.create({
      data: {
        content: message,
        role: "user",
        conversationId,
      },
    });

    const conversationData = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { title: true },
    });

    if (conversationData?.title === "New Chat") {
      const title =
        message.length > 50 ? message.substring(0, 50) + "..." : message;
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { title },
      });
    }

    const conversationHistory = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    let aiResponse;
    try {
      aiResponse = await processMessageWithContext(
        message,
        conversationHistory
      );
    } catch (error) {
      console.error("Error in processMessage:", error);
      throw new Error(
        `AI processing failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    let noteIntent = false;
    try {
      noteIntent = await detectNoteIntent(message);
    } catch (error) {
      console.error("Error in detectNoteIntent:", error);

      noteIntent = false;
    }

    if (noteIntent) {
      let noteContent = aiResponse;

      const patterns = [
        /^I've saved this to your notes:\s*/i,
        /^I've saved the following to your notes:\s*/i,
        /^Here's what I've saved to your notes:\s*/i,
        /^Saved to your notes:\s*/i,
      ];

      for (const pattern of patterns) {
        noteContent = noteContent.replace(pattern, "");
      }

      await prisma.note.create({
        data: {
          content: noteContent.trim(),
          title: "New Note",
          userId: user.id,
        },
      });
    }

    const aiMessage = await prisma.message.create({
      data: {
        content: aiResponse,
        role: "assistant",
        conversationId,
      },
    });

    const updatedConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { title: true },
    });

    const responseData: {
      messages: Array<{
        id: string;
        content: string;
        role: string;
        createdAt: Date;
      }>;
      noteCreated: boolean;
      conversationTitle?: string;
    } = {
      messages: [userMessage, aiMessage],
      noteCreated: !!noteIntent,
    };

    if (
      conversationData?.title === "New Chat" &&
      updatedConversation?.title !== "New Chat"
    ) {
      responseData.conversationTitle = updatedConversation?.title || undefined;
    }

    return responseData;
  });
}
