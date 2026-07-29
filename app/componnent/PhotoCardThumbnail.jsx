import Image from "next/image";
import { JOKER_SLOT_BOX, JOKER_SLOT_CLIP_PATH, JOKER_NATIVE_WIDTH, JOKER_NATIVE_HEIGHT } from "@/app/componnent/jokerSlotGeometry";

// Kept in sync with PhotoCardPreview.jsx — same measured card geometry.
const SLOT_BOX = { top: "7%", left: "7%", width: "88%", height: "86%" };
const SLOT_CLIP_PATH =
  "polygon(38% 0%, 96% 0%, 96% 74.6%, 57.8% 100%, 1% 100%, 1% 27.4%)";

const JOKER_SLOT_BOX_STYLE = {
  top: `${JOKER_SLOT_BOX.top}%`,
  left: `${JOKER_SLOT_BOX.left}%`,
  width: `${JOKER_SLOT_BOX.width}%`,
  height: `${JOKER_SLOT_BOX.height}%`,
};

const PhotoCardThumbnail = ({ finalCard }) => {
  if (!finalCard?.baseImage) return null;

  const photo = finalCard?.userPhoto || null;
  const zoom = finalCard?.userPhotoZoom || 1;
  const offset = finalCard?.userPhotoOffset || { x: 0, y: 0 };
  const isJoker = finalCard?.editedCard === "Joker_Card";

  const photoTransform = `translate(calc(-50% + ${offset.x * 100}%), calc(-50% + ${offset.y * 100}%)) scale(${zoom})`;

  return (
    <div
      className={
        isJoker
          ? "w-full h-full relative cursor-pointer overflow-hidden flex items-center justify-center"
          : "w-full h-full relative cursor-pointer overflow-hidden"
      }
    >
      {isJoker ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: `${JOKER_NATIVE_WIDTH} / ${JOKER_NATIVE_HEIGHT}`,
          }}
        >
          <Image
            width={1000} height={1000} src={finalCard.baseImage} alt="Base Card" className="w-full h-full object-contain"
          />

          {photo ? (
              <div
                style={{
                  position: "absolute",
                  top: JOKER_SLOT_BOX_STYLE.top,
                  left: JOKER_SLOT_BOX_STYLE.left,
                  width: JOKER_SLOT_BOX_STYLE.width,
                  height: JOKER_SLOT_BOX_STYLE.height,
                  overflow: "hidden",
                  clipPath: JOKER_SLOT_CLIP_PATH,
                }}
              >
              <Image
                width={1000}
                height={1000}
                src={photo}
                alt="Your photo"
                draggable={false}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: photoTransform,
                  transformOrigin: "center center",
                }}
              />
            </div>
          ) : (
            null
          )}
        </div>
      ) : (
        <>
          <Image
            width={1000} height={1000} src={finalCard?.baseImage} alt="Base Card" className="w-full h-full object-contain"
          />

          {photo ? (
            <div
              style={{
                position: "absolute",
                top: SLOT_BOX.top,
                left: SLOT_BOX.left,
                width: SLOT_BOX.width,
                height: SLOT_BOX.height,
                overflow: "hidden",
                clipPath: SLOT_CLIP_PATH,
              }}
            >
              <Image
                width={1000}
                height={1000}
                src={photo}
                alt="Your photo"
                draggable={false}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: photoTransform,
                  transformOrigin: "center center",
                }}
              />
            </div>
          ) : (
            null
          )}
        </>
      )}
    </div>
  );
};

export default PhotoCardThumbnail;