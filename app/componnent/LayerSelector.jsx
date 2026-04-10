import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

const layerTitles = {
  skin_tones: "Skin Tone",
  hairs: "Hair",
  eyes: "Eyes",
  mouths: "Mouth",
  noses: "Nose",
  dresses: "Head Shape",
  crowns: "Hats / Crowns",
  beards: "Beard"
};

const LayerSelector = ({ product, activeCard, selectLayer }) => {
  const [openLayer, setOpenLayer] = useState("skin_tones");

  return (
    <div className="space-y-3 pb-1">
      {layers.map((layer) => {
        const sectionTitle = layerTitles[layer] || layer.replace("_", " ");
        const selectedImage = activeCard?.selectedLayers?.[layer];
        const layerItems = product?.customizations?.[layer] || [];
        const selectedIndex = layerItems?.findIndex((item) => item?.image === selectedImage);

        return (
          <div key={layer} className="rounded-2xl border border-gray-200 bg-white p-3">
            <button
              type="button"
              onClick={() => setOpenLayer((prev) => (prev === layer ? "" : layer))}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold capitalize text-gray-800">{sectionTitle}</h3>
                {selectedIndex >= 0 && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                    Option {selectedIndex + 1}
                  </span>
                )}
              </div>
              <IoIosArrowDown className={`text-gray-500 transition-transform ${openLayer === layer ? "rotate-180" : ""}`} />
            </button>

            {openLayer === layer && (
              <div className="mt-3 flex flex-wrap gap-2">
                {layerItems?.map((image, idx) => {
                  const isSelected = selectedImage === image?.image;

                  return (
                    <Image
                      width={1000}
                      height={1000}
                      key={idx}
                      src={image?.image}
                      alt={`${layer} ${idx + 1}`}
                      className={`h-[80px] w-[60px] cursor-pointer rounded-lg object-cover p-1 ${isSelected ? "border-2 border-sky-500 bg-sky-200" : "border-2 border-gray-300"}`}
                      onClick={() => selectLayer(layer, image?.image)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default LayerSelector;
