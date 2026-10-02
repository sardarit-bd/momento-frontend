// store/createHybridStorage.js
import { deleteBlobs, restoreBlobs, saveBlobs } from "./idbBlobCache";

export function createHybridStorage(prefix) {
  return {
    getItem: async (name) => {
      try {
        const raw = localStorage.getItem(name);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        await restoreBlobs(prefix, parsed);
        return parsed;
      } catch (error) {
        console.error(`[${prefix}] Failed to read/restore storage:`, error);
        return null;
      }
    },

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
