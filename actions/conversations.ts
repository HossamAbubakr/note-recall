import { Conversation, Message } from "@prisma/client";

export interface ConversationResponse {
  messages: Message[];
  noteCreated?: boolean;
  conversationTitle?: string;
}

export async function fetchConversations(): Promise<Conversation[]> {
  const response = await fetch("/api/conversations");

  if (!response.ok) {
    throw new Error(`Failed to fetch conversations: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchConversation(
  conversationId: string
): Promise<Conversation> {
  const response = await fetch(`/api/conversations/${conversationId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch conversation: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchMessages(
  conversationId: string
): Promise<Message[]> {
  const response = await fetch(`/api/conversations/${conversationId}/messages`);

  if (!response.ok) {
    throw new Error(`Failed to fetch messages: ${response.statusText}`);
  }

  return response.json();
}

export async function createConversation(
  title: string = "New Chat"
): Promise<Conversation> {
  const response = await fetch("/api/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create conversation: ${response.statusText}`);
  }

  return response.json();
}

export async function sendMessage(
  conversationId: string,
  message: string
): Promise<ConversationResponse> {
  const response = await fetch(
    `/api/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteConversation(
  conversationId: string
): Promise<void> {
  const response = await fetch(`/api/conversations/${conversationId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete conversation: ${response.statusText}`);
  }
}
