import { FileText, Calendar, Clock } from "lucide-react";
import { formatDate, formatTime, truncateText } from "@/lib/utils";
import { memo } from "react";
import { Note } from "@prisma/client";

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

const NoteCard = memo(function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div
      onClick={() => onClick(note)}
      className="bg-[#303030] hover:bg-[#404040] rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#404040] group-hover:bg-[#505050] rounded-lg flex items-center justify-center transition-colors">
            <FileText className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-gray-200 transition-colors">
              {note.title || "Untitled Note"}
            </h3>
            <p className="text-sm text-gray-400">
              {formatDate(note.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {truncateText(note.content, 150)}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>Created: {formatDate(note.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Updated: {formatTime(note.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
});

export default NoteCard;
