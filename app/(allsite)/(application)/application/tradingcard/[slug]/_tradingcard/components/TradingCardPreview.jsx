import React from "react";
import { Rnd } from "react-rnd";
import { BsArrowRepeat } from "react-icons/bs";
import {
  BackOne,
  FrontFour,
  FrontOne,
  FrontThree,
  FrontTwo,
} from "@/app/componnent/TextOverlayer";

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
  attributeName,
  backDateDisplay,
  backDescription,
  backHighlightsTitle,
  backHighlightsPreview,
  backLegacyTagline,
  backLegacyText,
  isblack,
  isMini = false,
  isMobileCanvas = false,
}) {
  const textOverlayRef = React.useRef(null);

  const containerRef = React.useRef(null);
  const [mobileScale, setMobileScale] = React.useState(0.56);
  React.useEffect(() => {
    if (!isMobileCanvas) return;

    const computeScale = () => {
      if (!containerRef.current) return;
      const { offsetWidth: w, offsetHeight: h } = containerRef.current;
      if (w > 0 && h > 0) {
        const scale = Math.min((w * 0.95) / 390, (h * 0.95) / 570);
        setMobileScale(scale);
      }
    };

    const observer = new ResizeObserver(computeScale);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("orientationchange", computeScale);
    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", computeScale);
    };
  }, [isMobileCanvas]);

  if (isMini) {
    return (
      <div className="w-97.5 h-142.5 relative overflow-hidden bg-white">
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
              style={{
                display: "block",
                backgroundColor: "transparent",
                transform: `scale(${img.scale ?? 1})`,
                transformOrigin: "center center",
              }}
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
                  attributeName={attributeName}
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
      </div>
    );
  }

  return (
    <div
      ref={isMobileCanvas ? containerRef : undefined}
      className={
        isMobileCanvas
          ? "flex flex-col items-center justify-center w-full h-full overflow-hidden"
          : "col-span-10 row-span-9 lg:row-span-10 lg:col-span-6 flex items-center justify-center -translate-y-8.75 lg:-translate-y-12.5 w-screen lg:w-full z-40"
      }
    >
      <div
        className={
          isMobileCanvas
            ? "flex flex-col items-center gap-1"
            : "flex flex-col items-center gap-3"
        }
      >
        <div
          data-card-shell
          className={
            isMobileCanvas
              ? "rounded-xl border border-gray-200 shadow-xl ring-1 ring-gray-100 relative bg-white"
              : "w-63.75 h-93.25 lg:w-97.5 lg:h-142.5 overflow-hidden rounded-xl border border-gray-200 shadow-xl ring-1 ring-gray-100 relative bg-white"
          }
          style={
            isMobileCanvas
              ? {
                  width: `${390 * mobileScale}px`,
                  height: `${570 * mobileScale}px`,
                  overflow: "hidden",
                  flexShrink: 0,
                }
              : undefined
          }
        >
          <div
            data-card-canvas
            ref={isMobileCanvas ? null : previewCardNodeRef}
            style={
              isMobileCanvas
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "390px",
                    height: "570px",
                    transform: `scale(${mobileScale})`,
                    transformOrigin: "top left",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                  }
                : {
                    width: "390px",
                    height: "570px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    transform: "scale(var(--card-scale))",
                    transformOrigin: "top left",
                  }
            }
          >
            {isMobileCanvas && (
              <div
                ref={previewCardNodeRef}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: -999 }}
              />
            )}
            {uploads.map((img) => (
              <Rnd
                key={img.id}
                bounds="parent"
                size={{ width: "100%", height: "100%" }}
                position={{ x: img.x, y: img.y }}
                onDragStop={(_, d) => updateUploadPosition(img.id, d.x, d.y)}
                onResizeStop={(_, __, ref, ___, pos) => {
                  updateUploadSize(
                    img.id,
                    parseInt(ref.style.width, 10),
                    parseInt(ref.style.height, 10),
                  );
                  updateUploadPosition(img.id, pos.x, pos.y);
                }}
                onMouseDown={() => {
                  setActiveImage(img.id);
                  setActiveText(null);
                }}
                resizeHandleStyles={{
                  topLeft: {
                    border: "3px solid #3b82f6",
                    width: "10px",
                    height: "10px",
                    background: "white",
                  },
                  topRight: {
                    border: "3px solid #3b82f6",
                    width: "10px",
                    height: "10px",
                    background: "white",
                  },
                  bottomLeft: {
                    border: "3px solid #3b82f6",
                    width: "10px",
                    height: "10px",
                    background: "white",
                  },
                  bottomRight: {
                    border: "3px solid #3b82f6",
                    width: "10px",
                    height: "10px",
                    background: "white",
                  },
                }}
                style={{
                  border:
                    activeText === img.id || activeImage === img?.id
                      ? "2px dashed #3b82f6"
                      : "none",
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
                  style={{
                    display: "block",
                    backgroundColor: "transparent",
                    transform: `scale(${img.scale ?? 1})`,
                    transformOrigin: "center center",
                  }}
                />
              </Rnd>
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
                      attributeName={attributeName}
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

            {!uploads.length && !baseFront && !baseBack && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                Preview area
              </div>
            )}
          </div>
        </div>

        {!isMobileCanvas && (
          <button
            onClick={() =>
              setworkingcard((prev) => (prev === "front" ? "back" : "front"))
            }
            className="relative z-60 text-base lg:text-lg text-semibold text-white flex items-center gap-2 px-4 py-2 rounded-lg justify-center cursor-pointer bg-sky-400 w-63.75 lg:w-40 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <BsArrowRepeat className="text-xl" />
            <span>
              {workingcard === "front" ? "Flip to Back" : "Flip to Front"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
