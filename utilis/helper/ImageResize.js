function ImageResize(
    file,
    targetWidth = 250,
    targetHeight = 334,
    quality = 1
) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
            reject(new Error("File is not an image"));
            return;
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => (img.src = e.target.result);

        img.onload = () => {
            // 🔒 Minimum size check
            if (img.height < targetHeight) {
                alert("Image Height must be at least 334px");
                reject(new Error("Image height must be at least 334px"));
                return;
            }

            if (img.width < targetWidth) {
                alert("Image Width must be at least 250px");
                reject(new Error("Image width must be at least 250px"));
                return;
            }

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const targetRatio = targetWidth / targetHeight;
            const imgRatio = img.width / img.height;

            let sx, sy, sw, sh;

            // ✂️ Crop logic (center crop)
            if (imgRatio > targetRatio) {
                // image too wide
                sh = img.height;
                sw = sh * targetRatio;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                // image too tall
                sw = img.width;
                sh = sw / targetRatio;
                sx = 0;
                sy = (img.height - sh) / 2;
            }

            ctx.drawImage(
                img,
                sx,
                sy,
                sw,
                sh,
                0,
                0,
                targetWidth,
                targetHeight
            );

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Canvas is empty"));
                        return;
                    }

                    resolve(
                        new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        })
                    );
                },
                file.type,
                quality
            );
        };

        img.onerror = reject;
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default ImageResize;
