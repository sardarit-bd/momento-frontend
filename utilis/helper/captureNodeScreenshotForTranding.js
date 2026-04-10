import html2canvas from "html2canvas";

async function captureNodeScreenshotForTranding(domNode, state, seterState) {
    if (!domNode) {
        console.warn("DOM node is null");
        return null;
    }

    // check if attached to document
    if (!document.body.contains(domNode)) {
        console.warn("DOM node is NOT attached to document");
        return null;
    }

    // ensure DOM is fully rendered
    await new Promise(resolve => requestAnimationFrame(resolve));

    const canvas = await html2canvas(domNode, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,




        onclone: (doc) => {
            doc.querySelectorAll("*").forEach(el => {
                const style = getComputedStyle(el);

                // Replace LAB color → Fallback
                if (style.color.includes("lab")) {
                    el.style.color = "#000";   // set to black or any safe color
                }
                if (style.backgroundColor.includes("lab")) {
                    el.style.backgroundColor = "#fff"; // safe fallback
                }
                if (style.borderColor.includes("lab")) {
                    el.style.borderColor = "#ccc";
                }
            });




            // 🟦 Apply transform to ALL <span> elements ONLY in screenshot clone
            doc.querySelectorAll("span").forEach(span => {
                span.style.transform = "translateY(-6px)";
                span.style.display = "inline-block"; // Needed for transform to work on inline span
            });


        }







    });

    const dataUrl = canvas.toDataURL("image/png");
    seterState([...state, dataUrl]);
    return dataUrl;
}

export default captureNodeScreenshotForTranding;
