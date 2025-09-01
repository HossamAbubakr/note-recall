"use client";

import { Note } from "@prisma/client";
import { useState, useCallback } from "react";
import { updateNoteTitle, deleteNote } from "@/actions/notes";
import { dispatchAppEvent } from "@/lib/event-manager";
import ConfirmationModal from "../ConfirmationModal";
import { formatDate, formatTime } from "@/lib/utils";

interface NoteDetailProps {
  note: Note;
  onBack: () => void;
  onNoteUpdated?: (newTitle: string) => void;
}

export default function NoteDetail({
  note,
  onBack,
  onNoteUpdated,
}: NoteDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditedTitle(note.title || "");
  }, [note.title]);

  const handleSave = useCallback(async () => {
    if (!editedTitle.trim()) return;

    setIsLoading(true);
    try {
      if (editedTitle.trim() !== (note.title || "")) {
        await updateNoteTitle(note.id, editedTitle.trim());
        if (onNoteUpdated) onNoteUpdated(editedTitle.trim());
      }
      setIsEditing(false);
      dispatchAppEvent("noteUpdated");
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setIsLoading(false);
    }
  }, [note.id, editedTitle, note.title, onNoteUpdated]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditedTitle(note.title || "");
  }, [note.title]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteNote(note.id);
      dispatchAppEvent("noteDeleted");
      onBack();
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  }, [note.id, onBack]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(e.target.value);
    },
    []
  );

  const openDeleteModal = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  return (
    <>
      <div className="flex-1 p-6 bg-[#212121]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Notes</span>
            </button>

            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-3 bg-[#303030] hover:bg-[#404040] border border-[#232323] hover:border-[#404040] rounded-lg transition-colors cursor-pointer text-white font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-colors cursor-pointer text-red-400 hover:text-red-300 font-medium"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-4 py-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 hover:border-green-500/50 rounded-lg transition-colors cursor-pointer text-green-400 hover:text-green-300 font-medium disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-3 bg-[#303030] hover:bg-[#404040] border border-[#232323] hover:border-[#404040] rounded-lg transition-colors cursor-pointer text-white font-medium"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleTitleChange}
                  placeholder="Note title (optional)"
                  className="w-full p-3 bg-[#212121] border border-[#232323] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#404040] focus:border-[#404040]"
                />
              </div>
            ) : (
              <div>
                {note.title && (
                  <h1 className="text-2xl font-bold text-white mb-4">
                    {note.title}
                  </h1>
                )}
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm leading-relaxed">
                    {note.content}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-sm text-gray-400">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Created: {formatDate(note.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Updated: {formatTime(note.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}
