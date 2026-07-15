import Image from "next/image";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

// Kept in sync with PhotoCardPreview.jsx — same measured card geometry.
// If you tune the values in PhotoCardPreview.jsx, mirror the change here too.
const SLOT_BOX = {
  top: "7%",
  left: "7%",
  width: "88%",
  height: "86%",
};
const SLOT_CLIP_PATH =
  "polygon(38% 0%, 96% 0%, 96% 74.6%, 57.8% 100%, 1% 100%, 1% 27.4%)";

const PhotoCardThumbnail = ({ finalCard }) => {
  if (!finalCard?.baseImage) return null;

  const photo = finalCard?.userPhoto || null;
  const zoom = finalCard?.userPhotoZoom || 1;

  return (
    <div className="w-full h-full relative cursor-pointer overflow-hidden">
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
    </div>
  );
};

export default PhotoCardThumbnail;