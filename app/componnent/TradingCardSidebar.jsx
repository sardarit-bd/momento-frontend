import { BsCheckCircleFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import SpinLoader from "./SpingLoader";

const TradingCardSidebar = ({
    savedSlots,
    packageConfig,
    onSaveSlot,
    onDeleteSlot,
    onEditSlot,        // ← NEW
    onCheckout,
    doneloading,
    spinloading,
    canSave,
    editingSlotId,     // ← NEW
}) => {
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
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 bg-gray-50 rounded-xl border border-gray-100 shadow-inner p-2 min-h-[200px] max-h-[60vh]">
                {savedSlots.length === 0 && (
                    <div className="h-full flex items-center justify-center text-xs text-gray-400 text-center py-8">
                        No designs saved yet.<br />Customize and save your first design.
                    </div>
                )}

                {savedSlots.map((slot, index) => {
                    const isEditing = editingSlotId === slot.id;
                    return (
                        <div
                            key={slot.id}
                            onClick={() => onEditSlot(slot)}
                            className={`flex items-center gap-2 border rounded-lg p-2 shadow-sm cursor-pointer transition-all duration-200 ${
                                isEditing
                                    ? "bg-sky-50 border-sky-400 ring-2 ring-sky-200"
                                    : "bg-white border-gray-200 hover:border-sky-300 hover:bg-sky-50"
                            }`}
                        >
                            {/* Thumbnail */}
                            <img
                                src={slot.previewDataUrl}
                                alt={`Design ${index + 1}`}
                                className="w-10 h-14 object-cover rounded border border-gray-200 flex-shrink-0"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-700 truncate">
                                    Design {index + 1}
                                </p>
                                <p className="text-[10px] text-gray-400 truncate">
                                    {slot.snapshot.cardti}
                                </p>
                                {isEditing ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-sky-600 font-medium mt-0.5">
                                        ✏️ Editing...
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium mt-0.5">
                                        <BsCheckCircleFill className="text-[10px]" /> Saved
                                    </span>
                                )}
                            </div>

                            {/* Delete */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteSlot(slot.id); }}
                                className="flex-shrink-0 text-red-400 hover:text-red-600 transition p-1 rounded hover:bg-red-50"
                                title="Remove design"
                            >
                                <RxCross2 className="text-sm" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Save / Update button */}
            <div className="mt-3">
                {editingSlotId !== null ? (
                    // Editing mode — show Update button
                    <button
                        onClick={onSaveSlot}
                        disabled={doneloading || !canSave}
                        className="w-full flex items-center justify-center gap-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-2 text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {doneloading ? "Updating..." : "✓ Update Design"}
                    </button>
                ) : savedSlots.length < packageConfig.designs ? (
                    // New slot mode — show Save button
                    <button
                        onClick={onSaveSlot}
                        disabled={doneloading || !canSave}
                        className="w-full flex items-center justify-center gap-1 border border-dashed border-gray-300 rounded-lg py-2 text-xs text-gray-500 hover:border-sky-400 hover:text-sky-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CiCirclePlus className="text-base" />
                        {doneloading
                            ? "Saving..."
                            : `Save Design (${savedSlots.length + 1}/${packageConfig.designs})`}
                    </button>
                ) : (
                    <div className="w-full text-center py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-600 font-medium">
                        ✓ All {packageConfig.designs} design(s) saved
                    </div>
                )}
            </div>

            {/* Checkout */}
            {savedSlots.length >= 1 && (
                <div className="mt-1">
                    <p className="text-[10px] text-gray-400 text-center">
                        {savedSlots.length} of {packageConfig.designs} designs · {packageConfig.totalCards} cards total
                    </p>
                </div>
            )}
        </div>
    );
};

export default TradingCardSidebar;