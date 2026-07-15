import BaseSelector from "./BaseSelector";
import LayerSelector from "./LayerSelector";
import PhotoUploader from "./PhotoUploader";

const PhotoSideController = ({
  product,
  cards,
  activeCard,
  selectBase,
  selectLayer,
  selectPhoto,
  editedCard,
  seteditedCard,
  activebaseEditCard,
  setactivebaseEditCard,
  userPhotoZoom,
  setUserPhotoZoom,
}) => {
  return (
    <div className="pt-4">
      <h2 className="pb-3 text-xl font-semibold text-gray-800">{product.name}</h2>
      <PhotoUploader
        activeCard={activeCard}
        selectPhoto={selectPhoto}
        userPhotoZoom={userPhotoZoom}
        setUserPhotoZoom={setUserPhotoZoom}
      />
      <BaseSelector
        product={product}
        cards={cards}
        activeCard={activeCard}
        selectBase={selectBase}
        editedCard={editedCard}
        seteditedCard={seteditedCard}
        activebaseEditCard={activebaseEditCard}
        setactivebaseEditCard={setactivebaseEditCard}
      />
      <LayerSelector product={product} activeCard={activeCard} selectLayer={selectLayer} />
    </div>
  );
};

export default PhotoSideController;
