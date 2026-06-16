import React from "react";
import { FrontOneCapture, FrontTwoCapture, BackOneCapture } from "@/app/componnent/TextOverlayerCapture";

/**
 * Hidden, always-mounted 390x570 node used ONLY for html2canvas capture.
 * Rendered off-screen so it never affects visible layout.
 * Accepts the same props as the live preview state.
 */
const TradingCardCaptureNode = React.forwardRef(({
    workingcard,
    baseFront,
    baseBack,
    cardfinder,
    uploads = [],
    cardti,
    carddes,
    displayAttributeOne,
    displayAttributeTwo,
    displayAttributeThree,
    acarddate,
    labelone,
    labeltwo,
    labelthree,
    attrIconOne,
    attrIconTwo,
    attrIconThree,
    backDateDisplay,
    backDescription,
    backHighlightsTitle,
    backHighlightsPreview,
    backLegacyTagline,
    backLegacyText,
    isblack,
}, ref) => {
    const baseImage = workingcard === "front" ? baseFront : baseBack;

    return (
        <div
            ref={ref}
            style={{
                position: "fixed",
                top: "-9999px",
                left: "-9999px",
                width: "390px",
                height: "570px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
            }}
        >
            {/* Uploaded images */}
            {uploads.map((img) => (
                <div key={img.id} style={{ position: "absolute", left: img.x, top: img.y, width: "100%", height: "100%", zIndex: 1 }}>
                    <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
            ))}

            {/* Base template */}
            {baseImage && (
                <img
                    src={baseImage}
                    alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 2, display: "block" }}
                />
            )}

            {/* Text overlay */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 50 }}>
                {workingcard === "front" ? (
                    cardfinder === 1 ? (
                        <FrontTwoCapture
                            cardti={cardti} carddes={carddes}
                            name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree}
                            acarddate={acarddate}
                            labelone={labelone} labeltwo={labeltwo} labelthree={labelthree}
                            iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree}
                        />
                    ) : (
                        <FrontOneCapture
                            cardti={cardti} carddes={carddes}
                            name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree}
                            acarddate={acarddate}
                            labelone={labelone} labeltwo={labeltwo} labelthree={labelthree}
                            iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree}
                        />
                    )
                ) : (
                    <BackOneCapture
                        dateLabel={backDateDisplay}
                        description={backDescription}
                        highlightsTitle={backHighlightsTitle}
                        highlights={backHighlightsPreview}
                        legacyTagline={backLegacyTagline}
                        legacyText={backLegacyText}
                        isblack={isblack}
                    />
                )}
            </div>
        </div>
    );
});

TradingCardCaptureNode.displayName = "TradingCardCaptureNode";

export default TradingCardCaptureNode;