import { useRef, useEffect } from "react";

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
      ctx.font = `400 29px CorsicaCanvas`;
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

    document.fonts.load(`400 29px CorsicaCanvas`).then(() => {
      draw();
    });
  }, [cardti]);

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
      ctx.font = `400 30px CorsicaCanvas`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2.5;
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

    document.fonts.load(`400 30px CorsicaCanvas`).then(() => {
      draw();
    });
  }, [cardti]);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 340;
    const H = 50;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 2;
      canvas.height = H * 2;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, W, H);

      const fontSize = getTitleFontSizePx(cardti);
      ctx.font = `700 ${fontSize}px DinBold`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";
      ctx.strokeText(cardti.toUpperCase(), W / 2, H / 2);
      ctx.fillStyle = "#00BCFF";
      ctx.fillText(cardti.toUpperCase(), W / 2, H / 2);
    };

    document.fonts
      .load(`700 ${getTitleFontSizePx(cardti)}px DinBold`)
      .then(draw);
  }, [cardti]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: "32px",
        left: "25px",
        width: "340px",
        height: "50px",
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

const GradientBadgeThree = ({ acarddate, offsetY = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 220;
    const H = 60;

    const dateLine1 = acarddate.length > 6 ? acarddate.slice(0, 6) : acarddate;
    const dateLine2 = acarddate.length > 6 ? acarddate.slice(6) : null;
    const lines = dateLine2 ? [dateLine1, dateLine2] : [dateLine1];

    const draw = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = W * 2;
      canvas.height = H * 2;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `700 18px DinBold`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lineHeight = 22;
      const totalHeight = lines.length * lineHeight;
      const startY = H / 2 - totalHeight / 2 + lineHeight / 2 + offsetY;
      const skew = Math.tan((-6 * Math.PI) / 180);

      lines.forEach((line, i) => {
        const text = line.toUpperCase();
        const y = startY + i * lineHeight;
        ctx.save();
        ctx.translate(W / 2, y);
        ctx.transform(1, 0, skew, 1, 0, 0);
        ctx.translate(-(W / 2), -y);

        ctx.shadowColor = "transparent";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#ffffff";
        ctx.strokeText(text, W / 2, y);
        ctx.shadowColor = "rgba(0,0,0,0.55)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "#f5731f";
        ctx.fillText(text, W / 2, y);

        ctx.restore();
      });
    };

    document.fonts.load(`700 18px DinBold`).then(() => {
      draw();
    });
  }, [acarddate, offsetY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: "85px",
        top: "505px",
        width: "220px",
        height: "60px",
        zIndex: 50,
      }}
    />
  );
};

const AttrRowCapture = ({ icon, text, value, top, left, fillColor }) => (
  <div
    style={{
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
      width: "176px",
      height: "44px",
    }}
  >
    {icon ? (
      <img
        src={icon}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "34px",
          height: "34px",
          objectFit: "contain",
        }}
      />
    ) : null}
    <span
      style={{
        position: "absolute",
        bottom: "28px",
        left: "42px",
        fontFamily: "Libertad",
        fontWeight: 600,
        fontSize: "13px",
        color: "#f5f0f0",
        textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
    <div
      style={{
        position: "absolute",
        top: "24px",
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
          borderRadius: "9999px",
          backgroundColor: fillColor,
        }}
      />
    </div>
  </div>
);

const AttrRowCapture2 = ({
  icon,
  text,
  value,
  top,
  left,
  fillColor = "#5ba2d8",
  trackColor = "#000000",
}) => {
  const rowHeight = 32;
  const iconSize = 24;
  const gap = 8;
  const barWidth = 90;
  const barHeight = 8;
  const totalWidth = 290;

  const barLeft = totalWidth - barWidth;
  const textLeft = iconSize + gap;
  const textWidth = barLeft - gap - textLeft;

  const exportOffset = 2;

  const iconTop = (rowHeight - iconSize) / 2 - exportOffset;
  const barTop = (rowHeight - barHeight) / 2 - exportOffset;
  const textTop = 0;

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${totalWidth}px`,
        height: `${rowHeight}px`,
      }}
    >
      {icon && (
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
      )}

      <span
        style={{
          position: "absolute",
          top: `${textTop}px`,
          left: `${textLeft}px`,
          width: `${textWidth}px`,
          fontFamily: "GustanBlackCanvas",
          fontWeight: 900,
          fontSize: "14px",
          color: "#f7f7f7",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px  1px 0 #000,
                        1px  1px 0 #000
                    `,
        }}
      >
        {text}
      </span>
      <div
        style={{
          position: "absolute",
          top: `${barTop}px`,
          left: `${barLeft}px`,
          width: `${barWidth}px`,
          height: `${barHeight}px`,
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
  left,
  fillColor = "#f56f41",
  trackColor = "#000000",
}) => {
  const rowHeight = 26;
  const iconSize = 20;
  const gap = 6;
  const barWidth = 100;
  const barHeight = 8;
  const totalWidth = 260;

  const textLeft = iconSize + gap;
  const textWidth = totalWidth - barWidth - textLeft - gap;
  const barLeft = totalWidth - barWidth;

  const exportOffset = 2;

  const iconTop = (rowHeight - iconSize) / 2 - exportOffset;
  const barTop = (rowHeight - barHeight) / 2 - exportOffset;

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${totalWidth}px`,
        height: `${rowHeight}px`,
      }}
    >
      {icon && (
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
      )}

      <AttributeLabelMetallicCapture
        text={text}
        top={0}
        left={textLeft}
        width={textWidth}
        height={rowHeight}
      />

      <div
        style={{
          position: "absolute",
          top: `${barTop}px`,
          left: `${barLeft}px`,
          width: `${barWidth}px`,
          height: `${barHeight}px`,
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
}) => {
  const currentYear = new Date().getFullYear();
  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <AttrRowCapture
        icon={iconOne}
        text={name}
        value={labelone}
        top={384}
        left={40}
        fillColor="#f56f41"
      />
      <AttrRowCapture
        icon={iconTwo}
        text={name2}
        value={labeltwo}
        top={426}
        left={40}
        fillColor="#f56f41"
      />
      <AttrRowCapture
        icon={iconThree}
        text={name3}
        value={labelthree}
        top={468}
        left={40}
        fillColor="#f56f41"
      />

      <GradientTitleOne cardti={cardti} />

      <span
        style={{
          position: "absolute",
          top: "450px",
          right: "45px",
          width: "350px",
          fontFamily: "CorsicaCanvas",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "#f3f3f3",
          textAlign: "right",
          WebkitTextStroke: "2px black",
          paintOrder: "stroke fill",
          color: "#b8acac",
        }}
      >
        {acarddate}
      </span>

      <span
        style={{
          position: "absolute",
          top: "518px",
          left: "0px",
          width: "390px",
          fontFamily: "BrunsonCanvas",
          fontWeight: 100,
          fontSize: "10px",
          color: "#1f1f1f",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        © {currentYear} MOMENTO TRADING CARDS
      </span>
    </div>
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
}) => {
  const currentYear = new Date().getFullYear();
  const dateParts = acarddate.match(/^(.*?)\s+(OF\s+.*)$/i);

  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <GradientTitle cardti={cardti} />

      <AttrRowCapture2
        icon={iconOne}
        text={name}
        value={labelone}
        top={420}
        left={50}
        fillColor="#5ba2d8"
      />
      <AttrRowCapture2
        icon={iconTwo}
        text={name2}
        value={labeltwo}
        top={445}
        left={50}
        fillColor="#5ba2d8"
      />
      <AttrRowCapture2
        icon={iconThree}
        text={name3}
        value={labelthree}
        top={470}
        left={50}
        fillColor="#5ba2d8"
      />

      <div
        style={{
          position: "absolute",
          top: "507px",
          left: "0px",
          width: "390px",
          textAlign: "center",
        }}
      >
        <svg width="390" height="40">
          <defs>
            <linearGradient id="dateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c86363" />
              <stop offset="25%" stopColor="#ff6b6b" />
              <stop offset="55%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#f02e2e" />
            </linearGradient>
          </defs>

          <text
            x="195"
            y="20"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill="url(#dateGradient)"
          >
            <tspan x="195" dy="0">
              {dateParts ? dateParts[1] : ""}
            </tspan>

            <tspan x="195" dy="18">
              {dateParts ? dateParts[2] : acarddate}
            </tspan>
          </text>
        </svg>
      </div>

      <span
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",

          fontFamily: "BrunsonFont",
          fontWeight: 300,
          fontSize: "8px",

          color: "#1f1f1f",

          letterSpacing: "0.1em",
          textAlign: "center",
          whiteSpace: "nowrap",

          lineHeight: 1,

          zIndex: 50,
        }}
      >
        © {currentYear} MOMENTO TRADING CARDS
      </span>
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
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ position: "relative", width: "390px", height: "570px" }}>
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "-30px",
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
        left={65}
      />
      <AttrRowCapture3
        icon={iconTwo}
        text={name2}
        value={labeltwo}
        top={441}
        left={65}
      />
      <AttrRowCapture3
        icon={iconThree}
        text={name3}
        value={labelthree}
        top={465}
        left={65}
      />

      <GradientBadgeThree acarddate={acarddate} />

      <span
        style={{
          position: "absolute",
          bottom: "6px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "DinBold",
          fontWeight: 700,
          fontSize: "8px",
          color: "#1f1f1f",
          letterSpacing: "0.05em",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        © {currentYear} MOMENTO TRADING CARDS
      </span>
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
