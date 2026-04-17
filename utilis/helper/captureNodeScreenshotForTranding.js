import domtoimage from "dom-to-image-more";

async function captureNodeScreenshotForTranding(domNode, state, seterState) {
    if (!domNode) {
        console.warn("DOM node is null");
        return null;
    }

    if (!document.body.contains(domNode)) {
        console.warn("DOM node is NOT attached to document");
        return null;
    }

    await new Promise((resolve) => requestAnimationFrame(resolve));

    try {
        const dataUrl = await domtoimage.toPng(domNode, {
            bgcolor: "transparent",
            cacheBust: true,
            style: {
                backgroundColor: "transparent",
            },
        });

        if (seterState) {
            if (Array.isArray(state)) seterState([...state, dataUrl]);
            else seterState((prev) => [...prev, dataUrl]);
        }

        return dataUrl;
    } catch (error) {
        console.error("Trading screenshot capture failed:", error);
        return null;
    }
}

export default captureNodeScreenshotForTranding;
