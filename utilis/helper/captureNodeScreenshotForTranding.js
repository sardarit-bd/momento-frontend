let fontsLoaded = false;
async function ensureFontsLoaded() {
    if (fontsLoaded) return;
    const faces = [
        new FontFace("AileronCanvas",     "url(/font/Aileron-Regular.otf)"),
        new FontFace("AileronCanvas",     "url(/font/Aileron-Bold.otf)",     { weight: "700" }),
        new FontFace("AileronCanvas",     "url(/font/Aileron-SemiBold.otf)", { weight: "600" }),
        new FontFace("GustanBlackCanvas", "url(/font/GustanBlack.otf)"),
        new FontFace("BrunsonCanvas",     "url(/font/Brunson.ttf)"),
        new FontFace("CorsicaCanvas",     "url(/font/CorsicaLX-Book.ttf)",   { weight: "900" }),
    ];
    await Promise.all(faces.map(async (f) => { await f.load(); document.fonts.add(f); }));
    fontsLoaded = true;
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload  = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src?.substring(0, 80)}`));
        img.src = src;
    });
}

function drawCover(ctx, img, x, y, w, h, scale = 1) {
    ctx.save();
    // Clip to the card bounds so a zoomed upload never bleeds outside it
    // (mirrors the live preview, where the canvas div has overflow:hidden).
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();

    // A centered transform:scale() about the card centre — identical to the
    // live preview's `transform: scale(img.scale)` on the <img>.
    const cx = x + w / 2;
    const cy = y + h / 2;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = w / h;
    let sx, sy, sw, sh;
    if (imgRatio > boxRatio) {
        sh = img.naturalHeight; sw = sh * boxRatio;
        sx = (img.naturalWidth - sw) / 2; sy = 0;
    } else {
        sw = img.naturalWidth; sh = sw / boxRatio;
        sx = 0; sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
}

function drawGradientText(ctx, text, x, y, font, gradStops, textHeight, strokeColor, strokeWidth, align = "left") {
    ctx.save();
    ctx.font         = font;
    ctx.textAlign    = align;
    ctx.textBaseline = "alphabetic";
    const grad = ctx.createLinearGradient(0, y - textHeight, 0, y);
    gradStops.forEach(({ pos, color }) => grad.addColorStop(pos, color));
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth   = strokeWidth;
        ctx.lineJoin    = "round";
        ctx.strokeText(text, x, y);
    }
    ctx.fillStyle = grad;
    ctx.fillText(text, x, y);
    ctx.restore();
}

async function drawAttributeMetric(ctx, {
    iconSrc, text, value,
    x, y, barWidth,
    fontSize, fontFamily, textColor,
    trackColor, fillColor,
}) {
    const iconSize = 34;
    const colGap   = 8;
    const barH     = 7;
    const textX    = x + iconSize + colGap;

    if (iconSrc) {
        try {
            const icon = await loadImage(iconSrc);
            ctx.drawImage(icon, x, y, iconSize, iconSize);
        } catch {}
    }

    ctx.save();
    ctx.fillStyle    = textColor;
    ctx.font         = `${fontSize}px "${fontFamily}"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText(text || "", textX, y + 2);
    ctx.restore();

    const barY = y + fontSize + 9;
    ctx.save();
    ctx.fillStyle = trackColor;
    ctx.beginPath();
    ctx.roundRect(textX, barY, barWidth, barH, barH / 2);
    ctx.fill();
    ctx.restore();

    const fillW = (barWidth * Math.min(Math.max(Number(value) || 0, 0), 100)) / 100;
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.roundRect(textX, barY, fillW, barH, barH / 2);
    ctx.fill();
    ctx.restore();
}

const METAL_STOPS = [
    { pos: 0.00, color: "#ffffff" },
    { pos: 0.35, color: "#f8fafc" },
    { pos: 0.70, color: "#eef2f7" },
    { pos: 1.00, color: "#e5e7eb" },
];

const DATE_GRAY_STOPS = [
    { pos: 0.00, color: "#d1d5db" },
    { pos: 0.45, color: "#6b7280" },
    { pos: 1.00, color: "#1f2937" },
];

// ── FrontOne ────────────────────────────────────────────────────────────────
// All positions are % of W / H so they work at ANY card size.
//
// JSX (lg = 390×570) → percentage:
//   description : top-111(444px)=77.9%H  left-8(32px)=8.2%W
//   metrics     : left-[40px]=10.3%W  bottom-[60px]=10.5%H
//   barWidth    : w-[132px]=33.8%W
//   iconSize    : 34px=8.7%W  (scale with W)
//   title       : right-[40px]=10.3%W  bottom-[16%]H
//   date        : below title
//   copyright   : bottom-[33px]=5.8%H  center
// ───────────────────────────────────────────────────────────────────────────
async function drawFrontOne(ctx, props, W, H) {
    const {
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        iconOne, iconTwo, iconThree,
    } = props;

    // Scale factor relative to reference card (390×570)
    const sx = W / 390;
    const sy = H / 570;

    // ── Description
    const descFontSize = Math.round(12 * sy);
    ctx.save();
    ctx.fillStyle    = "rgba(255,255,255,0.9)";
    ctx.font         = `300 ${descFontSize}px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText(carddes || "", 32 * sx, 444 * sy);
    ctx.restore();

    // ── Attribute metrics
    const iconSize  = Math.round(34 * sx);
    const colGap    = Math.round(8  * sx);
    const barH      = Math.round(7  * sy);
    const fontSize  = Math.round(13 * sy);
    const barWidth  = Math.round(132 * sx);
    const rowGap    = Math.round(8  * sy);
    const rowHeight = iconSize + rowGap;
    const metLeft   = 40 * sx;
    const startY    = H - 60 * sy - rowHeight * 3;

    const drawMetric = async (iconSrc, text, value, y) => {
        const textX = metLeft + iconSize + colGap;
        if (iconSrc) {
            try {
                const icon = await loadImage(iconSrc);
                ctx.drawImage(icon, metLeft, y, iconSize, iconSize);
            } catch {}
        }
        ctx.save();
        ctx.fillStyle    = "#f7f7f7";
        ctx.font         = `${fontSize}px "GustanBlackCanvas"`;
        ctx.textBaseline = "top";
        ctx.textAlign    = "left";
        ctx.fillText(text || "", textX, y + 2);
        ctx.restore();

        const barY = y + fontSize + Math.round(9 * sy);
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.roundRect(textX, barY, barWidth, barH, barH / 2);
        ctx.fill();
        ctx.restore();

        const fillW = (barWidth * Math.min(Math.max(Number(value) || 0, 0), 100)) / 100;
        ctx.save();
        ctx.fillStyle = "#f56f41";
        ctx.beginPath();
        ctx.roundRect(textX, barY, fillW, barH, barH / 2);
        ctx.fill();
        ctx.restore();
    };

    await drawMetric(iconOne,   name,  labelone,   startY);
    await drawMetric(iconTwo,   name2, labeltwo,   startY + rowHeight);
    await drawMetric(iconThree, name3, labelthree, startY + rowHeight * 2);

    // ── Title
    // bottom-[16%] → baseline at H - H*0.16
    const titleSize = Math.round(33.6 * sy);
    const titleY    = H - H * 0.16;
    drawGradientText(
        ctx,
        cardti || "",
        W - 40 * sx, titleY,
        `900 ${titleSize}px "CorsicaCanvas"`,
        METAL_STOPS,
        titleSize,
        "rgba(107,114,128,0.9)",
        1.2 * sx,
        "right"
    );

    // ── Date
    // text-[1rem] = 16px scaled, block below title
    const dateSize = Math.round(16 * sy);
    const dateY    = titleY + titleSize * 0.3 + dateSize;
    drawGradientText(
        ctx,
        acarddate || "",
        W - 40 * sx, dateY,
        `900 ${dateSize}px "CorsicaCanvas"`,
        DATE_GRAY_STOPS,
        dateSize,
        "rgba(17,24,39,0.78)",
        0.6 * sx,
        "right"
    );

    // ── Copyright
    const copySize = Math.round(10 * sy);
    ctx.save();
    ctx.fillStyle    = "#1f1f1f";
    ctx.font         = `400 ${copySize}px "BrunsonCanvas"`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`© ${new Date().getFullYear()} MOMENTO TRADING CARDS`, W / 2, H - 33 * sy);
    ctx.restore();
}

async function drawFrontTwo(ctx, props, W, H) {
    const {
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        iconOne, iconTwo, iconThree,
    } = props;

    const sx = W / 390;
    const sy = H / 570;

    const descFontSize = Math.round(12 * sy);
    ctx.save();
    ctx.fillStyle    = "rgba(240,240,240,0.9)";
    ctx.font         = `300 ${descFontSize}px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText(carddes || "", 32 * sx, 434 * sy);
    ctx.restore();

    const iconSize  = Math.round(34 * sx);
    const colGap    = Math.round(8  * sx);
    const barH      = Math.round(7  * sy);
    const fontSize  = Math.round(13 * sy);
    const barWidth  = Math.round(132 * sx);
    const rowGap    = Math.round(8  * sy);
    const rowHeight = iconSize + rowGap;
    const metLeft   = 25 * sx;
    const startY    = H - 33 * sy - rowHeight * 3;

    const drawMetric = async (iconSrc, text, value, y) => {
        const textX = metLeft + iconSize + colGap;
        if (iconSrc) {
            try {
                const icon = await loadImage(iconSrc);
                ctx.drawImage(icon, metLeft, y, iconSize, iconSize);
            } catch {}
        }
        ctx.save();
        ctx.fillStyle    = "#f7f7f7";
        ctx.font         = `${fontSize}px "GustanBlackCanvas"`;
        ctx.textBaseline = "top";
        ctx.textAlign    = "left";
        ctx.fillText(text || "", textX, y + 2);
        ctx.restore();

        const barY = y + fontSize + Math.round(9 * sy);
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.roundRect(textX, barY, barWidth, barH, barH / 2);
        ctx.fill();
        ctx.restore();

        const fillW = (barWidth * Math.min(Math.max(Number(value) || 0, 0), 100)) / 100;
        ctx.save();
        ctx.fillStyle = "#5ba2d8";
        ctx.beginPath();
        ctx.roundRect(textX, barY, fillW, barH, barH / 2);
        ctx.fill();
        ctx.restore();
    };

    await drawMetric(iconOne,   name,  labelone,   startY);
    await drawMetric(iconTwo,   name2, labeltwo,   startY + rowHeight);
    await drawMetric(iconThree, name3, labelthree, startY + rowHeight * 2);

    const dateBaseline  = H - 33 * sy;
    const titleSize     = Math.round(24 * sy);
    const dateSize      = Math.round(22 * sy);
    const titleBaseline = dateBaseline - dateSize - Math.round(6 * sy);

    ctx.save();
    ctx.fillStyle    = "#ffffff";
    ctx.font         = `900 ${titleSize}px "GustanBlackCanvas"`;
    ctx.textAlign    = "right";
    ctx.textBaseline = "alphabetic";
    ctx.fillText((cardti || "").toUpperCase(), W - 25 * sx, titleBaseline);
    ctx.restore();

    drawGradientText(
        ctx,
        acarddate || "",
        W - 25 * sx, dateBaseline,
        `900 ${dateSize}px "GustanBlackCanvas"`,
        DATE_GRAY_STOPS,
        dateSize,
        "rgba(17,24,39,0.78)",
        0.6 * sx,
        "right"
    );

    const copySize = Math.round(12 * sy);
    ctx.save();
    ctx.fillStyle    = "#1f1f1f";
    ctx.font         = `600 ${copySize}px "AileronCanvas"`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`© ${new Date().getFullYear()} MOMENTO TRADING CARDS`, W / 2, H - 8 * sy);
    ctx.restore();
}

// ── BackOne ─────────────────────────────────────────────────────────────────
// JSX (lg = 390×570):
//   dateLabel   : top-10(40px)   left-8(32px)   text-xl(20px)   extrabold  TradingCardDateGrayGradient
//   description : top-22(88px)   left-15(60px)  text-xs(12px)   thin       white/black
//   highlightsTitle: top-44(176px) left-37(148px) text-md(16px) extrabold  white/black
//   highlights  : top-57(228px)  left-15(60px)  text-[13px]    thin       white/black
//   legacyTagline: top-98.5(394px) left-15(60px) text-md(16px) extrabold  white/black
//   legacyText  : top-107(428px) left-15(60px)  text-xs(12px)  thin       white/black
// ─────────────────────────────────────────────────────────────────────────────
async function drawBackOne(ctx, props, W, H) {
    const {
        dateLabel,
        description,
        highlightsTitle,
        highlights = [],
        legacyTagline,
        legacyText,
        isblack,
    } = props;

    const textColor  = isblack ? "#000000" : "#ffffff";
    const safeHighlights = Array.isArray(highlights) ? highlights.slice(0, 6) : [];

    // ── Date label (TradingCardDateGrayGradient, extrabold, text-xl=20px)
    // top-10 = 40px, left-8 = 32px
    const dateText = (dateLabel || "Memory Card").toUpperCase();
    drawGradientText(
        ctx,
        dateText,
        32, 40 + 20,           // x=32, y=baseline = top(40) + fontSize(20)
        `800 20px "AileronCanvas"`,
        DATE_GRAY_STOPS,
        20,
        "rgba(17,24,39,0.78)",
        0.6,
        "left"
    );

    // ── Description (top-22=88px, left-15=60px, text-xs=12px, thin)
    ctx.save();
    ctx.fillStyle    = textColor;
    ctx.font         = `300 12px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    // Clamp to 3 lines manually
    const descWords  = (description || "Add a brief description...").split(" ");
    let   descLine   = "";
    let   descY      = 88;
    const descMaxW   = 270;
    const descLineH  = 14;
    let   descLines  = 0;
    for (const word of descWords) {
        const test = descLine ? descLine + " " + word : word;
        if (ctx.measureText(test).width > descMaxW && descLine) {
            if (descLines < 3) { ctx.fillText(descLine, 60, descY); descY += descLineH; descLines++; }
            descLine = word;
        } else {
            descLine = test;
        }
    }
    if (descLine && descLines < 3) ctx.fillText(descLine, 60, descY);
    ctx.restore();

    // ── Highlights title (top-44=176px, left-37=148px, text-md=16px, extrabold)
    ctx.save();
    ctx.fillStyle    = textColor;
    ctx.font         = `800 16px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText((highlightsTitle || "Highlights").toUpperCase(), 148, 176);
    ctx.restore();

    // ── Highlights list (top-57=228px, left-15=60px, text-[13px])
    const iconSize = 24;
    const gap      = 6;
    let   hlY      = 228;
    const hlLineH  = 28; // mb-1 = 4px + icon(24px)

    if (safeHighlights.length > 0) {
        for (const item of safeHighlights) {
            const icon = typeof item === "object" ? item?.icon : null;
            const text = typeof item === "object" ? item?.text : item;
            if (!text) continue;

            let textX = 60;
            if (icon) {
                try {
                    const iconImg = await loadImage(icon);
                    ctx.drawImage(iconImg, 60, hlY, iconSize, iconSize);
                    textX = 60 + iconSize + gap;
                } catch {}
            }
            ctx.save();
            ctx.fillStyle    = textColor;
            ctx.font         = `300 13px "AileronCanvas"`;
            ctx.textBaseline = "middle";
            ctx.textAlign    = "left";
            ctx.fillText(text, textX, hlY + iconSize / 2);
            ctx.restore();
            hlY += hlLineH;
        }
    } else {
        ctx.save();
        ctx.fillStyle    = textColor;
        ctx.font         = `300 12px "AileronCanvas"`;
        ctx.textBaseline = "top";
        ctx.textAlign    = "left";
        ctx.fillText("Add highlights to show key moments.", 60, 228);
        ctx.restore();
    }

    // ── Legacy tagline (top-98.5=394px, left-15=60px, text-md=16px, extrabold)
    ctx.save();
    ctx.fillStyle    = textColor;
    ctx.font         = `800 16px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText((legacyTagline || "Legacy Tagline").toUpperCase(), 60, 394);
    ctx.restore();

    // ── Legacy text (top-107=428px, left-15=60px, text-xs=12px, thin, 4 lines max)
    ctx.save();
    ctx.fillStyle    = textColor;
    ctx.font         = `300 12px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    const ltWords  = (legacyText || "Legacy text").split(" ");
    let   ltLine   = "";
    let   ltY      = 428;
    const ltMaxW   = 270;
    const ltLineH  = 14;
    let   ltLines  = 0;
    for (const word of ltWords) {
        const test = ltLine ? ltLine + " " + word : word;
        if (ctx.measureText(test).width > ltMaxW && ltLine) {
            if (ltLines < 4) { ctx.fillText(ltLine, 60, ltY); ltY += ltLineH; ltLines++; }
            ltLine = word;
        } else {
            ltLine = test;
        }
    }
    if (ltLine && ltLines < 4) ctx.fillText(ltLine, 60, ltY);
    ctx.restore();
}

async function captureNodeScreenshotForTranding(domNode, baseImageSrc, uploads = [], props = {}) {
    if (typeof window === "undefined" || typeof document === "undefined") return null;
    if (!domNode || !document.body.contains(domNode)) return null;

    await ensureFontsLoaded();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const CARD_W = 390;
    const CARD_H = 570;
    const SCALE  = 3;

    const canvas = document.createElement("canvas");
    canvas.width  = CARD_W * SCALE;
    canvas.height = CARD_H * SCALE;
    const ctx = canvas.getContext("2d");
    ctx.scale(SCALE, SCALE);
    ctx.clearRect(0, 0, CARD_W, CARD_H);

    // Pass 1 — uploaded photo (honour per-upload zoom = live preview scale)
    for (const upload of uploads) {
        try {
            const img = await loadImage(upload.url);
            drawCover(ctx, img, 0, 0, CARD_W, CARD_H, upload.scale ?? 1);
        } catch (e) { console.warn("upload draw failed:", e.message); }
    }

    // Pass 2 — base template
    if (baseImageSrc) {
        try {
            const img = await loadImage(baseImageSrc);
            drawCover(ctx, img, 0, 0, CARD_W, CARD_H);
        } catch (e) { console.warn("base image draw failed:", e.message); }
    }

    // Pass 3 — text overlay
    const {
        isBack = false,
        cardfinder = 0,
        // front props
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        attrIconOne, attrIconTwo, attrIconThree,
        // back props
        backDateDisplay,
        backDescription,
        backHighlightsTitle,
        backHighlightsPreview,
        backLegacyTagline,
        backLegacyText,
        isblack,
    } = props;

    if (isBack) {
        await drawBackOne(ctx, {
            dateLabel:       backDateDisplay,
            description:     backDescription,
            highlightsTitle: backHighlightsTitle,
            highlights:      backHighlightsPreview,
            legacyTagline:   backLegacyTagline,
            legacyText:      backLegacyText,
            isblack,
        }, CARD_W, CARD_H);
    } else {
        const textProps = {
            cardti, carddes,
            name, name2, name3,
            labelone, labeltwo, labelthree,
            acarddate,
            iconOne: attrIconOne, iconTwo: attrIconTwo, iconThree: attrIconThree,
        };
        if      (cardfinder === 0) await drawFrontOne(ctx, textProps, CARD_W, CARD_H);
        else if (cardfinder === 1) await drawFrontTwo(ctx, textProps, CARD_W, CARD_H);
    }

    return canvas.toDataURL("image/png");
}

export default captureNodeScreenshotForTranding;