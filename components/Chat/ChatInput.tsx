"use client";
import { ArrowUp } from "lucide-react";
import { useState, useCallback } from "react";

type ChatInputProps = {
  onSend: (msg: string) => void | Promise<void>;
  disabled?: boolean;
};

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = useCallback(async () => {
    if (!input.trim() || disabled) return;
    await onSend(input);
    setInput("");
  }, [input, disabled, onSend]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const target = e.target as HTMLTextAreaElement;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="p-4 border-t border-[#232323] bg-[#303030] flex justify-center">
      <div className="relative w-2/3">
        <textarea
          className="w-full resize-none rounded-full pl-4 pr-12 py-3 bg-[#212121] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          rows={1}
          style={{ height: "auto" }}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Send a message..."
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}
