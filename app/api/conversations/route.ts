import prisma from "@/lib/prisma";
import { getAuthenticatedUser, handleApiRequest } from "@/lib/api-utils";

export async function GET() {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();

    const conversations = await prisma.conversation.findMany({
      where: { userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return conversations;
  });
}

export async function POST(req: Request) {
  return handleApiRequest(async () => {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { title } = body;

    const conversation = await prisma.conversation.create({
      data: { title: title || "New Chat", userId: user.id },
    });

    return conversation;
  });
}
