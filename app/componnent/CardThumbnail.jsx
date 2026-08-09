import Image from "next/image";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

// Same ratios CardPreview uses at its lg breakpoint (89/600 top, 55% w, 35% h),
// expressed as percentages so they scale correctly at ANY container size
// instead of being pinned to fixed px breakpoints.
const LAYER_TOP_PCT = (89 / 600) * 100; // ≈14.83%
const LAYER_WIDTH_PCT = 55;
const LAYER_HEIGHT_PCT = 35;

const CardThumbnail = ({ finalCard }) => {

  if (!finalCard?.baseImage) return null;

  return (
    <div className="w-[50px] h-full md:h-auto lg:w-full lg:h-[180px] xl:h-[200px] relative cursor-pointer">
      <Image
        width={1000} height={1000} src={finalCard?.baseImage} alt="Base Card" className="w-full h-full object-contain"
      />
      {layers.map(layer =>
        finalCard?.selectedLayers[layer] && (
          <div key={layer}>
            <Image
              width={1000} height={1000}
              src={finalCard?.selectedLayers[layer]}
              alt={layer}
              className="absolute left-1/2 -translate-x-1/2 object-contain"
              style={{
                top: `${LAYER_TOP_PCT}%`,
                width: `${LAYER_WIDTH_PCT}%`,
                height: `${LAYER_HEIGHT_PCT}%`,
              }}
            />
            <Image
              width={1000} height={1000}
              src={finalCard?.selectedLayers[layer]}
              alt={`${layer}-mirrored`}
              className="absolute left-1/2 -translate-x-1/2 scale-y-[-1] object-contain"
              style={{
                bottom: `${LAYER_TOP_PCT}%`,
                width: `${LAYER_WIDTH_PCT}%`,
                height: `${LAYER_HEIGHT_PCT}%`,
              }}
            />
          </div>
        )
      )}
    </div>
  )
};

export default CardThumbnail;