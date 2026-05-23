'use client';

import { forwardRef } from "react";

const TradingBoxPreview = forwardRef(({ packTitle = "", createdFor = "" }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                width: "420px",
                aspectRatio: "5000 / 2800",
                overflow: "hidden",
                display: "block",
                border: "none",
                outline: "none",
                background: "transparent",
            }}
        >
            {/* Base box image */}
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

            {/* PACK TITLE overlay */}
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
                <span
                    style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "7px",
                        textAlign: "center",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                        letterSpacing: "0.04em",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                    }}
                >
                    {packTitle || "PACK TITLE"}
                </span>
            </div>

            {/* CREATED FOR overlay */}
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
                <span
                    style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "7px",
                        textAlign: "center",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                        letterSpacing: "0.04em",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                    }}
                >
                    {createdFor || "CREATED FOR"}
                </span>
            </div>
        </div>
    );
});

TradingBoxPreview.displayName = "TradingBoxPreview";
export default TradingBoxPreview;