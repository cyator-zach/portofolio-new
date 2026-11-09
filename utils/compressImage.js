export async function compressImage(file, maxSizeMB = 1) {
    if (!file || !file.type.startsWith("image/") || file.type === "image/svg+xml") {
        return file;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            let width = img.width;
            let height = img.height;
            const maxDimension = 1920;

            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                } else {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.92;
            const attempt = () => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) return resolve(file);

                        if (blob.size <= maxSizeBytes || quality <= 0.6) {
                            const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
                                type: "image/webp",
                            });
                            resolve(compressed);
                        } else {
                            quality -= 0.1;
                            attempt();
                        }
                    },
                    "image/webp",
                    quality
                );
            };
            attempt();
        };

        img.onerror = () => resolve(file);
        img.src = url;
    });
}

