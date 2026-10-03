"use client";

import { forwardRef } from "react";

const BOX_WIDTH_PX = 420;
const BASE_FONT_PX = 7;
const MIN_FONT_PX = 4;
const LETTER_SPACING_EM = 0.04;
const PILL_WIDTH_PX = BOX_WIDTH_PX * 0.18;
const PILL_TEXT_MAX_WIDTH_PX = PILL_WIDTH_PX * 0.88;
const FONT_FAMILY = "Arial, Helvetica, sans-serif";

let measureCtx = null;

const getFittedFontSize = (text) => {
  const value = String(text || "");
  if (!value || typeof document === "undefined") return BASE_FONT_PX;
  if (!measureCtx) {
    measureCtx = document.createElement("canvas").getContext("2d");
  }
  if (!measureCtx) return BASE_FONT_PX;

  measureCtx.font = `bold ${BASE_FONT_PX}px ${FONT_FAMILY}`;
  const textWidth =
    measureCtx.measureText(value).width +
    value.length * LETTER_SPACING_EM * BASE_FONT_PX;

  if (textWidth <= PILL_TEXT_MAX_WIDTH_PX) return BASE_FONT_PX;
  return Math.max(
    MIN_FONT_PX,
    (BASE_FONT_PX * PILL_TEXT_MAX_WIDTH_PX) / textWidth,
  );
};

const PillText = ({ value, fallback }) => {
  const text = value || fallback;
  return (
    <span
      style={{
        color: "#ffffff",
        fontWeight: "bold",
        fontFamily: FONT_FAMILY,
        fontSize: `${getFittedFontSize(text)}px`,
        textAlign: "center",
        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
        letterSpacing: `${LETTER_SPACING_EM}em`,
        border: "none",
        outline: "none",
        background: "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
};

const TradingBoxPreview = forwardRef(
  ({ packTitle = "", createdFor = "" }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: `${BOX_WIDTH_PX}px`,
          aspectRatio: "5000 / 2800",
          overflow: "hidden",
          display: "block",
          border: "none",
          outline: "none",
          background: "transparent",
        }}
      >
        <img
          src="/tradingbox.png"
          alt="Trading Card Box"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            border: "none",
            outline: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "30%",
            top: "85%",
            width: "18%",
            height: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        >
          <PillText value={packTitle} fallback="PACK TITLE" />
        </div>

        <div
          style={{
            position: "absolute",
            left: "53%",
            top: "85%",
            width: "18%",
            height: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        >
          <PillText value={createdFor} fallback="CREATED FOR" />
        </div>
      </div>
    );
  },
);

TradingBoxPreview.displayName = "TradingBoxPreview";
export default TradingBoxPreview;
