import React from "react";
import { Rnd } from "react-rnd";
import { BsArrowRepeat } from "react-icons/bs";
import { BackOne, FrontFour, FrontOne, FrontThree, FrontTwo } from "@/app/componnent/TextOverlayer";

export default function TradingCardPreview({
    previewCardNodeRef,
    uploads,
    activeText,
    setActiveText,
    activeImage,
    setActiveImage,
    updateUploadPosition,
    updateUploadSize,
    workingcard,
    setworkingcard,
    baseFront,
    baseBack,
    cardfinder,
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
    isMini = false,
    /* mobile layout mode — set by the page when rendering in the mobile canvas area */
    isMobileCanvas = false,
}) {
    const textOverlayRef = React.useRef(null);

    /* ─── isMini: used for sidebar thumbnails (unchanged) ─── */
    if (isMini) {
        return (
            <div className="w-[390px] h-[570px] relative overflow-hidden bg-white">
                {uploads.map((img) => (
                    <div
                        key={img.id}
                        style={{
                            position: "absolute",
                            left: img.x,
                            top: img.y,
                            width: "100%",
                            height: "100%",
                            zIndex: 1,
                        }}
                    >
                        <img
                            width={1000}
                            height={1000}
                            src={img.url}
                            alt="upload"
                            className="w-full h-full object-cover"
                            style={{ display: "block", backgroundColor: "transparent" }}
                        />
                    </div>
                ))}

                {(workingcard === "front" ? baseFront : baseBack) && (
                    <img
                        key={workingcard}
                        src={workingcard === "front" ? baseFront : baseBack}
                        alt={workingcard === "front" ? "front-base" : "back-base"}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 2,
                            pointerEvents: "none",
                            display: "block",
                        }}
                    />
                )}

                <div
                    ref={textOverlayRef}
                    className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none"
                    style={{ backgroundColor: "transparent" }}
                >
                    {workingcard === "front" ? (
                        <>
                            {cardfinder == 0 && <FrontOne cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                            {cardfinder == 1 && <FrontTwo cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                            {cardfinder == 2 && <FrontThree cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                            {cardfinder == 3 && <FrontFour cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                        </>
                    ) : (
                        <BackOne dateLabel={backDateDisplay} description={backDescription} highlightsTitle={backHighlightsTitle} highlights={backHighlightsPreview} legacyTagline={backLegacyTagline} legacyText={backLegacyText} isblack={isblack} />
                    )}
                </div>
            </div>
        );
    }

    /* ─── Full interactive card (desktop + mobile canvas) ─── */

    /*
     * Desktop:  wrapper is a grid cell; card is 255×370 scaling to 390×570 via CSS var.
     * Mobile:   wrapper is flex-centered; we use a fixed smaller display size (220×320)
     *           and scale the 390×570 card down to fit inside it.
     *
     * The mobile scale = 220/390 ≈ 0.564
     */

    return (
        <div
            className={
                isMobileCanvas
                    ? "flex flex-col items-center justify-center w-full h-full"
                    : "col-span-10 row-span-9 lg:row-span-10 lg:col-span-6 flex items-center justify-center -translate-y-[35px] lg:-translate-y-[50px] w-screen lg:w-full z-40"
            }
        >
            <div className={isMobileCanvas ? "flex flex-col items-center gap-1" : "flex flex-col items-center gap-3"}>

                {/* Card shell */}
                <div
                    className={
                        isMobileCanvas
                            ? "overflow-hidden rounded-xl border border-gray-200 shadow-xl ring-1 ring-gray-100 relative bg-white"
                            : "w-[255px] h-[370px] lg:w-[390px] lg:h-[570px] overflow-hidden rounded-xl border border-gray-200 shadow-xl ring-1 ring-gray-100 relative bg-white"
                    }
                    style={
                        isMobileCanvas
                            ? { width: 260, height: 378 }
                            : undefined
                    }
                >
                    {/* Inner 390×570 canvas — scaled to fit the shell */}
                    <div
                        ref={isMobileCanvas ? null : previewCardNodeRef}
                        className="w-[390px] h-[570px] relative overflow-hidden bg-white"
                        style={
                            isMobileCanvas
                                ? {
                                    transform: `scale(${260 / 390})`,
                                    transformOrigin: "top left",
                                }
                                : {
                                    transform: "scale(var(--card-scale))",
                                    transformOrigin: "top left",
                                }
                        }
                    >
                        {/* Capture ref overlay for mobile (invisible, keeps ref for html2canvas) */}
                        {isMobileCanvas && (
                            <div ref={previewCardNodeRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: -999 }} />
                        )}

                        {/* Uploaded images — draggable & resizable */}
                        {uploads.map((img) => (
                            <Rnd
                                key={img.id}
                                bounds="parent"
                                size={{ width: "100%", height: "100%" }}
                                position={{ x: img.x, y: img.y }}
                                onDragStop={(_, d) => updateUploadPosition(img.id, d.x, d.y)}
                                onResizeStop={(_, __, ref, ___, pos) => {
                                    updateUploadSize(img.id, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10));
                                    updateUploadPosition(img.id, pos.x, pos.y);
                                }}
                                onMouseDown={() => {
                                    setActiveImage(img.id);
                                    setActiveText(null);
                                }}
                                resizeHandleStyles={{
                                    topLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                    topRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                    bottomLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                    bottomRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                }}
                                style={{
                                    border: activeText === img.id || activeImage === img?.id ? "2px dashed #3b82f6" : "none",
                                    backgroundColor: "transparent",
                                    zIndex: 1,
                                }}
                            >
                                <img
                                    width={1000}
                                    height={1000}
                                    src={img.url}
                                    alt="upload"
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                    style={{ display: "block", backgroundColor: "transparent" }}
                                />
                            </Rnd>
                        ))}

                        {/* Base card image */}
                        {(workingcard === "front" ? baseFront : baseBack) && (
                            <img
                                key={workingcard}
                                src={workingcard === "front" ? baseFront : baseBack}
                                alt={workingcard === "front" ? "front-base" : "back-base"}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    zIndex: 2,
                                    pointerEvents: "none",
                                    display: "block",
                                }}
                            />
                        )}

                        {/* Text overlays */}
                        <div
                            ref={textOverlayRef}
                            className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none"
                            style={{ backgroundColor: "transparent" }}
                        >
                            {workingcard === "front" ? (
                                <>
                                    {cardfinder == 0 && <FrontOne cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                    {cardfinder == 1 && <FrontTwo cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                    {cardfinder == 2 && <FrontThree cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                    {cardfinder == 3 && <FrontFour cardti={cardti} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                </>
                            ) : (
                                <BackOne dateLabel={backDateDisplay} description={backDescription} highlightsTitle={backHighlightsTitle} highlights={backHighlightsPreview} legacyTagline={backLegacyTagline} legacyText={backLegacyText} isblack={isblack} />
                            )}
                        </div>

                        {!uploads.length && !baseFront && !baseBack && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                Preview area
                            </div>
                        )}
                    </div>
                </div>

                {/* Flip button */}
                <button
                    onClick={() => setworkingcard((prev) => (prev === "front" ? "back" : "front"))}
                    className={
                        isMobileCanvas
                            ? "text-sm text-white flex items-center gap-2 px-4 py-2 rounded-lg justify-center cursor-pointer bg-sky-400 shadow-md hover:shadow-lg transition-all duration-200 w-[180px]"
                            : "relative z-[60] text-base lg:text-lg text-semibold text-white flex items-center gap-2 px-4 py-2 rounded-lg justify-center cursor-pointer bg-sky-400 w-[255px] lg:w-[160px] shadow-md hover:shadow-lg transition-all duration-200"
                    }
                >
                    <BsArrowRepeat className="text-xl" />
                    <span>{workingcard === "front" ? "Flip to Back" : "Flip to Front"}</span>
                </button>
            </div>
        </div>
    );
}