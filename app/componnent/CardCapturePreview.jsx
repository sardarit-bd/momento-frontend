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

const CardCapturePreview = ({ card, nodeRef }) => {
  return (
    <div ref={nodeRef} className="relative w-109 h-148.5 bg-transparent">
      {card?.baseImage && (
        <Image
          width={1000}
          height={1000}
          src={card.baseImage}
          alt="Base Card"
          className="w-full h-full object-contain"
          loading="eager"
          priority
        />
      )}

      {layers.map((layer) =>
        card?.selectedLayers?.[layer] ? (
          <div key={layer}>
            <Image
              width={1000}
              height={1000}
              src={card.selectedLayers[layer]}
              alt={layer}
              className="absolute top-23 left-1/2 -translate-x-1/2 w-[55%] h-[35%] object-contain pt-7.5"
              loading="eager"
            />
            <Image
              width={1000}
              height={1000}
              src={card.selectedLayers[layer]}
              alt={`${layer}-mirrored`}
              className="absolute bottom-23 left-1/2 -translate-x-1/2 scale-y-[-1] w-[55%] h-[35%] object-contain pt-7.5"
              loading="eager"
            />
          </div>
        ) : null,
      )}
    </div>
  );
};

export default CardCapturePreview;
