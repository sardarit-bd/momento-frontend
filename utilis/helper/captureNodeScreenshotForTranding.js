async function captureNodeScreenshotForTranding(domNode) {
    if (!domNode || !document.body.contains(domNode)) return null;

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const shouldIgnore = (el) => {
        return (
            el.classList?.contains("react-resizable-handle") ||
            el.tagName === "BUTTON"
        );
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

            onclone: async (clonedDoc, clonedEl) => {

            try { await clonedDoc.fonts.ready; } catch (_) {}

            const liveEls = Array.from(domNode.querySelectorAll("*"));
            const cloneEls = Array.from(clonedEl.querySelectorAll("*"));

            const propsToSync = [
                "position", "display", "flexDirection", "alignItems", "justifyContent",
                "top", "left", "right", "bottom", "width", "height",
                "minWidth", "minHeight", "maxWidth", "maxHeight",
                "marginTop", "marginBottom", "marginLeft", "marginRight",
                "paddingTop", "paddingBottom", "paddingLeft", "paddingRight",
                "fontSize", "fontWeight", "fontFamily", "fontStyle",
                "lineHeight", "letterSpacing", "textAlign", "whiteSpace",
                "color", "opacity", "zIndex", "overflow", "overflowX", "overflowY",
                "borderRadius", "gap", "flex", "flexShrink", "flexGrow",
                "gridTemplateColumns", "gridColumn", "gridRow",
                "textOverflow", "verticalAlign", "boxSizing",
                "backgroundImage", "backgroundSize", "backgroundPosition",
                "transform", "transformOrigin",
            ];

            liveEls.forEach((liveEl, i) => {
                const cloneEl = cloneEls[i];
                if (!cloneEl) return;

                const cs = window.getComputedStyle(liveEl);
                propsToSync.forEach((prop) => {
                    const val = cs[prop];
                    if (val) {
                        cloneEl.style[prop] = val;
                    }
                });
            });

            cloneEls.forEach((el) => {
                const bgClip = el.style.getPropertyValue("background-clip") ||
                    el.style.getPropertyValue("-webkit-background-clip");
                const textFill = el.style.getPropertyValue("-webkit-text-fill-color");
                const isClippedToText =
                    bgClip === "text" ||
                    textFill === "transparent" ||
                    textFill === "rgba(0, 0, 0, 0)";

                if (isClippedToText) {
                    const bg = el.style.backgroundImage || "";
                    const colorMatch = bg.match(
                        /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)|#[0-9a-fA-F]{3,8}/
                    );
                    const flatColor = colorMatch ? colorMatch[0] : "#ffffff";
                    el.style.setProperty("background", "none", "important");
                    el.style.setProperty("background-image", "none", "important");
                    el.style.setProperty("background-clip", "unset", "important");
                    el.style.setProperty("-webkit-background-clip", "unset", "important");
                    el.style.setProperty("-webkit-text-fill-color", flatColor, "important");
                    el.style.setProperty("color", flatColor, "important");
                }
            });

            clonedEl.style.setProperty("background", "transparent", "important");
            clonedEl.style.setProperty("background-color", "transparent", "important");

            cloneEls.forEach((el) => {
                if (el.style.backgroundColor) return;
                if (el.style.width && el.style.width.endsWith("%")) return;
                const bg = el.style.backgroundColor;
                if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
                    const bgImage = el.style.backgroundImage;
                    if (!bgImage || bgImage === "none") {
                        el.style.setProperty("background-color", "transparent", "important");
                    }
                }
            });
    
            const absoluteSpans = clonedEl.querySelectorAll("span[class*='absolute']");
            absoluteSpans.forEach((el) => {
                const currentTop = parseFloat(window.getComputedStyle(el).top);
                if (!isNaN(currentTop)) {
                    el.style.setProperty("top", `${currentTop - 3}px`, "important");
                }
            });

    
            const highlightRows = clonedEl.querySelectorAll("span.flex.items-center");
            highlightRows.forEach((el) => {
                el.style.setProperty("display", "flex", "important");
                el.style.setProperty("align-items", "center", "important");
                el.style.setProperty("flex-direction", "row", "important");
            });

            const highlightIcons = clonedEl.querySelectorAll("span.flex.items-center img");
            highlightIcons.forEach((el) => {
                el.style.setProperty("display", "inline", "important");
                el.style.setProperty("flex-shrink", "0", "important");
                el.style.setProperty("align-self", "center", "important");
            });

            const highlightTexts = clonedEl.querySelectorAll("span.flex.items-center span");
            highlightTexts.forEach((el) => {
                el.style.setProperty("position", "relative", "important");
                el.style.setProperty("top", "-9px", "important");
            });

            const gradientTextEls = clonedEl.querySelectorAll(
                ".TradingCardTitleMetal, .TradingCardDateGrayGradient"
            );
            gradientTextEls.forEach((el) => {
                el.style.setProperty("background-color", "transparent", "important");
                el.style.setProperty("background", "none", "important");
                el.style.setProperty("background-image", "none", "important");
                el.style.setProperty("-webkit-background-clip", "unset", "important");
                el.style.setProperty("background-clip", "unset", "important");
                el.style.setProperty("-webkit-text-fill-color", "#ffffff", "important");
                el.style.setProperty("color", "#ffffff", "important");
            });

            const allSpans = clonedEl.querySelectorAll(".TradingCardTitleMetal, .TradingCardDateGrayGradient");
            allSpans.forEach((el) => {
                const parent = el.closest("div");
                if (parent && window.getComputedStyle(parent).textAlign === "right") {
                    el.style.setProperty("padding-right", "10px", "important");
                }
            });
        },
        });

        return canvas.toDataURL("image/png");

    } catch (error) {
        console.error(
            "Capture failed with html2canvas, retrying with dom-to-image-more:",
            error
        );
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