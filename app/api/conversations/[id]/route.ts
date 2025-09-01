import prisma from "@/lib/prisma";
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

    return conversation;
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const { id: conversationId } = await params;
    const body = await req.json();
    const { title } = body;

    const conversation = await prisma.conversation.updateMany({
      where: { id: conversationId, userId: user.id },
      data: { title },
    });

    return conversation;
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const { id: conversationId } = await params;

    await prisma.conversation.deleteMany({
      where: { id: conversationId, userId: user.id },
    });

    return { success: true };
  });
}
