import Image from "next/image";

const layers = [
  "dresses",
  "skin_tones",
  "hairs",
  "crowns",
  "beards",
  "eyes",
  "mouths",
  "noses",
];

const CardPreview = ({ activeCard, previewCardNodeRef }) => {
  return (
    <div
      ref={previewCardNodeRef}
      className="flex items-center justify-center relative w-50 h-auto md:w-67.5 md:h-92.5 lg:w-100 lg:h-150 rounded-4xl border-2 border-transparent"
    >
      {activeCard?.baseImage && (
        <Image
          width={1000}
          height={1000}
          src={activeCard.baseImage}
          alt="Base Card"
          className=" w-full h-full object-contain"
        />
      )}
      {layers.map(
        (layer) =>
          activeCard?.selectedLayers[layer] && (
            <div key={layer}>
              <Image
                width={1000}
                height={1000}
                src={activeCard.selectedLayers[layer]}
                alt={layer}
                className="absolute top-2.5 md:top-8 lg:top-22.25 left-1/2 -translate-x-1/2 w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-7.5"
              />
              <Image
                width={1000}
                height={1000}
                src={activeCard.selectedLayers[layer]}
                alt={`${layer}-mirrored`}
                className="absolute bottom-2.5 md:bottom-8 lg:bottom-22.25 left-1/2 -translate-x-1/2 scale-y-[-1] w-[70%] h-[47%] md:w-[65%] md:h-[42%] lg:w-[55%] lg:h-[35%] object-contain pt-7.5"
              />
            </div>
          ),
      )}
    </div>
  );
};

export default CardPreview;
