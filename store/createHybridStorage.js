import { saveBlobs, deleteBlobs, restoreBlobs } from "./idbBlobCache";

export function createHybridStorage(prefix) {
  return {
    getItem: async (name) => {
      try {
        const raw = localStorage.getItem(name);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        await restoreBlobs(prefix, parsed);
        return parsed;
      } catch {
        return null;
      }
    },

    setItem: async (name, value) => {
      try {
        const parsed = JSON.parse(value);
        const stripped = await saveBlobs(prefix, parsed);
        localStorage.setItem(name, JSON.stringify(stripped));
      } catch (error) {
        if (error instanceof SyntaxError) {
          localStorage.setItem(name, value);
        } else {
          console.error(`[${prefix}] Storage error:`, error);
        }
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
