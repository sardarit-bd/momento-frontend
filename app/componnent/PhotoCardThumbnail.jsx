import Image from "next/image";
import { JOKER_SLOT_BOX, EXPORT_WIDTH, EXPORT_HEIGHT } from "@/app/componnent/jokerSlotGeometry";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

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

// Must match PhotoCardPreview.jsx's Joker character constants exactly —
// both are percentages of the same EXPORT_WIDTH/EXPORT_HEIGHT-locked box,
// so keeping them identical here is what makes the thumbnail and the big
// preview line up. If you tune the values in PhotoCardPreview, mirror the
// change here too.
const JOKER_CHARACTER_TOP_PERCENT = 10;
const JOKER_CHARACTER_HEIGHT_PERCENT = 40;
const JOKER_CHARACTER_WIDTH_PERCENT = 58;

const PhotoCardThumbnail = ({ finalCard }) => {
  if (!finalCard?.baseImage) return null;

  const photo = finalCard?.userPhoto || null;
  const zoom = finalCard?.userPhotoZoom || 1;
  const isJoker = finalCard?.editedCard === "Joker_Card";

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
            aspectRatio: `${EXPORT_WIDTH} / ${EXPORT_HEIGHT}`,
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
                  transform: `translate(-50%, -50%) scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              />
            </div>
          ) : (
            // Character layers, mirrored top/bottom — same box math as
            // PhotoCardPreview.jsx's Joker branch. This was previously
            // missing entirely, which is why the thumbnail showed nothing
            // when no photo was uploaded.
            layers.map(layer =>
              finalCard?.selectedLayers[layer] && (
                <div key={layer}>
                  <Image
                    width={1000}
                    height={1000}
                    src={finalCard.selectedLayers[layer]}
                    alt={layer}
                    className="absolute left-1/2 -translate-x-1/2 object-contain"
                    style={{
                      top: `${JOKER_CHARACTER_TOP_PERCENT}%`,
                      width: `${JOKER_CHARACTER_WIDTH_PERCENT}%`,
                      height: `${JOKER_CHARACTER_HEIGHT_PERCENT}%`,
                    }}
                  />
                  <Image
                    width={1000}
                    height={1000}
                    src={finalCard.selectedLayers[layer]}
                    alt={`${layer}-mirrored`}
                    className="absolute left-1/2 -translate-x-1/2 scale-y-[-1] object-contain"
                    style={{
                      bottom: `${JOKER_CHARACTER_TOP_PERCENT}%`,
                      width: `${JOKER_CHARACTER_WIDTH_PERCENT}%`,
                      height: `${JOKER_CHARACTER_HEIGHT_PERCENT}%`,
                    }}
                  />
                </div>
              )
            )
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
                  transform: `translate(-50%, -50%) scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              />
            </div>
          ) : (
            layers.map(layer =>
              finalCard?.selectedLayers[layer] && (
                <div key={layer}>
                  <Image
                    width={1000} height={1000}
                    src={finalCard?.selectedLayers[layer]}
                    alt={layer}
                    className="absolute top-[49.8%] left-1/2 -translate-x-1/2 w-[55%] h-[35%] object-contain rotate-180"
                  />
                  <Image
                    width={1000} height={1000}
                    src={finalCard?.selectedLayers[layer]}
                    alt={`${layer}-mirrored`}
                    className="absolute bottom-[50.1%] left-1/2 -translate-x-1/2 w-[55%] h-[35%] object-contain"
                  />
                </div>
              )
            )
          )}
        </>
      )}
    </div>
  );
};

export default PhotoCardThumbnail;