// store/createHybridStorage.js
import { saveBlobs, deleteBlobs, restoreBlobs } from "./idbBlobCache";

export function createHybridStorage(prefix) {
  return {
    // Zustand (without createJSONStorage) expects getItem to return the
    // parsed StorageValue object directly — not a JSON string.
    getItem: async (name) => {
      try {
        const raw = localStorage.getItem(name);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        await restoreBlobs(prefix, parsed); // mutates parsed in place
        return parsed;
      } catch (error) {
        console.error(`[${prefix}] Failed to read/restore storage:`, error);
        return null;
      }
    },

    // Zustand now hands us the raw object (already NOT stringified),
    // since there's no createJSONStorage doing that for us anymore.
    setItem: async (name, value) => {
      try {
        const stripped = await saveBlobs(prefix, value);
        localStorage.setItem(name, JSON.stringify(stripped));
      } catch (error) {
        console.error(`[${prefix}] Storage error:`, error);
      }
    },

    removeItem: async (name) => {
      try {
        await deleteBlobs(prefix);
      } catch (e) {
        console.warn(`[${prefix}] Failed to delete blobs:`, e);
      }
      try {
        localStorage.removeItem(name);
      } catch {}
    },
  };
}