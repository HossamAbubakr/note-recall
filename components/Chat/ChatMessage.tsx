import { memo } from "react";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

const ChatMessage = memo(function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md p-3 rounded-lg shadow-sm ${
          isUser
            ? "bg-[#303030] text-white rounded-br-none"
            : "bg-[#171717] text-gray-200 rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
});

export default ChatMessage;
