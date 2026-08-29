import {
  idbPut,
  idbGet,
  idbDelete,
} from "@/app/(allsite)/(application)/application/tradingcard/[slug]/_tradingcard/lib/idb";

const BLOB_SIZE_THRESHOLD = 50 * 1024;

const isLargeBase64 = (value) =>
  typeof value === "string" &&
  value.startsWith("data:image/") &&
  value.length > BLOB_SIZE_THRESHOLD;

const generateBlobId = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

async function walkAndExtract(obj, prefix, ids = []) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === "string" && isLargeBase64(obj[i])) {
        const id = generateBlobId();
        await idbPut(`${prefix}:blob:${id}`, obj[i]);
        obj[i] = { __momentoBlobRef: id };
        ids.push(id);
      } else {
        await walkAndExtract(obj[i], prefix, ids);
      }
    }
    return obj;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (isLargeBase64(value)) {
      const id = generateBlobId();
      await idbPut(`${prefix}:blob:${id}`, value);
      obj[key] = { __momentoBlobRef: id };
      ids.push(id);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !value.__momentoBlobRef
    ) {
      await walkAndExtract(value, prefix, ids);
    }
  }
  return obj;
}

async function walkAndRestore(obj, prefix) {
  if (obj === null || typeof obj !== "object") {
    return;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i] && typeof obj[i] === "object" && obj[i].__momentoBlobRef) {
        const id = obj[i].__momentoBlobRef;
        const blob = await idbGet(`${prefix}:blob:${id}`);
        if (blob) {
          obj[i] = blob;
        } else {
          obj[i] = null;
        }
      } else if (typeof obj[i] === "object" && obj[i] !== null) {
        await walkAndRestore(obj[i], prefix);
      }
    }
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && value.__momentoBlobRef) {
      const id = value.__momentoBlobRef;
      const blob = await idbGet(`${prefix}:blob:${id}`);
      if (blob) {
        obj[key] = blob;
      } else {
        obj[key] = null;
      }
    } else if (typeof value === "object" && value !== null) {
      await walkAndRestore(value, prefix);
    }
  }
}

export async function saveBlobs(prefix, obj) {
  const ids = [];
  const clone = structuredClone(obj);
  const stripped = await walkAndExtract(clone, prefix, ids);
  if (ids.length > 0) {
    await idbPut(`${prefix}:manifest`, ids);
  }
  return stripped;
}

export async function restoreBlobs(prefix, obj) {
  return walkAndRestore(obj, prefix);
}

export async function deleteBlobs(prefix) {
  const manifest = await idbGet(`${prefix}:manifest`);
  const ids = Array.isArray(manifest) ? manifest : [];

  await Promise.all([
    ...ids.map((id) => idbDelete(`${prefix}:blob:${id}`)),
    idbDelete(`${prefix}:manifest`),
  ]);
}
