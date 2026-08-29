import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import AddNewCardBtn from "./AddNewCardBtn";
import PhotoCardThumbnail from "./PhotoCardThumbnail";

const PhotoCardSidebar = ({
  activeIndex,
  Done,
  setActiveIndex,
  addCard,
  removeCard,
  doneloading,
  cards,
  lockedCardType,
  onSelectCard,
}) => {
  function handleReactiveFunction(finalCard, indx) {
    setActiveIndex(indx);
    onSelectCard?.(indx);
  }

  return (
    <div className="w-full bg-white h-full shawow-md px-0 py-2 z-20 flex flex-col">
      <h3 className="text-gray-700 font-semibold text-2xl pb-4 px-2 md:px-7 lg:px-8 flex items-center justify-between">
        <span>Cards :</span>
        <div className="flex flex-row items-center gap-2">
          <span className="text-gray-500">{cards?.length}</span>
          <div className="block lg:hidden">
            <AddNewCardBtn
              addCard={addCard}
              Done={Done}
              doneloading={doneloading}
            />
          </div>
        </div>
      </h3>
      <div className="w-full lg:w-full flex flex-row lg:flex-col gap-4 items-center h-22.5 px-3 py-1 lg:h-full lg:flex-1 lg:min-h-0 snap-mandatory overflow-x-scroll cursor-grab lg:overflow-y-scroll scrollbar-hide">
        {cards?.map((finalCard, idx) => (
          <div
            onClick={() => {
              handleReactiveFunction(finalCard, idx);
            }}
            key={idx}
            className="w-15.5 lg:w-full aspect-11/15 shrink-0 relative flex items-cemter justify-center z-0 snap-start rounded-lg border border-gray-200 overflow-hidden"
          >
            <PhotoCardThumbnail finalCard={finalCard} />

            {cards?.length > 1 && finalCard?.editedCard !== lockedCardType && (
              <button
                className="bg-sky-600 absolute -top-0.75 -right-0.75 border-3 border-white tranlate-y-full text-white rounded-full w-fit h-fit cursor-pointer flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(idx);
                }}
              >
                <RxCross2 className="text-md" />
              </button>
            )}
          </div>
        ))}
        {cards?.length < 5 && (
          <div className="`w-15.5 lg:w-full aspect-11/15 shrink-0 relative items-cemter z-0 snap-start flex items-center justify-center">
            <CiCirclePlus className="text-gray-300 text-xl lg:text-3xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCardSidebar;
