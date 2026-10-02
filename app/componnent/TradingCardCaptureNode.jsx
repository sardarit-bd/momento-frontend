import {
  BackOneCapture,
  FrontOneCapture,
  FrontThreeCapture,
  FrontTwoCapture,
} from "@/app/componnent/TextOverlayerCapture";
import React from "react";

const TradingCardCaptureNode = React.forwardRef(
  (
    {
      workingcard,
      baseFront,
      baseBack,
      cardfinder,
      uploads = [],
      cardti,
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
      cardNumber,
      topLeftIcon,
      topRightIcon,
    },
    ref,
  ) => {
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
              backgroundImage: `url("${img.url}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: `scale(${img.scale ?? 1})`,
              transformOrigin: "center center",
            }}
          />
        ))}

        {baseImage && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              backgroundImage: `url("${baseImage}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 50,
          }}
        >
          {workingcard === "front" ? (
            cardfinder === 2 ? (
              <FrontThreeCapture
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
                cardNumber={cardNumber}
                topLeftIcon={topLeftIcon}
                topRightIcon={topRightIcon}
              />
            ) : cardfinder === 1 ? (
              <FrontTwoCapture
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
                cardNumber={cardNumber}
                topLeftIcon={topLeftIcon}
                topRightIcon={topRightIcon}
              />
            ) : (
              <FrontOneCapture
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
                cardNumber={cardNumber}
                topLeftIcon={topLeftIcon}
                topRightIcon={topRightIcon}
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
              cardNumber={cardNumber}
              topLeftIcon={topLeftIcon}
              topRightIcon={topRightIcon}
            />
          )}
        </div>
      </div>
    );
  },
);

TradingCardCaptureNode.displayName = "TradingCardCaptureNode";

export default TradingCardCaptureNode;
