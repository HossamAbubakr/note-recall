export type AppEvent =
  | "noteCreated"
  | "noteDeleted"
  | "noteUpdated"
  | "conversationUpdated";

class EventManager {
  private listeners: Map<AppEvent, Set<() => void>> = new Map();

  addEventListener(event: AppEvent, callback: () => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  removeEventListener(event: AppEvent, callback: () => void) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  dispatchEvent(event: AppEvent) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback());
    }
  }

  onNoteCreated(callback: () => void) {
    this.addEventListener("noteCreated", callback);
  }

  onNoteDeleted(callback: () => void) {
    this.addEventListener("noteDeleted", callback);
  }

  onNoteUpdated(callback: () => void) {
    this.addEventListener("noteUpdated", callback);
  }

  onConversationUpdated(callback: () => void) {
    this.addEventListener("conversationUpdated", callback);
  }

  cleanup() {
    this.listeners.clear();
  }
}

export const eventManager = new EventManager();

export function dispatchAppEvent(event: AppEvent) {
  eventManager.dispatchEvent(event);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(event));
  }
}
