import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { GiCardAceClubs, GiCardJackClubs, GiCardJoker, GiCardKingClubs, GiCardQueenClubs } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";

const DECK_BASE_CARD_TYPES = ["Ace_Card", "king_Card", "Queen_Card", "Jeck_Card"];

const BaseSelector = ({ product, cards, activeCard, selectBase, editedCard, seteditedCard, activebaseEditCard, setactivebaseEditCard }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasJokerInCustomization = cards?.some((card) => card?.editedCard === "Joker_Card");
  const allowedCardTypes = useMemo(
    () => (hasJokerInCustomization ? [...DECK_BASE_CARD_TYPES, "Joker_Card"] : DECK_BASE_CARD_TYPES),
    [hasJokerInCustomization]
  );



  useEffect(() => {
    const activeType = activeCard?.editedCard;
    if (!activeType) return;

    // Keep base tab synced with currently active card, including Joker when active.
    if (allowedCardTypes.includes(activeType)) {
      if (activeType !== editedCard) seteditedCard(activeType);
      return;
    }

    if (!allowedCardTypes.includes(editedCard)) {
      const allcard = product?.customizations?.custom_sets || [];
      const fallbackType = allowedCardTypes.find((type) =>
        allcard.some((card) => card?.card_type === type)
      ) || allowedCardTypes[0];
      seteditedCard(fallbackType);
    }
  }, [activeCard?.editedCard, editedCard, product, seteditedCard, allowedCardTypes]);

  useEffect(() => {
    if (!product) return;

    const allcard = product?.customizations?.custom_sets || [];
    const safeEditedCard = allowedCardTypes.includes(editedCard)
      ? editedCard
      : (allowedCardTypes.find((type) => allcard.some((card) => card?.card_type === type)) || allowedCardTypes[0]);
    const filteredCards = allcard?.filter((card) => card?.card_type === safeEditedCard);

    if (safeEditedCard !== editedCard) seteditedCard(safeEditedCard);
    setactivebaseEditCard(filteredCards || []);
  }, [editedCard, product, setactivebaseEditCard, seteditedCard, allowedCardTypes]);

  const handleCardTypeSelect = (cardType) => {
    if (!allowedCardTypes.includes(cardType)) return;

    const allcard = product?.customizations?.custom_sets;
    const filteredCards = allcard?.filter((card) => card?.card_type === cardType);
    const selectedBaseForActiveCard = filteredCards?.find(
      (card) => card?.image === activeCard?.baseImage
    )?.image;

    seteditedCard(cardType);
    selectBase(selectedBaseForActiveCard || filteredCards?.[0]?.image, cardType);
  };

  const hasBaseForType = (cardType) =>
    (product?.customizations?.custom_sets || []).some((card) => card?.card_type === cardType);






  return (
    <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 pb-1 text-left"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Base Card</h3>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
            {editedCard?.replace("_Card", "")?.replace("Jeck", "Jack")}
          </span>
        </div>
        <IoIosArrowDown className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* <p className="pb-2 text-sm text-gray-500">Only 5 customizable cards (Jack, Queen, King, Ace, and Joker).</p> */}

      {isOpen && (
        <>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button disabled={!hasBaseForType("Ace_Card")} onClick={() => { handleCardTypeSelect("Ace_Card") }} className={`rounded-xl ${hasBaseForType("Ace_Card") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${editedCard === 'Ace_Card' ? 'border-2 border-sky-500 bg-sky-100' : 'border-2 border-gray-400 bg-gray-200'}`}><GiCardAceClubs className={`text-6xl ${editedCard === 'Ace_Card' ? 'text-sky-400' : 'text-gray-400'}`} /></button>
            <button disabled={!hasBaseForType("king_Card")} onClick={() => { handleCardTypeSelect("king_Card") }} className={`rounded-xl ${hasBaseForType("king_Card") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${editedCard === 'king_Card' ? 'border-2 border-sky-500 bg-sky-100' : 'border-2 border-gray-400 bg-gray-200'}`}><GiCardKingClubs className={`text-6xl ${editedCard === 'king_Card' ? 'text-sky-400' : 'text-gray-400'}`} /></button>
            <button disabled={!hasBaseForType("Queen_Card")} onClick={() => { handleCardTypeSelect("Queen_Card") }} className={`rounded-xl ${hasBaseForType("Queen_Card") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${editedCard === 'Queen_Card' ? 'border-2 border-sky-500 bg-sky-100' : 'border-2 border-gray-400 bg-gray-200'}`}><GiCardQueenClubs className={`text-6xl ${editedCard === 'Queen_Card' ? 'text-sky-400' : 'text-gray-400'}`} /></button>
            <button disabled={!hasBaseForType("Jeck_Card")} onClick={() => { handleCardTypeSelect("Jeck_Card") }} className={`rounded-xl ${hasBaseForType("Jeck_Card") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${editedCard === 'Jeck_Card' ? 'border-2 border-sky-500 bg-sky-100' : 'border-2 border-gray-400 bg-gray-200'}`}><GiCardJackClubs className={`text-6xl ${editedCard === 'Jeck_Card' ? 'text-sky-400' : 'text-gray-400'}`} /></button>
            {hasJokerInCustomization && (
              <button disabled={!hasBaseForType("Joker_Card")} onClick={() => { handleCardTypeSelect("Joker_Card") }} className={`rounded-xl ${hasBaseForType("Joker_Card") ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${editedCard === 'Joker_Card' ? 'border-2 border-sky-500 bg-sky-100' : 'border-2 border-gray-400 bg-gray-200'}`}><GiCardJoker className={`text-6xl ${editedCard === 'Joker_Card' ? 'text-sky-400' : 'text-gray-400'}`} /></button>
            )}
          </div>

          <h3 className="pb-2 pt-3 text-sm font-semibold text-gray-700">Base Card Image</h3>

          <div className="flex flex-wrap gap-2">
            {activebaseEditCard?.map((image, idx) => {
              return (
                <Image
                  width={1000}
                  height={1000}
                  key={idx}
                  src={image?.image}
                  alt={`Base ${idx + 1}`}
                  className={`h-[80px] w-[60px] cursor-pointer rounded-lg object-cover p-1 ${activeCard?.baseImage === image?.image ? "border-2 border-sky-500 bg-sky-200" : "border-2 border-gray-300"}`}
                  onClick={() => selectBase(image?.image, editedCard)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  )
};


export default BaseSelector;
