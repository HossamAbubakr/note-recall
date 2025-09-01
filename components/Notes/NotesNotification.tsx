"use client";
import { useState, useEffect } from "react";
import { FileText, X } from "lucide-react";

interface NotesNotificationProps {
  show: boolean;
  onClose: () => void;
  message?: string;
}

export default function NotesNotification({
  show,
  onClose,
  message = "Note created from conversation!",
}: NotesNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <FileText size={20} />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
