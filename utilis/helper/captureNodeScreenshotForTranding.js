async function captureNodeScreenshotForTranding(domNode) {
    if (!domNode || !document.body.contains(domNode)) return null;

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const shouldIgnore = (el) => {
        return el.classList?.contains("react-resizable-handle") || el.tagName === "BUTTON";
    };

    try {
        const html2canvas = (await import("html2canvas")).default;

        const canvas = await html2canvas(domNode, {
            scale: 3,
            useCORS: true,
            allowTaint: false,
            backgroundColor: null,
            logging: false,
            ignoreElements: shouldIgnore,
            onclone: (clonedDoc, clonedEl) => {
                // Force remove all stylesheets except inline
                const sheets = clonedDoc.querySelectorAll("link[rel=\"stylesheet\"]");
                sheets.forEach(s => {
                    if (s.href?.includes("_next")) return; // keep Next.js styles
                    s.remove();
                });
            }
        });

        return canvas.toDataURL("image/png");
    } catch (error) {
        console.error("Capture failed with html2canvas, retrying with dom-to-image-more:", error);
    }

    try {
        const domtoimage = (await import("dom-to-image-more")).default;
        const sourceWidth = domNode.offsetWidth || domNode.clientWidth;
        const sourceHeight = domNode.offsetHeight || domNode.clientHeight;
        const targetWidth = Math.max(1, Math.round(sourceWidth * 3));
        const targetHeight = Math.max(1, Math.round(sourceHeight * 3));

        return await domtoimage.toPng(domNode, {
            bgcolor: "transparent",
            cacheBust: true,
            width: targetWidth,
            height: targetHeight,
            filter: (node) => !shouldIgnore(node),
            style: {
                transform: "scale(3)",
                transformOrigin: "top left",
                width: `${sourceWidth}px`,
                height: `${sourceHeight}px`,
                backgroundColor: "transparent",
            },
        });
    } catch (fallbackError) {
        console.error("Capture failed:", fallbackError);
        return null;
    }
}

export default captureNodeScreenshotForTranding;
