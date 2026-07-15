import Image from "next/image";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

const SLOT_BOX = {
  top: "7%",
  left: "7%",
  width: "88%",
  height: "86%",
};
const SLOT_CLIP_PATH =
  "polygon(38% 0%, 96% 0%, 96% 74.6%, 57.8% 100%, 1% 100%, 1% 27.4%)";

const PhotoCardPreview = ({ activeCard, previewCardNodeRef }) => {
  const photo = activeCard?.userPhoto || null;
  const zoom = activeCard?.userPhotoZoom || 1;

  return (
    <div ref={previewCardNodeRef} className="flex items-center justify-center relative w-[200px] h-auto md:w-[270px] md:h-[370px] lg:w-[400px] lg:h-[600px] rounded-4xl border-2 border-transparent">
      {activeCard?.baseImage && (
        <Image
          width={1000} height={1000} src={activeCard.baseImage} alt="Base Card" className=" w-full h-full object-contain"
        />
      )}

      {photo ? (
        // Clip boundary — matches the card art's actual hexagonal black
        // area (see SLOT_BOX / SLOT_CLIP_PATH above). clip-path handles
        // the diagonal notch corners; overflow-hidden is kept as a
        // fallback for browsers with partial clip-path support.
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
          activeCard?.selectedLayers[layer] && (
            <div key={layer}>
              <Image
                width={1000}
                height={1000}
                src={activeCard.selectedLayers[layer]}
                alt={layer}
                className="absolute top-[10px] md:top-[32px] lg:top-[89px] left-1/2 -translate-x-1/2 w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-[30px]"
              />
              <Image
                width={1000}
                height={1000}
                src={activeCard.selectedLayers[layer]}
                alt={`${layer}-mirrored`}
                className="absolute bottom-[10px] md:bottom-[32px] lg:bottom-[89px] left-1/2 -translate-x-1/2 scale-y-[-1] w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-[30px]"
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default PhotoCardPreview;