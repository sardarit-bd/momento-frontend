import { BsCheckCircleFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import SpinLoader from "./SpingLoader";
import { useRef, useEffect } from "react";
import TradingCardPreview from "@/app/(allsite)/(application)/application/tradingcard/[slug]/_tradingcard/components/TradingCardPreview";

const TradingCardSidebar = ({
  savedSlots,
  packageConfig,
  onSaveSlot,
  onDeleteSlot,
  onEditSlot,
  onCheckout,
  doneloading,
  spinloading,
  canSave,
  editingSlotId,
  state,
  onLivePreviewRef,
}) => {
  const livePreviewNodeRef = useRef(null);

  useEffect(() => {
    if (onLivePreviewRef) onLivePreviewRef(livePreviewNodeRef);
  }, [onLivePreviewRef]);
  return (
    <div className="w-full border-b lg:border-r border-gray-200 bg-white h-full px-3 md:px-7 lg:px-8 py-3 z-20 shadow-sm flex flex-col">
      {/* Header */}
      <h3 className="text-gray-700 font-semibold text-2xl pb-3 flex items-center justify-between">
        <span>Designs</span>
        <span className="text-gray-500 text-sm bg-gray-100 px-2 py-0.5 rounded-full">
          {savedSlots.length}/{packageConfig.designs}
        </span>
      </h3>

      {/* Slot list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 bg-gray-50 rounded-xl border border-gray-100 shadow-inner p-2 min-h-[200px] max-h-[80vh]">
        {savedSlots.length === 0 && editingSlotId !== null && (
          <div className="h-full flex items-center justify-center text-xs text-gray-400 text-center py-8">
            No designs saved yet.
            <br />
            Customize and save your first design.
          </div>
        )}

        {/* Show Live Preview for New Unsaved Design */}
        {editingSlotId === null &&
          savedSlots.length < packageConfig.designs &&
          state && (
            <div className="relative flex flex-col items-center border rounded-xl p-3 shadow-sm bg-sky-50 border-sky-400 ring-2 ring-sky-200 cursor-default">
              {/* Live Thumbnail */}
              <div
                style={{
                  width: 110,
                  height: 161,
                  overflow: "hidden",
                  position: "relative",
                }}
                className="w-[110px] h-[161px] flex-shrink-0 rounded border border-gray-200 bg-white"
              >
                <div
                  ref={livePreviewNodeRef}
                  style={{
                    width: 390,
                    height: 570,
                    transform: "scale(0.28205)",
                    transformOrigin: "top left",
                    pointerEvents: "none",
                  }}
                >
                  <TradingCardPreview
                    previewCardNodeRef={null}
                    uploads={state.uploads}
                    activeText={null}
                    setActiveText={() => {}}
                    activeImage={null}
                    setActiveImage={() => {}}
                    updateUploadPosition={() => {}}
                    updateUploadSize={() => {}}
                    workingcard={state.workingcard}
                    setworkingcard={() => {}}
                    baseFront={state.baseFront}
                    baseBack={state.baseBack}
                    cardfinder={state.cardfinder}
                    cardti={state.cardti}
                    carddes={state.carddes}
                    displayAttributeOne={state.displayAttributeOne}
                    displayAttributeTwo={state.displayAttributeTwo}
                    displayAttributeThree={state.displayAttributeThree}
                    acarddate={state.acarddate}
                    labelone={state.labelone}
                    labeltwo={state.labeltwo}
                    labelthree={state.labelthree}
                    attrIconOne={state.attrIconOne}
                    attrIconTwo={state.attrIconTwo}
                    attrIconThree={state.attrIconThree}
                    attributeName={state.attributeName}
                    backDateDisplay={state.backDateDisplay}
                    backDescription={state.backDescription}
                    backHighlightsTitle={state.backHighlightsTitle}
                    backHighlightsPreview={state.backHighlightsPreview}
                    backLegacyTagline={state.backLegacyTagline}
                    backLegacyText={state.backLegacyText}
                    isblack={state.isblack}
                    isMini={true}
                  />
                </div>
              </div>
              {/* Info */}
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Front #{savedSlots.length + 1}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-sky-600 font-medium">
                  ✏️ Editing
                </span>
              </div>
            </div>
          )}

        {savedSlots.map((slot, index) => {
          const isEditing = editingSlotId === slot.id;
          return (
            <div
              key={slot.id}
              onClick={() => onEditSlot(slot)}
              className={`relative flex flex-col items-center border rounded-xl p-3 shadow-sm cursor-pointer transition-all duration-200 ${
                isEditing
                  ? "bg-sky-50 border-sky-400 ring-2 ring-sky-200"
                  : "bg-white border-gray-200 hover:border-sky-300 hover:bg-sky-50"
              }`}
            >
              {/* Thumbnail (Live if editing) */}
              {isEditing && state ? (
                <div
                  style={{
                    width: 110,
                    height: 161,
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="w-27.5 h-40.25 shrink-0 rounded border border-gray-200 bg-white"
                >
                  <div
                    ref={livePreviewNodeRef}
                    style={{
                      width: 390,
                      height: 570,
                      transform: "scale(0.28205)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                  >
                    <TradingCardPreview
                      previewCardNodeRef={null}
                      uploads={state.uploads}
                      activeText={null}
                      setActiveText={() => {}}
                      activeImage={null}
                      setActiveImage={() => {}}
                      updateUploadPosition={() => {}}
                      updateUploadSize={() => {}}
                      workingcard={state.workingcard}
                      setworkingcard={() => {}}
                      baseFront={state.baseFront}
                      baseBack={state.baseBack}
                      cardfinder={state.cardfinder}
                      cardti={state.cardti}
                      carddes={state.carddes}
                      displayAttributeOne={state.displayAttributeOne}
                      displayAttributeTwo={state.displayAttributeTwo}
                      displayAttributeThree={state.displayAttributeThree}
                      acarddate={state.acarddate}
                      labelone={state.labelone}
                      labeltwo={state.labeltwo}
                      labelthree={state.labelthree}
                      attrIconOne={state.attrIconOne}
                      attrIconTwo={state.attrIconTwo}
                      attrIconThree={state.attrIconThree}
                      attributeName={state.attributeName}
                      backDateDisplay={state.backDateDisplay}
                      backDescription={state.backDescription}
                      backHighlightsTitle={state.backHighlightsTitle}
                      backHighlightsPreview={state.backHighlightsPreview}
                      backLegacyTagline={state.backLegacyTagline}
                      backLegacyText={state.backLegacyText}
                      isblack={state.isblack}
                      isMini={true}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: 110,
                    height: 161,
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="shrink-0 rounded border border-gray-200 bg-white"
                >
                  <div
                    style={{
                      width: 390,
                      height: 570,
                      transform: "scale(0.28205)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                  >
                    <TradingCardPreview
                      previewCardNodeRef={null}
                      uploads={slot.snapshot.uploads ?? []}
                      activeText={null}
                      setActiveText={() => {}}
                      activeImage={null}
                      setActiveImage={() => {}}
                      updateUploadPosition={() => {}}
                      updateUploadSize={() => {}}
                      workingcard="front"
                      setworkingcard={() => {}}
                      baseFront={slot.snapshot.baseFront}
                      baseBack={null}
                      cardfinder={slot.snapshot.cardfinder ?? 0}
                      cardti={slot.snapshot.cardti}
                      carddes={slot.snapshot.carddes}
                      displayAttributeOne={slot.snapshot.name}
                      displayAttributeTwo={slot.snapshot.name2}
                      displayAttributeThree={slot.snapshot.name3}
                      acarddate={slot.snapshot.acarddate}
                      labelone={slot.snapshot.labelone}
                      labeltwo={slot.snapshot.labeltwo}
                      labelthree={slot.snapshot.labelthree}
                      attrIconOne={slot.snapshot.attrIconOne}
                      attrIconTwo={slot.snapshot.attrIconTwo}
                      attrIconThree={slot.snapshot.attrIconThree}
                      attributeName={slot.snapshot.attributeName}
                      backDateDisplay=""
                      backDescription=""
                      backHighlightsTitle=""
                      backHighlightsPreview={[]}
                      backLegacyTagline=""
                      backLegacyText=""
                      isblack={slot.snapshot.isblack ?? false}
                      isMini={true}
                    />
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Front #{index + 1}
                </p>
                {isEditing ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-sky-600 font-medium">
                    ✏️ Editing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <BsCheckCircleFill className="text-[10px]" /> Saved
                  </span>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSlot(slot.id);
                }}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition p-1.5 rounded-full bg-white/90 shadow-sm border border-gray-100 hover:bg-red-50 z-10"
                title="Remove design"
              >
                <RxCross2 className="text-sm cursor-pointer" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Checkout */}
      {savedSlots.length >= 1 && (
        <div className="mt-1">
          <p className="text-[10px] text-gray-400 text-center">
            {savedSlots.length} of {packageConfig.designs} designs ·{" "}
            {packageConfig.totalCards} cards total
          </p>
        </div>
      )}
    </div>
  );
};

export default TradingCardSidebar;
