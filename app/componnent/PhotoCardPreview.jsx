import Image from "next/image";
import { JOKER_SLOT_BOX, EXPORT_WIDTH, EXPORT_HEIGHT } from "@/app/componnent/jokerSlotGeometry";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

const SLOT_BOX = { top: "7%", left: "7%", width: "88%", height: "86%" };
const SLOT_CLIP_PATH =
  "polygon(38% 0%, 96% 0%, 96% 74.6%, 57.8% 100%, 1% 100%, 1% 27.4%)";

const JOKER_SLOT_BOX_STYLE = {
  top: `${JOKER_SLOT_BOX.top}%`,
  left: `${JOKER_SLOT_BOX.left}%`,
  width: `${JOKER_SLOT_BOX.width}%`,
  height: `${JOKER_SLOT_BOX.height}%`,
};

// Joker's card art has a different aspect ratio than King/Queen/Jack/Ace
// (its container height is derived from EXPORT_WIDTH/EXPORT_HEIGHT rather
// than a fixed per-breakpoint px height). Fixed px offsets don't scale with
// that, so the mirrored halves overlap. Use % of container height instead —
// this stays correct at every breakpoint since it's derived from the same
// box the container's aspect-ratio is locked to.
const JOKER_CHARACTER_TOP_PERCENT = 17;
const JOKER_CHARACTER_HEIGHT_PERCENT = 33;
const JOKER_CHARACTER_WIDTH_PERCENT = 55;

const PhotoCardPreview = ({ activeCard, previewCardNodeRef }) => {
  const photo = activeCard?.userPhoto || null;
  const zoom = activeCard?.userPhotoZoom || 1;
  const isJoker = activeCard?.editedCard === "Joker_Card";

  return (
    <div
      ref={previewCardNodeRef}
      className={
        isJoker
          ? "flex items-center justify-center relative w-[200px] md:w-[270px] lg:w-[400px] rounded-4xl border-2 border-transparent"
          : "flex items-center justify-center relative w-[200px] h-auto md:w-[270px] md:h-[370px] lg:w-[400px] lg:h-[600px] rounded-4xl border-2 border-transparent"
      }
      style={isJoker ? { aspectRatio: `${EXPORT_WIDTH} / ${EXPORT_HEIGHT}` } : undefined}
    >
      {activeCard?.baseImage && (
        <Image width={1000} height={1000} src={activeCard.baseImage} alt="Base Card" className="w-full h-full object-contain" />
      )}

      {photo ? (
        isJoker ? (
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
              width={1000} height={1000} src={photo} alt="Your photo" draggable={false}
              style={{
                position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%",
                objectFit: "contain", transform: `translate(-50%, -50%) scale(${zoom})`, transformOrigin: "center center",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              position: "absolute", top: SLOT_BOX.top, left: SLOT_BOX.left,
              width: SLOT_BOX.width, height: SLOT_BOX.height, overflow: "hidden", clipPath: SLOT_CLIP_PATH,
            }}
          >
            <Image
              width={1000} height={1000} src={photo} alt="Your photo" draggable={false}
              style={{
                position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%",
                objectFit: "cover", transform: `translate(-50%, -50%) scale(${zoom})`, transformOrigin: "center center",
              }}
            />
          </div>
        )
      ) : (
        layers.map(layer =>
          activeCard?.selectedLayers[layer] && (
            <div key={layer}>
              <Image
                width={1000}
                height={1000}
                src={activeCard.selectedLayers[layer]}
                alt={layer}
                className={
                  isJoker
                    ? "absolute left-1/2 -translate-x-1/2 object-contain"
                    : "absolute top-[10px] md:top-[32px] lg:top-[89px] left-1/2 -translate-x-1/2 w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-[30px]"
                }
                style={
                  isJoker
                    ? {
                        top: `${JOKER_CHARACTER_TOP_PERCENT}%`,
                        width: `${JOKER_CHARACTER_WIDTH_PERCENT}%`,
                        height: `${JOKER_CHARACTER_HEIGHT_PERCENT}%`,
                      }
                    : undefined
                }
              />
              <Image
                width={1000}
                height={1000}
                src={activeCard.selectedLayers[layer]}
                alt={`${layer}-mirrored`}
                className={
                  isJoker
                    ? "absolute left-1/2 -translate-x-1/2 scale-y-[-1] object-contain"
                    : "absolute bottom-[10px] md:bottom-[32px] lg:bottom-[89px] left-1/2 -translate-x-1/2 scale-y-[-1] w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-[30px]"
                }
                style={
                  isJoker
                    ? {
                        bottom: `${JOKER_CHARACTER_TOP_PERCENT}%`,
                        width: `${JOKER_CHARACTER_WIDTH_PERCENT}%`,
                        height: `${JOKER_CHARACTER_HEIGHT_PERCENT}%`,
                      }
                    : undefined
                }
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default PhotoCardPreview;