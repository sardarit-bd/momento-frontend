import {
  formatCardNumber,
  getHeaderLayout,
} from "@/app/componnent/cardHeaderLayout";
import { useEffect, useRef, useState } from "react";
const getTitleSizeStep = (text = "", largeMax = 8, mediumMax = 14) => {
  const len = text.length;
  if (len <= largeMax) return "large";
  if (len <= mediumMax) return "medium";
  return "small";
};
const useIsLg = () => {
  const [isLg, setIsLg] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isLg;
};

const fitText = (ctx, str, maxW) => {
  if (ctx.measureText(str).width <= maxW) return str;
  let s = str;
  while (s.length > 1 && ctx.measureText(`${s}…`).width > maxW) {
    s = s.slice(0, -1);
  }
  return `${s}…`;
};
const handleExport = async () => {
  const element = document.getElementById("card-root");
  if (!element) return;

  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }),
  );

  await Promise.all([
    document.fonts.load("400 16px CorsicaCanvas"),
    document.fonts.load("800 20px AileronCanvas"),
    document.fonts.load("400 16px GustanBlackCanvas"),
    document.fonts.load("400 16px BrunsonCanvas"),
    document.fonts.ready,
  ]);

  await new Promise((r) => setTimeout(r, 150));
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    imageTimeout: 0,
    logging: false,
  });
};

const GradientTitleOne = ({ cardti }) => {
  const canvasRef = useRef(null);
  const titleFontPx =
    getTitleSizeStep(cardti) === "large"
      ? 35
      : getTitleSizeStep(cardti) === "medium"
        ? 26
        : 19;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 390;
    const H = 50;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 2;
      canvas.height = H * 2;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `400 ${titleFontPx}px CorsicaCanvas`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.strokeText(cardti, W - 45, H / 2);

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0.0, "#3a3a3a");
      grad.addColorStop(0.3, "#787878");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(0.7, "#787878");
      grad.addColorStop(1.0, "#3a3a3a");
      ctx.fillStyle = grad;

      ctx.fillText(cardti, W - 45.5, H / 2);
      ctx.fillText(cardti, W - 44.5, H / 2);
      ctx.fillText(cardti, W - 45, H / 2 - 0.3);
      ctx.fillText(cardti, W - 45, H / 2);
    };

    document.fonts.load(`400 ${titleFontPx}px CorsicaCanvas`).then(() => {
      draw();
    });
  }, [cardti, titleFontPx]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        bottom: "18%",
        right: "0px",
        width: "390px",
        height: "50px",
        zIndex: 50,
      }}
    />
  );
};

const GradientTitle = ({ cardti }) => {
  const canvasRef = useRef(null);
  const titleFontPx =
    getTitleSizeStep(cardti) === "large"
      ? 35
      : getTitleSizeStep(cardti) === "medium"
        ? 26
        : 19;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 390;
    const H = 50;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = H * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `400 ${titleFontPx}px BrunsonCanvas`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 0.7;
      ctx.lineJoin = "round";
      ctx.strokeText(cardti, W / 2, H / 2);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0.0, "#3a3a3a");
      grad.addColorStop(0.3, "#787878");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(0.7, "#787878");
      grad.addColorStop(1.0, "#3a3a3a");
      ctx.fillStyle = grad;
      ctx.fillText(cardti, W / 2, H / 2);
    };

    document.fonts.load(`400 ${titleFontPx}px BrunsonCanvas`).then(draw);
  }, [cardti, titleFontPx]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: "0px",
        bottom: "28%",
        width: "390px",
        height: "50px",
        zIndex: 50,
      }}
    />
  );
};

const GradientDateLabel = ({ dateLabel }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 176;
    const H = 30;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 2;
      canvas.height = H * 2;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `400 20px AileronCanvas`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "rgba(0,0,0,0.78)";
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.strokeText((dateLabel || "Memory Card").toUpperCase(), W / 2, H / 2);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0.0, "#d1d5db");
      grad.addColorStop(0.45, "#6b7280");
      grad.addColorStop(1.0, "#6c6d6f");
      ctx.fillStyle = grad;
      ctx.fillText(
        (dateLabel || "Memory Card").toUpperCase(),
        W / 2 - 0.5,
        H / 2,
      );
      ctx.fillText(
        (dateLabel || "Memory Card").toUpperCase(),
        W / 2 + 0.5,
        H / 2,
      );
      ctx.fillText(
        (dateLabel || "Memory Card").toUpperCase(),
        W / 2,
        H / 2 - 0.3,
      );
      ctx.fillText((dateLabel || "Memory Card").toUpperCase(), W / 2, H / 2);
    };

    document.fonts.load(`800 20px AileronCanvas`).then(() => {
      draw();
    });
  }, [dateLabel]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: "46px",
        left: "32px",
        width: "176px",
        height: "30px",
      }}
    />
  );
};

const getTitleFontSizePx = (text = "") => {
  const len = text.length;
  if (len <= 8) return 28;
  if (len <= 12) return 22;
  if (len <= 16) return 18;
  if (len <= 20) return 14;
  return 12;
};

const GradientTitleThree = ({ cardti }) => {
  const canvasRef = useRef(null);
  const step = getTitleSizeStep(cardti, 6, 10);
  const fontPx = step === "large" ? 28.8 : step === "medium" ? 22.4 : 16.8;
  const W = 331.5;
  const H = fontPx * 1.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = Math.round(H * 3);
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `400 ${fontPx}px BrunsonCanvas`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${fontPx * 0.025}px`;
      const label = fitText(ctx, String(cardti || "").toUpperCase(), W);
      ctx.fillStyle = "#000000";
      [
        [-2, -1],
        [1, -1],
        [-2, 1],
        [2, 1],
      ].forEach(([dx, dy]) => ctx.fillText(label, W / 2 + dx, H / 2 + dy));
      ctx.fillStyle = "#00BCFF";
      ctx.fillText(label, W / 2, H / 2);
    };
    document.fonts.load(`400 ${fontPx}px BrunsonCanvas`).then(draw);
  }, [cardti, fontPx, H]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: "-37.05px",
        top: "39.9px",
        width: `${W}px`,
        height: `${H}px`,
        zIndex: 50,
      }}
    />
  );
};

const AttributeLabelMetallicCapture = ({
  text,
  top,
  left,
  width = 140,
  height = 22,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `900 16px GustanBlackCanvas`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const x = 0;
      const y = height / 2;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 0.75;
      ctx.lineJoin = "round";
      ctx.strokeText(text, x, y);
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0.0, "#3a3a3a");
      grad.addColorStop(0.2, "#787878");
      grad.addColorStop(0.6, "#ffffff");
      grad.addColorStop(0.9, "#787878");
      grad.addColorStop(1.0, "#3a3a3a");
      ctx.fillStyle = grad;
      ctx.fillText(text, x, y);
    };

    document.fonts.load(`900 16px GustanBlackCanvas`).then(draw);
  }, [text, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 50,
      }}
    />
  );
};

const GradientBadgeThree = ({ acarddate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 220;
    const H = 60;
    const full = String(acarddate || "");
    const l1 = full.length > 6 ? full.slice(0, 6) : full;
    const l2 = full.length > 6 ? full.slice(6) : null;
    const lines = (l2 ? [l1, l2] : [l1]).map((l) => l.toUpperCase());
    const lineH = 20;
    const blockTop = 10;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = H * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `900 16px GustanBlackCanvas`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = "0.8px";
      const cy = blockTop + (lines.length * lineH) / 2;
      ctx.save();
      ctx.translate(W / 2, cy);
      ctx.transform(1, 0, Math.tan((-6 * Math.PI) / 180), 1, 0, 0);
      ctx.translate(-W / 2, -cy);
      ctx.lineWidth = 0.5;
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#f5731f";
      lines.forEach((line, i) => {
        const y = blockTop + i * lineH + lineH / 2;
        ctx.strokeText(line, W / 2, y);
        ctx.fillText(line, W / 2, y);
      });
      ctx.restore();
    };

    document.fonts.load(`900 16px GustanBlackCanvas`).then(draw);
  }, [acarddate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: "85px",
        top: "503px",
        width: "220px",
        height: "60px",
        zIndex: 50,
      }}
    />
  );
};

const AttrRowCapture = ({ icon, text, value, top, fillColor = "#f56f41" }) => (
  <div
    style={{
      position: "absolute",
      top: `${top}px`,
      left: "40px",
      width: "152px",
      height: "34px",
    }}
  >
    {icon ? (
      <img
        src={icon}
        alt=""
        style={{
          position: "absolute",
          top: "2px",
          left: "0px",
          width: "34px",
          height: "34px",
          objectFit: "contain",
        }}
      />
    ) : null}
    <FrontOneLabelCapture text={text} top={0} left={42} />
    <div
      style={{
        position: "absolute",
        top: "21.5px",
        left: "42px",
        width: "110px",
        height: "7px",
        borderRadius: "9999px",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: "999px",
          backgroundColor: fillColor,
        }}
      />
    </div>
  </div>
);

const AkiraMetallicLabelCapture = ({ text, top, left, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const fontPx = window.matchMedia("(min-width: 1024px)").matches ? 12 : 11;
      const ctx = canvas.getContext("2d");
      canvas.width = width * 3;
      canvas.height = height * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `400 ${fontPx}px AkiraCanvas`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${fontPx * 0.05}px`;
      const label = String(text || "")
        .slice(0, 12)
        .toUpperCase();
      const y = height / 2;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 0.5;
      ctx.lineJoin = "round";
      ctx.strokeText(label, 0, y);
      const grad = ctx.createLinearGradient(
        0,
        y - fontPx / 2,
        0,
        y + fontPx / 2,
      );
      grad.addColorStop(0.0, "#3a3a3a");
      grad.addColorStop(0.05, "#787878");
      grad.addColorStop(0.6, "#ffffff");
      grad.addColorStop(0.9, "#787878");
      grad.addColorStop(1.0, "#3a3a3a");
      ctx.fillStyle = grad;
      ctx.fillText(label, 0, y);
    };

    document.fonts.load(`400 12px AkiraCanvas`).then(draw);
  }, [text, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 50,
      }}
    />
  );
};

const AttrRowCapture2 = ({
  icon,
  text,
  value,
  top,
  left = 50.7,
  fillColor = "#5ba2d8",
  trackColor = "#000000",
}) => {
  const rowW = 288.6;
  const rowH = 24;
  const leftBlockW = rowW * 0.6;
  const barLeft = leftBlockW + 8;
  const barW = rowW - barLeft;
  const barH = 8;

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${rowW}px`,
        height: `${rowH}px`,
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "24px",
            height: "24px",
            objectFit: "contain",
          }}
        />
      )}
      <AkiraMetallicLabelCapture
        text={text}
        top={0}
        left={28}
        width={leftBlockW - 28}
        height={rowH}
      />
      <div
        style={{
          position: "absolute",
          top: `${(rowH - barH) / 2}px`,
          left: `${barLeft}px`,
          width: `${barW}px`,
          height: `${barH}px`,
          borderRadius: "999px",
          backgroundColor: trackColor,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: "999px",
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
};

const AttrRowCapture3 = ({
  icon,
  text,
  value,
  top,
  left = 39,
  slice = false,
  fillColor = "#f56f41",
  trackColor = "#000000",
}) => {
  const rowW = 312;
  const rowH = 20;
  const leftBlockW = rowW * 0.62;
  const barLeft = leftBlockW + 6;
  const barW = rowW - barLeft;
  const barH = 10;
  const shown = slice ? String(text || "").slice(0, 12) : String(text || "");

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${rowW}px`,
        height: `${rowH}px`,
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "20px",
            height: "20px",
            objectFit: "contain",
          }}
        />
      )}
      <GustanMetallicLabelCapture
        text={shown}
        top={0}
        left={24}
        width={leftBlockW - 24}
        height={rowH}
        fontPx={16}
      />
      <div
        style={{
          position: "absolute",
          top: `${(rowH - barH) / 2}px`,
          left: `${barLeft}px`,
          width: `${barW}px`,
          height: `${barH}px`,
          borderRadius: "999px",
          backgroundColor: trackColor,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: "999px",
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
};
const FrontOneLabelCapture = ({ text, top, left }) => {
  const canvasRef = useRef(null);
  const W = 110;
  const H = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = H * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `900 13px GustanBlackCanvas`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = "0.65px";
      const label = fitText(ctx, String(text || "").slice(0, 12), W);
      const y = 9.75;
      ctx.fillStyle = "#000000";
      [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].forEach(([dx, dy]) => ctx.fillText(label, dx, y + dy));
      ctx.fillStyle = "#f5f0f0";
      ctx.fillText(label, 0, y);
    };
    document.fonts.load(`900 13px GustanBlackCanvas`).then(draw);
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${W}px`,
        height: `${H}px`,
        zIndex: 50,
      }}
    />
  );
};

const FrontOneTitleCapture = ({ cardti, acarddate, isLg }) => {
  const canvasRef = useRef(null);
  const step = getTitleSizeStep(cardti);
  const titleFs = step === "large" ? 35.2 : step === "medium" ? 25.6 : 19.2;
  const dateFs = isLg ? 20.8 : 11;
  const titleH = titleFs * 0.8;
  const dateH = dateFs * 1.25;
  const W = 160;
  const H = titleH + dateH;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = Math.round(H * 3);
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "black";
      const grad = (y0, h) => {
        const g = ctx.createLinearGradient(0, y0, 0, y0 + h);
        g.addColorStop(0, "#4f4f4f");
        g.addColorStop(0.2, "#787878");
        g.addColorStop(0.8, "#ffffff");
        g.addColorStop(1, "#ffffff");
        return g;
      };

      ctx.font = `400 ${titleFs}px BrunsonCanvas`;
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${titleFs * 0.025}px`;
      ctx.lineWidth = 0.7;
      ctx.strokeText(String(cardti || ""), W, titleH / 2);
      ctx.fillStyle = grad(0, titleH);
      ctx.fillText(String(cardti || ""), W, titleH / 2);

      ctx.font = `400 ${dateFs}px BrunsonCanvas`;
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${dateFs * 0.025}px`;
      ctx.lineWidth = 0.3;
      ctx.strokeText(String(acarddate || ""), W, titleH + dateH / 2);
      ctx.fillStyle = grad(titleH, dateH);
      ctx.fillText(String(acarddate || ""), W, titleH + dateH / 2);
    };
    document.fonts.load(`400 20px BrunsonCanvas`).then(draw);
  }, [cardti, acarddate, titleFs, dateFs, titleH, dateH, H]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        right: "35.1px",
        top: `${478.8 - H}px`,
        width: `${W}px`,
        height: `${H}px`,
        zIndex: 50,
      }}
    />
  );
};

const GustanMetallicLabelCapture = ({
  text,
  top,
  left,
  width,
  height,
  fontPx = 16,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = width * 3;
      canvas.height = height * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `900 ${fontPx}px GustanBlackCanvas`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${fontPx * 0.05}px`;
      const label = fitText(ctx, String(text || ""), width);
      const y = height / 2;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 0.5;
      ctx.lineJoin = "round";
      ctx.strokeText(label, 0, y);
      const g = ctx.createLinearGradient(0, y - fontPx / 2, 0, y + fontPx / 2);
      g.addColorStop(0.0, "#3a3a3a");
      g.addColorStop(0.05, "#787878");
      g.addColorStop(0.6, "#ffffff");
      g.addColorStop(0.9, "#787878");
      g.addColorStop(1.0, "#3a3a3a");
      ctx.fillStyle = g;
      ctx.fillText(label, 0, y);
    };
    document.fonts.load(`900 ${fontPx}px GustanBlackCanvas`).then(draw);
  }, [text, width, height, fontPx]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 50,
      }}
    />
  );
};

const AttributeNameThreeCapture = ({ text }) => {
  const canvasRef = useRef(null);
  const W = 300;
  const H = 21;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = H * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `800 14px BrunsonBold`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = "0.7px";
      ctx.fillStyle = "#000000";
      ctx.fillText(String(text || "").toUpperCase(), W / 2, H / 2);
    };
    document.fonts.load(`800 14px BrunsonBold`).then(draw, draw);
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: "52.8px",
        top: "382.55px",
        width: `${W}px`,
        height: `${H}px`,
        zIndex: 50,
      }}
    />
  );
};

const InkCenteredTextCapture = ({
  text,
  cx,
  cy,
  font,
  color = "#000000",
  letterSpacing = 0,
  w = 260,
  h = 24,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = w * 3;
      canvas.height = h * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, w, h);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${letterSpacing}px`;
      const label = String(text ?? "");
      const m = ctx.measureText(label);
      const asc = m.actualBoundingBoxAscent ?? 0;
      const desc = m.actualBoundingBoxDescent ?? 0;
      ctx.fillStyle = color;
      ctx.fillText(label, w / 2, h / 2 + (asc - desc) / 2);
    };
    document.fonts.load(font).then(draw, draw);
  }, [text, font, color, letterSpacing, w, h]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: `${cx - w / 2}px`,
        top: `${cy - h / 2}px`,
        width: `${w}px`,
        height: `${h}px`,
        zIndex: 60,
      }}
    />
  );
};
const CardHeaderCapture = ({
  template = 0,
  cardNumber,
  topLeftIcon,
  topRightIcon,
}) => {
  const L = getHeaderLayout(template);
  const numberText = formatCardNumber(cardNumber);
  const radius =
    typeof L.iconRadius === "number" ? `${L.iconRadius}px` : L.iconRadius;
  const frame = {
    position: "absolute",
    width: `${L.iconSize}px`,
    height: `${L.iconSize}px`,
    boxSizing: "border-box",
    borderRadius: radius,
    overflow: "hidden",
    backgroundColor: L.iconBg,
    zIndex: 50,
    ...(L.drawFrame
      ? {
          border: `${L.frameWidth}px solid ${L.frameColor}`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.6)",
        }
      : {}),
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };
  return (
    <>
      {L.numberInPill && numberText && (
        <InkCenteredTextCapture
          text={numberText}
          cx={L.numberPillCx}
          cy={L.numberPillCy}
          w={L.numberPillWidth}
          h={24}
          font={`900 ${L.numberPillFontSize}px GustanBlackCanvas`}
          color={L.numberPillColor}
          letterSpacing={0.5}
        />
      )}
      <div
        style={{
          ...frame,
          top: `${L.leftIconTop ?? L.iconTop}px`,
          left: `${L.leftIconSide ?? L.iconSideOffset}px`,
        }}
      >
        {topLeftIcon ? <img src={topLeftIcon} alt="" style={imgStyle} /> : null}
      </div>
      {!L.numberInPill && numberText && (
        <span
          style={{
            position: "absolute",
            top: `${L.numberTop + (L.numberCaptureOffsetY || 0)}px`,
            left: "0px",
            width: "390px",
            textAlign: "center",
            fontFamily: "BrunsonCanvas",
            fontSize: `${L.numberFontSize}px`,
            lineHeight: 1,
            color: "#ffffff",
            whiteSpace: "nowrap",
            zIndex: 50,
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {numberText}
        </span>
      )}
    </>
  );
};
export const FrontOneCapture = ({
  cardti,
  name,
  name2,
  name3,
  acarddate,
  labelone,
  labeltwo,
  labelthree,
  iconOne,
  iconTwo,
  iconThree,
  cardNumber,
  topLeftIcon,
  topRightIcon,
}) => {
  const currentYear = new Date().getFullYear();
  const isLg = useIsLg();
  const pitch = isLg ? 42 : 40;
  const lastRowTop = 476;

  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <AttrRowCapture
        icon={iconOne}
        text={name}
        value={labelone}
        top={lastRowTop - pitch * 2}
      />
      <AttrRowCapture
        icon={iconTwo}
        text={name2}
        value={labeltwo}
        top={lastRowTop - pitch}
      />
      <AttrRowCapture
        icon={iconThree}
        text={name3}
        value={labelthree}
        top={lastRowTop}
      />
      <CardHeaderCapture
        template={0}
        cardNumber={cardNumber}
        topLeftIcon={topLeftIcon}
        topRightIcon={topRightIcon}
      />
      <FrontOneTitleCapture cardti={cardti} acarddate={acarddate} isLg={isLg} />

      <InkCenteredTextCapture
        text={`© ${currentYear} MOMENTO TRADING CARDS`}
        cx={195}
        cy={531.3}
        w={260}
        h={20}
        font={`400 8px Arial, Helvetica, sans-serif`}
        color="#1f1f1f"
        letterSpacing={0.4}
      />
    </div>
  );
};

const splitDateLines = (text) => {
  const full = String(text || "").trim();
  const m = full.match(/^(.*?)\s+(OF\s+.*)$/i);
  return (m ? [m[1], m[2]] : [full]).map((l) => l.toUpperCase());
};

const DateBadgeTwoCapture = ({
  acarddate,
  top = 510,
  fontPx = 15,
  lineH = 17,
}) => {
  const canvasRef = useRef(null);
  const W = 220;
  const full = String(acarddate || "").trim();
  const H = splitDateLines(full).length * lineH;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !full) return;
    const lines = splitDateLines(full);
    const h = lines.length * lineH;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 3;
      canvas.height = h * 3;
      ctx.scale(3, 3);
      ctx.clearRect(0, 0, W, h);
      ctx.font = `900 ${fontPx}px GustanBlackCanvas`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = `${fontPx * 0.05}px`;
      ctx.save();
      ctx.translate(W / 2, h / 2);
      ctx.transform(1, 0, Math.tan((-6 * Math.PI) / 180), 1, 0, 0);
      ctx.translate(-W / 2, -h / 2);
      ctx.lineWidth = 0.5;
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#f5731f";
      lines.forEach((line, i) => {
        const y = i * lineH + lineH / 2;
        ctx.strokeText(line, W / 2, y);
        ctx.fillText(line, W / 2, y);
      });
      ctx.restore();
    };

    document.fonts.load(`900 ${fontPx}px GustanBlackCanvas`).then(draw);
  }, [full, fontPx, lineH]);

  if (!full) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: `${(390 - W) / 2}px`,
        top: `${top}px`,
        width: `${W}px`,
        height: `${H}px`,
        zIndex: 50,
      }}
    />
  );
};

export const FrontTwoCapture = ({
  cardti,
  name,
  name2,
  name3,
  acarddate,
  labelone,
  labeltwo,
  labelthree,
  iconOne,
  iconTwo,
  iconThree,
  cardNumber,
  topLeftIcon,
  topRightIcon,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <CardHeaderCapture
        template={1}
        cardNumber={cardNumber}
        topLeftIcon={topLeftIcon}
        topRightIcon={topRightIcon}
      />
      <GradientTitle cardti={cardti} />

      <AttrRowCapture2
        icon={iconOne}
        text={name}
        value={labelone}
        top={423.9}
      />
      <AttrRowCapture2
        icon={iconTwo}
        text={name2}
        value={labeltwo}
        top={447.9}
      />
      <AttrRowCapture2
        icon={iconThree}
        text={name3}
        value={labelthree}
        top={471.9}
      />

      <DateBadgeTwoCapture acarddate={acarddate} />

      <InkCenteredTextCapture
        text={`© ${currentYear} MOMENTO TRADING CARDS`}
        cx={195}
        cy={556.3}
        w={260}
        h={20}
        font={`400 8px Arial, Helvetica, sans-serif`}
        color="#1f1f1f"
        letterSpacing={0.4}
      />
    </div>
  );
};

export const FrontThreeCapture = ({
  cardti,
  name,
  name2,
  name3,
  acarddate,
  labelone,
  labeltwo,
  labelthree,
  iconOne,
  iconTwo,
  iconThree,
  attributeName,
  cardNumber,
  topLeftIcon,
  topRightIcon,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <CardHeaderCapture
        template={2}
        cardNumber={cardNumber}
        topLeftIcon={topLeftIcon}
        topRightIcon={topRightIcon}
      />
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "0px",
        }}
      >
        <GradientTitleThree cardti={cardti} offsetX={-6} />
      </div>

      <span
        style={{
          position: "absolute",
          top: "375px",
          left: "10px",
          width: "390px",
          textAlign: "center",
          fontFamily: "DinBold",
          fontWeight: 700,
          fontSize: "14px",
          color: "#000000",
          textTransform: "uppercase",
        }}
      >
        {attributeName || "Attributes"}
      </span>

      <AttrRowCapture3
        icon={iconOne}
        text={name}
        value={labelone}
        top={417}
        left={39}
      />
      <AttrRowCapture3
        icon={iconTwo}
        text={name2}
        value={labeltwo}
        top={441}
        left={39}
      />
      <AttrRowCapture3
        icon={iconThree}
        text={name3}
        value={labelthree}
        top={465}
        left={39}
      />

      <GradientBadgeThree acarddate={acarddate} />

      <InkCenteredTextCapture
        text={`© ${currentYear} MOMENTO TRADING CARDS`}
        cx={195}
        cy={558}
        w={260}
        h={20}
        font={`600 8px DinBold`}
        color="#1f1f1f"
        letterSpacing={0.2}
      />
    </div>
  );
};

export const BackOneCapture = ({
  dateLabel,
  description,
  highlightsTitle,
  highlights = [],
  legacyTagline,
  legacyText,
  isblack,
}) => {
  const safeHighlights = Array.isArray(highlights)
    ? highlights.slice(0, 6)
    : [];
  const textColor = isblack ? "#000000" : "#ffffff";

  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <GradientDateLabel dateLabel={dateLabel} />

      <span
        style={{
          position: "absolute",
          top: "88px",
          left: "60px",
          width: "270px",
          fontFamily: "AileronCanvas",
          fontWeight: 300,
          fontSize: "12px",
          color: textColor,
          letterSpacing: "0.05em",
          lineHeight: 1.1,
          textAlign: "center",
        }}
      >
        {description || "Add a brief description..."}
      </span>

      <span
        style={{
          position: "absolute",
          top: "166px",
          left: "148px",
          width: "185px",
          fontFamily: "AileronCanvas",
          fontWeight: 800,
          fontSize: "16px",
          color: textColor,
          letterSpacing: "-0.02em",
          textAlign: "left",
        }}
      >
        {(highlightsTitle || "Highlights").toUpperCase()}
      </span>

      {safeHighlights.length > 0 ? (
        <div
          style={{
            position: "absolute",
            top: "228px",
            left: "60px",
            width: "270px",
          }}
        >
          {safeHighlights.map((item, idx) => {
            const icon = typeof item === "object" ? item?.icon : null;
            const text = typeof item === "object" ? item?.text : item;

            const rowHeight = 24;
            const iconSize = 24;
            const fontSize = 13;
            const exportOffset = 7;

            const iconTop = (rowHeight - iconSize) / 2;
            const textTop = (rowHeight - fontSize) / 2 - exportOffset;

            return (
              <div
                key={`${text || "highlight"}-${idx}`}
                style={{
                  position: "relative",
                  height: `${rowHeight}px`,
                  marginBottom: "4px",
                }}
              >
                {icon ? (
                  <img
                    src={icon}
                    alt=""
                    style={{
                      position: "absolute",
                      top: `${iconTop}px`,
                      left: "0px",
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      objectFit: "contain",
                    }}
                  />
                ) : null}
                <span
                  style={{
                    position: "absolute",
                    top: `${textTop}px`,
                    left: icon ? "30px" : "0px",
                    fontFamily: "AileronCanvas",
                    fontWeight: 300,
                    fontSize: `${fontSize}px`,
                    lineHeight: 1,
                    color: textColor,
                    whiteSpace: "nowrap",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <span
          style={{
            position: "absolute",
            top: "228px",
            left: "60px",
            width: "270px",
            fontFamily: "AileronCanvas",
            fontWeight: 300,
            fontSize: "12px",
            color: textColor,
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          Add highlights to show key moments.
        </span>
      )}

      <span
        style={{
          display: "block",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          position: "absolute",
          top: "390px",
          left: "148px",
          width: "185px",
          fontFamily: "AileronCanvas",
          fontWeight: 800,
          fontSize: "16px",
          color: textColor,
          letterSpacing: "-0.02em",
          textAlign: "left",
        }}
      >
        {(legacyTagline || "Legacy Tagline").toUpperCase()}
      </span>

      <span
        style={{
          display: "block",
          lineHeight: 1.1,
          padding: 0,
          margin: 0,
          position: "absolute",
          top: "420px",
          left: "60px",
          width: "270px",
          fontFamily: "AileronCanvas",
          fontWeight: 300,
          fontSize: "12px",
          color: textColor,
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        {legacyText || "Legacy text"}
      </span>
    </div>
  );
};
