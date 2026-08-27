const IDB_DB_NAME = "tradingCardCustomizer";
const IDB_STORE = "customizations";

export async function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbPut(key, value) {
  try {
    const db = await idbOpen();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => {
        console.warn("IDB put failed:", tx.error);
        resolve(false);
      };
    });
  } catch {
    return false;
  }
}

export async function idbGet(key) {
  try {
    const db = await idbOpen();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function idbDelete(key) {
  try {
    const db = await idbOpen();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).delete(key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export async function idbGetKeysByPrefix(prefix) {
  try {
    const db = await idbOpen();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const store = tx.objectStore(IDB_STORE);
      const req = store.getAllKeys();
      req.onsuccess = () =>
        resolve(
          req.result.filter(
            (k) => typeof k === "string" && k.startsWith(prefix),
          ),
        );
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}
export async function idbClear() {
  try {
    const db = await idbOpen();

    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);

      store.clear();

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => {
        console.warn("IDB clear failed:", tx.error);
        resolve(false);
      };
    });
  } catch {
    return false;
  }
}
