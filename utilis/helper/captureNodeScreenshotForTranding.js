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

function drawCover(ctx, img, x, y, w, h) {
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
    // JSX grid: col1=34px icon, gap=8px, col2=text+bar
    // icon (34×34) — top-aligned at y
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

    // Label — paddingTop 2px from JSX
    ctx.save();
    ctx.fillStyle    = textColor;
    ctx.font         = `${fontSize}px "${fontFamily}"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText(text || "", textX, y + 2);
    ctx.restore();

    // Bar — paddingBottom 3px + bar (JSX: mt-[4px] from span)
    const barY = y + fontSize + 9;  // 2(paddingTop) + fontSize + 3(paddingBottom) + 4(mt)

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
// JSX (lg = 390×570):
//   description : top-111 (444px)  left-8 (32px)   text-xs(12px)  Aileron thin
//   metrics     : left-[40px]  bottom-[60px]  w-[132px]
//                 mt-2 (8px) between rows
//   title       : right-[40px]  bottom-[16%]   text-[2.1rem](33.6px)  CorsicaFont
//   date        : below title   text-[1rem](16px)  CorsicaFont
//   copyright   : bottom-[33px] center  text-[10px]  BrunsonFont
// ───────────────────────────────────────────────────────────────────────────
async function drawFrontOne(ctx, props, W, H) {
    const {
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        iconOne, iconTwo, iconThree,
    } = props;

    // ── Description
    // top-111 = 111 * 4px = 444px,  left-8 = 32px
    ctx.save();
    ctx.fillStyle    = "rgba(255,255,255,0.9)";
    ctx.font         = `300 12px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText(carddes || "", 32, 444);
    ctx.restore();

    // ── Attribute metrics
    // bottom-[60px] → top of block = H - 60 - totalHeight
    // Each row: icon(34) + bar below text. Row height = 34 + mt-2(8) = ~42px
    // but JSX uses mt-1.5(6px) between rows for lg, so rowGap = 6
    const iconSize  = 34;
    const barH      = 7;
    const fontSize  = 13;
    const rowGap    = 8;   // mt-2 = 8px
    const rowHeight = iconSize + rowGap;  // 42px
    const barWidth  = 132;
    const metricsBottom = 60;
    const totalMetricsH = rowHeight * 3 - rowGap; // 3 rows
    const startY = H - metricsBottom - totalMetricsH;

    const metBase = {
        barWidth, fontSize,
        fontFamily: "GustanBlackCanvas",
        textColor:  "#f7f7f7",
        trackColor: "#000000",
        fillColor:  "#f56f41",
    };
    await drawAttributeMetric(ctx, { ...metBase, iconSrc: iconOne,   text: name,  value: labelone,   x: 40, y: startY });
    await drawAttributeMetric(ctx, { ...metBase, iconSrc: iconTwo,   text: name2, value: labeltwo,   x: 40, y: startY + rowHeight });
    await drawAttributeMetric(ctx, { ...metBase, iconSrc: iconThree, text: name3, value: labelthree, x: 40, y: startY + rowHeight * 2 });

    // ── Title
    // right-[40px]  bottom-[16%] → baseline y = H - H*0.16 = H - 91.2 ≈ H - 91
    // text-[2.1rem] = 33.6px → use 34px, CorsicaFont 900, TradingCardTitleMetal
    const titleSize = 34;
    const titleY    = H - Math.round(H * 0.16);  // 479
    drawGradientText(
        ctx,
        cardti || "",
        W - 40, titleY,
        `900 ${titleSize}px "CorsicaCanvas"`,
        METAL_STOPS,
        titleSize,
        "rgba(107,114,128,0.9)",
        1.2,
        "right"
    );

    // ── Date
    // block below title, text-[1rem] = 16px, CorsicaFont, TradingCardDateGrayGradient
    // leading-tight ≈ 1.25 → line height = titleSize * 1.25 = 42.5 → dateY = titleY + 20
    const dateSize = 16;
    const dateY    = titleY + titleSize * 0.6 + dateSize;  // snug below title
    drawGradientText(
        ctx,
        acarddate || "",
        W - 40, dateY,
        `900 ${dateSize}px "CorsicaCanvas"`,
        DATE_GRAY_STOPS,
        dateSize,
        "rgba(17,24,39,0.78)",
        0.6,
        "right"
    );

    // ── Copyright
    // bottom-[33px] center, text-[10px], BrunsonFont, #1f1f1f
    ctx.save();
    ctx.fillStyle    = "#1f1f1f";
    ctx.font         = `400 10px "BrunsonCanvas"`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`© ${new Date().getFullYear()} MOMENTO TRADING CARDS`, W / 2, H - 33);
    ctx.restore();
}

// ── FrontTwo ────────────────────────────────────────────────────────────────
// (unchanged from previous version — update if JSX changes)
// ───────────────────────────────────────────────────────────────────────────
async function drawFrontTwo(ctx, props, W, H) {
    const {
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        iconOne, iconTwo, iconThree,
    } = props;

    ctx.save();
    ctx.fillStyle    = "rgba(240,240,240,0.9)";
    ctx.font         = `300 12px "AileronCanvas"`;
    ctx.textBaseline = "top";
    ctx.textAlign    = "left";
    ctx.fillText(carddes || "", 32, 434);
    ctx.restore();

    const rowHeight = 42;
    const startY    = H - 33 - rowHeight * 3;
    const metBase   = {
        barWidth:   132,
        fontSize:   13,
        fontFamily: "GustanBlackCanvas",
        textColor:  "#f7f7f7",
        trackColor: "#000000",
        fillColor:  "#5ba2d8",
    };
    await drawAttributeMetric(ctx, { ...metBase, iconSrc: iconOne,   text: name,  value: labelone,   x: 25, y: startY });
    await drawAttributeMetric(ctx, { ...metBase, iconSrc: iconTwo,   text: name2, value: labeltwo,   x: 25, y: startY + rowHeight });
    await drawAttributeMetric(ctx, { ...metBase, iconSrc: iconThree, text: name3, value: labelthree, x: 25, y: startY + rowHeight * 2 });

    const dateBaseline  = H - 33;
    const titleBaseline = dateBaseline - 28;

    ctx.save();
    ctx.fillStyle    = "#ffffff";
    ctx.font         = `900 24px "GustanBlackCanvas"`;
    ctx.textAlign    = "right";
    ctx.textBaseline = "alphabetic";
    ctx.fillText((cardti || "").toUpperCase(), W - 25, titleBaseline);
    ctx.restore();

    drawGradientText(
        ctx,
        acarddate || "",
        W - 25, dateBaseline,
        `900 22px "GustanBlackCanvas"`,
        DATE_GRAY_STOPS,
        22,
        "rgba(17,24,39,0.78)",
        0.6,
        "right"
    );

    ctx.save();
    ctx.fillStyle    = "#1f1f1f";
    ctx.font         = `600 12px "AileronCanvas"`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`© ${new Date().getFullYear()} MOMENTO TRADING CARDS`, W / 2, H - 8);
    ctx.restore();
}

// ── Main export ─────────────────────────────────────────────────────────────

async function captureNodeScreenshotForTranding(domNode, baseImageSrc, uploads = [], props = {}) {
    if (typeof window === "undefined" || typeof document === "undefined") return null;
    if (!domNode || !document.body.contains(domNode)) return null;

    await ensureFontsLoaded();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const CARD_W = domNode.offsetWidth  || 390;
    const CARD_H = domNode.offsetHeight || 570;
    const SCALE  = 3;

    const canvas = document.createElement("canvas");
    canvas.width  = CARD_W * SCALE;
    canvas.height = CARD_H * SCALE;
    const ctx = canvas.getContext("2d");
    ctx.scale(SCALE, SCALE);
    ctx.clearRect(0, 0, CARD_W, CARD_H);

    for (const upload of uploads) {
        try {
            const img = await loadImage(upload.url);
            drawCover(ctx, img, 0, 0, CARD_W, CARD_H);
        } catch (e) { console.warn("upload draw failed:", e.message); }
    }

    if (baseImageSrc) {
        try {
            const img = await loadImage(baseImageSrc);
            drawCover(ctx, img, 0, 0, CARD_W, CARD_H);
        } catch (e) { console.warn("base image draw failed:", e.message); }
    }

    const {
        cardfinder = 0,
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        attrIconOne, attrIconTwo, attrIconThree,
    } = props;

    const textProps = {
        cardti, carddes,
        name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate,
        iconOne: attrIconOne, iconTwo: attrIconTwo, iconThree: attrIconThree,
    };

    if      (cardfinder === 0) await drawFrontOne(ctx, textProps, CARD_W, CARD_H);
    else if (cardfinder === 1) await drawFrontTwo(ctx, textProps, CARD_W, CARD_H);

    return canvas.toDataURL("image/png");
}

export default captureNodeScreenshotForTranding;