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
    isMini = false
}) {
    const textOverlayRef = React.useRef(null);
    return (
        <div className={isMini ? "" : "col-span-10 row-span-9 lg:row-span-10 lg:col-span-6 flex items-center justify-center -translate-y-[35px] lg:-translate-y-[50px] w-screen lg:w-full z-40"}>
            <div className={isMini ? "" : "flex flex-col items-center gap-3"}>
            <div className={isMini ? "" : "w-[255px] h-[370px] lg:w-[390px] lg:h-[570px] overflow-hidden rounded-xl border border-gray-200 shadow-xl ring-1 ring-gray-100 relative bg-white"}>
                <div
                    ref={isMini ? null : previewCardNodeRef}
                    className="w-[390px] h-[570px] relative overflow-hidden bg-white"
                    style={
                        isMini
                            ? {}
                            : {
                                transform: "scale(var(--card-scale))",
                                transformOrigin: "top left",
                            }
                    }
                >
                    {/* Uploaded images (zIndex:1) - draggable & resizable */}
                    {uploads.map((img) => (
                        isMini ? (
                            <div
                                key={img.id}
                                style={{
                                    position: "absolute",
                                    left: img.x,
                                    top: img.y,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1
                                }}
                            >
                                <img
                                    width={1000}
                                    height={1000}
                                    src={img.url}
                                    alt="upload"
                                    className="w-full h-full object-cover"
                                    style={{ display: 'block', backgroundColor: 'transparent' }}
                                />
                            </div>
                        ) : (
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
                                    zIndex: 1
                                }}
                            >
                                <img
                                    width={1000}
                                    height={1000}
                                    src={img.url}
                                    alt="upload"
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                    style={{ display: 'block', backgroundColor: 'transparent' }}
                                />
                            </Rnd>
                        )
                    ))}

                    {/* Active base (zIndex:2) */}
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

                    {/* Text overlays (zIndex:50 via container class) */}
                    <div 
                        ref={textOverlayRef} 
                        className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        {workingcard === "front" ? (
                            <>
                                {cardfinder == 0 && (
                                    <FrontOne 
                                        cardti={cardti} 
                                        name={displayAttributeOne} 
                                        name2={displayAttributeTwo} 
                                        name3={displayAttributeThree} 
                                        acarddate={acarddate} 
                                        labelone={labelone} 
                                        labeltwo={labeltwo} 
                                        labelthree={labelthree} 
                                        iconOne={attrIconOne} 
                                        iconTwo={attrIconTwo} 
                                        iconThree={attrIconThree} 
                                    />
                                )}
                                {cardfinder == 1 && (
                                    <FrontTwo 
                                        cardti={cardti} 
                                        name={displayAttributeOne} 
                                        name2={displayAttributeTwo} 
                                        name3={displayAttributeThree} 
                                        acarddate={acarddate} 
                                        labelone={labelone} 
                                        labeltwo={labeltwo} 
                                        labelthree={labelthree} 
                                        iconOne={attrIconOne} 
                                        iconTwo={attrIconTwo} 
                                        iconThree={attrIconThree} 
                                    />
                                )}
                                {cardfinder == 2 && (
                                    <FrontThree 
                                        cardti={cardti} 
                                        name={displayAttributeOne} 
                                        name2={displayAttributeTwo} 
                                        name3={displayAttributeThree} 
                                        acarddate={acarddate} 
                                        labelone={labelone} 
                                        labeltwo={labeltwo} 
                                        labelthree={labelthree} 
                                        iconOne={attrIconOne} 
                                        iconTwo={attrIconTwo} 
                                        iconThree={attrIconThree} 
                                    />
                                )}
                                {cardfinder == 3 && (
                                    <FrontFour 
                                        cardti={cardti} 
                                        name={displayAttributeOne} 
                                        name2={displayAttributeTwo} 
                                        name3={displayAttributeThree} 
                                        acarddate={acarddate} 
                                        labelone={labelone} 
                                        labeltwo={labeltwo} 
                                        labelthree={labelthree} 
                                        iconOne={attrIconOne} 
                                        iconTwo={attrIconTwo} 
                                        iconThree={attrIconThree} 
                                    />
                                )}
                            </>
                        ) : (
                            <BackOne
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

                    {/* small helper overlay when nothing selected */}
                    {!uploads.length && !baseFront && !baseBack && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            Preview area
                        </div>
                    )}
                </div>

                {!isMini && (
                    <button
                        onClick={() => setworkingcard((prev) => (prev === "front" ? "back" : "front"))}
                        className="relative z-[60] text-base lg:text-lg text-semibold text-white flex items-center gap-2 px-4 py-2 rounded-lg justify-center cursor-pointer bg-sky-400 w-[255px] lg:w-[160px] shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <BsArrowRepeat className="text-xl" />
                        <span>{workingcard === "front" ? "Flip to Back" : "Flip to Front"}</span>
                    </button>
                )}
            </div>
            </div>
        </div>
    );
}
