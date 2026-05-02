import Image from "next/image";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

const CardThumbnail = ({ finalCard }) => {

  return (
    <div
      className="w-[50px] h-full md:h-auto lg:w-full lg:h-[180px] xl:h-[200px] relative cursor-pointer">
      <Image
        width={1000} height={1000} src={finalCard?.baseImage} alt="Base Card" className=" w-full h-full object-contain"
      />

      {layers.map(layer =>
        finalCard?.selectedLayers[layer] && (
          <div key={layer}>
            <Image
              width={1000}
              height={1000}
              src={finalCard?.selectedLayers[layer]}
              alt={layer}
              className="absolute top-[98px] left-1/2 -translate-x-1/2 w-[60%] h-[40%] object-contain rotate-180"
            />
            <Image
              width={1000}
              height={1000}
              src={finalCard?.selectedLayers[layer]}
              alt={`${layer}-mirrored`}
              className="absolute bottom-[98px] left-1/2 -translate-x-1/2 w-[60%] h-[40%] object-contain"
            />
          </div>
        )
      )}
    </div>
  )
};

export default CardThumbnail;
