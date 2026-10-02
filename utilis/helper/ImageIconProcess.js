export const ICON_MAX_FILE_BYTES = 500 * 1024;
export const ICON_ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const ICON_OUTPUT_SIZE = 128;
export const ICON_MIN_DIMENSION = 32;

export default function processIconFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
      return;
    }
    if (!ICON_ALLOWED_TYPES.includes(file.type)) {
      reject(new Error("Only PNG, JPG or WEBP images are allowed."));
      return;
    }
    if (file.size > ICON_MAX_FILE_BYTES) {
      reject(
        new Error(
          `Image is too large. Maximum size is ${Math.round(ICON_MAX_FILE_BYTES / 1024)} KB.`,
        ),
      );
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Could not load the image."));
      img.onload = () => {
        if (img.width < ICON_MIN_DIMENSION || img.height < ICON_MIN_DIMENSION) {
          reject(
            new Error(
              `Image must be at least ${ICON_MIN_DIMENSION}x${ICON_MIN_DIMENSION}px.`,
            ),
          );
          return;
        }
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = ICON_OUTPUT_SIZE;
        canvas.height = ICON_OUTPUT_SIZE;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          sx,
          sy,
          side,
          side,
          0,
          0,
          ICON_OUTPUT_SIZE,
          ICON_OUTPUT_SIZE,
        );
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
