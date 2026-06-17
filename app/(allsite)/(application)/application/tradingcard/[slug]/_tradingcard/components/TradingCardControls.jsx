import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BsCardText, BsCheckCircleFill, BsImage, BsSuitSpade, BsSuitSpadeFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import CharactersCountComponent from "@/app/componnent/CharactersCountComponent";

import { TEMPLATE_MAP, attributeIconOptions } from "../constants";

export default function TradingCardControls({
    sidebarTab,
    setSidebarTab,
    setworkingcard,
    workingcard,
    frontImages,
    baseFront,
    setBaseFront,
    setcardfinder,
    backImages,
    baseBack,
    setBaseBack,
    backDescription,
    setBackDescription,
    backHighlightsTitle,
    setBackHighlightsTitle,
    backHighlights,
    addBackHighlight,
    removeBackHighlight,
    updateBackHighlightText,
    updateBackHighlightIcon,
    activeBackHighlightPicker,
    setActiveBackHighlightPicker,
    backLegacyTagline,
    setBackLegacyTagline,
    backLegacyText,
    setBackLegacyText,
    uploads,
    handleUpload,
    activeImage,
    cardti,
    setcardti,
    packageTitle,
    setPackageTitle,
    cardtiltelimite,
    carddes,
    setcarddes,
    carddeslimite,
    packageTitlelimite,
    name,
    setname,
    namelimite,
    name2,
    setname2,
    name2limite,
    name3,
    setname3,
    name3limite,
    labelone,
    setlabelone,
    labeltwo,
    setlabeltwo,
    labelthree,
    setlabelthree,
    acarddate,
    setacarddate,
    acarddatelimite,
    attrIconOne,
    setAttrIconOne,
    attrIconTwo,
    setAttrIconTwo,
    attrIconThree,
    setAttrIconThree,
    activeIconPicker,
    setActiveIconPicker,
    getSliderTrackStyle,
    renderIconPreview,
    savedSlots,
    handleNext,
    spinloading,
    doneloading,
    packageConfig,
    editingSlotId,
    smallconOpen,
    setsmallconOpen
}) {
    const searchParams = useSearchParams();
    const selectedTemplate = searchParams.get("template");

    const filteredTemplates = Object.entries(TEMPLATE_MAP).filter(([key]) => {
        if (selectedTemplate) {
            return key === selectedTemplate;
        }
        return true;
    });

    return (
        <div className={`absolute transition-all duration-300 ${smallconOpen ? "top-px" : "top-3/4 sm:top-2/3"} lg:static lg:block col-span-10 row-span-1 lg:row-span-10 lg:col-span-4 w-full max-w-full h-full bg-white border-t border-gray-300 lg:border-l lg:border-gray-200 px-2 md:px-6 lg:px-6 mt-2 lg:mt-0 shadow-2xl lg:shadow-md z-50 overflow-x-hidden`}>
            
            <div className="w-full flex lg:hidden items-center justify-center">
                <div 
                    onClick={() => setsmallconOpen(!smallconOpen)} 
                    className="w-fit p-2 rounded-full cursor-pointer"
                >
                    <div className="bg-sky-300 w-[100px] h-[10px] rounded-full flex items-center justify-center p-2">
                        <IoIosArrowDown className={`text-white ${!smallconOpen && "rotate-180"}`} />
                    </div>
                </div>
            </div>

            <div className="h-full lg:h-[83vh] overflow-y-scroll mt-2 pb-32 lg:pb-0">
                <div className="sticky top-0 z-20 bg-white border-b border-gray-200 backdrop-blur-sm">
                    <div className="grid grid-cols-3">
                        <button
                            onClick={() => { setSidebarTab("front"); setworkingcard("front"); }}
                            className={`py-4 flex flex-col items-center justify-center gap-1 border-b-2 cursor-pointer transition-all duration-200 ${sidebarTab === "front" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500"}`}
                        >
                            <BsSuitSpadeFill className="text-xl" />
                            <span className="text-sm font-semibold">Front</span>
                        </button>
                        <button
                            onClick={() => setSidebarTab("attributes")}
                            className={`py-4 flex flex-col items-center justify-center gap-1 border-b-2 cursor-pointer transition-all duration-200 ${sidebarTab === "attributes" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500"}`}
                        >
                            <BsCardText className="text-xl" />
                            <span className="text-sm font-semibold">Attributes</span>
                        </button>
                        <button
                            onClick={() => { setSidebarTab("back"); setworkingcard("back"); }}
                            className={`py-4 flex flex-col items-center justify-center gap-1 border-b-2 cursor-pointer transition-all duration-200 ${sidebarTab === "back" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500"}`}
                        >
                            <BsSuitSpade className="text-xl" />
                            <span className="text-sm font-semibold">Back</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    {/* Front Base Card */}
                    {sidebarTab === "front" && (
                        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-2.5 shadow-sm">
                            <div className="mb-2 flex items-center justify-between gap-2">
                                <label className="block text-gray-800 font-semibold">
                                    Front Base Card <span className="text-red-600 text-xl">*</span>
                                </label>
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    {filteredTemplates.length} styles
                                </span>
                            </div>

                            <p className="text-xs text-slate-500 mb-1.5">Pick a premium frame style for the front of your trading card.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto pr-1">
                                {filteredTemplates.map(([key, tpl], idx) => {
                                    const isSelected = baseFront === tpl.image;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => { setBaseFront(tpl.image); setcardfinder(tpl.cardfinder); }}
                                            className={`relative overflow-hidden rounded-lg border transition-all duration-200 cursor-pointer ${isSelected
                                                ? "border-sky-500 ring-2 ring-sky-200 shadow-md"
                                                : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                                                }`}
                                            type="button"
                                            aria-label={`Select front base card ${key}`}
                                        >
                                            <Image
                                                src={tpl.image}
                                                width={1000}
                                                height={1000}
                                                alt={`front-${key}`}
                                                className="w-full aspect-[3/4] object-contain bg-slate-100"
                                            />
                                            {isSelected && (
                                                <div className="absolute top-1.5 right-1.5 rounded-full bg-white/95 p-1 shadow-sm">
                                                    <BsCheckCircleFill className="text-sky-500 text-sm" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Back Base Card */}
                    {sidebarTab === "back" && (
                        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <label className="block text-gray-800 font-semibold">
                                    Back Base Card <span className="text-red-600 text-xl">*</span>
                                </label>
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    {backImages?.length || 0} styles
                                </span>
                            </div>

                            <p className="text-xs text-slate-500 mb-3">Choose the back design. Preview shows full card proportion.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {backImages?.map((img, idx) => {
                                    const isSelected = baseBack === img?.image;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setBaseBack(img?.image)}
                                            className={`relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                                                ? "border-sky-500 ring-2 ring-sky-200 shadow-md"
                                                : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                                                }`}
                                            type="button"
                                            aria-label={`Select back base card ${idx + 1}`}
                                        >
                                            <Image
                                                src={img?.image}
                                                width={1000}
                                                height={1000}
                                                alt={`back-${idx}`}
                                                className="w-full aspect-[5/7] object-contain bg-slate-100"
                                            />
                                            {isSelected && (
                                                <div className="absolute top-1.5 right-1.5 rounded-full bg-white/95 p-1 shadow-sm">
                                                    <BsCheckCircleFill className="text-sky-500 text-sm" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {sidebarTab === "back" && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-5">
                            <div>
                                <label className="block text-gray-800 font-semibold mb-2">Description</label>
                                <textarea
                                    value={backDescription}
                                    onChange={(e) => setBackDescription(e.target.value)}
                                    placeholder="Add a brief description..."
                                    className="w-full h-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 font-semibold mb-2">Highlights Title</label>
                                <input
                                    value={backHighlightsTitle}
                                    onChange={(e) => setBackHighlightsTitle(e.target.value)}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 mb-4"
                                />

                                <div className="mb-3 flex items-center justify-between">
                                    <label className="block text-gray-800 font-semibold">Highlights (2-6)</label>
                                    <button
                                        type="button"
                                        onClick={addBackHighlight}
                                        disabled={backHighlights.length >= 6}
                                        className={`h-9 rounded-xl border px-3 text-sm font-semibold transition-all duration-200 ${backHighlights.length >= 6
                                            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                                            }`}
                                    >
                                        + Add
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {backHighlights.map((item) => (
                                        <div key={item.id} className="relative flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setActiveBackHighlightPicker((prev) => (prev === item.id ? null : item.id))}
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                            >
                                                {renderIconPreview(item.icon, "Selected highlight icon")}
                                            </button>
                                            <input
                                                value={item.text}
                                                onChange={(e) => updateBackHighlightText(item.id, e.target.value)}
                                                placeholder="Highlight text"
                                                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeBackHighlight(item.id)}
                                                className="h-8 w-8 shrink-0 rounded-full text-xl text-slate-600 hover:bg-slate-100"
                                            >
                                                ×
                                            </button>

                                            {activeBackHighlightPicker === item.id && (
                                                <div className="absolute top-11 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                    <div className="grid grid-cols-8 gap-2">
                                                        {attributeIconOptions.map((icon) => (
                                                            <button
                                                                key={`${item.id}-${icon}`}
                                                                type="button"
                                                                onClick={() => updateBackHighlightIcon(item.id, icon)}
                                                                className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                            >
                                                                {renderIconPreview(icon, "Highlight icon option")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px w-full bg-slate-200" />

                            <div>
                                <label className="block text-gray-800 font-semibold mb-2">Legacy Tagline</label>
                                <input
                                    value={backLegacyTagline}
                                    onChange={(e) => setBackLegacyTagline(e.target.value)}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 font-semibold mb-2">Legacy Text</label>
                                <textarea
                                    value={backLegacyText}
                                    onChange={(e) => setBackLegacyText(e.target.value)}
                                    className="w-full h-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>
                        </div>
                    )}

                    {/* Upload Image */}
                    {sidebarTab === "front" && (
                        <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <label className="block text-gray-800 font-semibold">
                                    Upload Image <span className="text-red-600 text-xl">*</span>
                                </label>
                                <span className="text-gray-600 bg-amber-100 px-2 py-1 rounded-md text-xs font-medium">Recommended: 250 x 334 px</span>
                            </div>

                            <label
                                htmlFor="uploadImage"
                                className="group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-4 transition-all duration-200 hover:border-sky-400 hover:bg-sky-50"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <CiCirclePlus className="text-5xl text-sky-400 group-hover:scale-105 transition-transform" />
                                </div>

                                <div className="flex-1 text-left">
                                    <div className="text-sm font-semibold text-slate-700">Click to upload a photo</div>
                                    <div className="text-xs text-slate-500">PNG, JPG or WEBP. After upload, drag and resize it on the card preview.</div>
                                </div>

                                <BsImage className="text-xl text-slate-400 hidden sm:block" />
                            </label>

                            <div className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                                {uploads?.length > 0
                                    ? `Uploaded image${uploads?.length > 1 ? "s" : ""}: ${uploads?.length}. You can reposition it from the preview area.`
                                    : "No image uploaded yet. Add one to personalize the front design."}
                            </div>

                            {activeImage && (
                                <div className="mt-2 text-xs text-emerald-700 font-medium">Image selected. You can drag and resize directly on canvas.</div>
                            )}

                            <input onChange={handleUpload} id="uploadImage" type="file" className="hidden" accept="image/*" />
                        </div>
                    )}

                    {/* Attribute Tab Controls */}
                    {sidebarTab === "attributes" && (
                        <div className="space-y-4">
                            {/* Packaging Information */}
                            <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Packaging Information
                                    </h3>
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                                    <span className="flex items-center gap-1">
                                        Recipient Name
                                        <span className="text-red-500">*</span>
                                    </span>

                                    <CharactersCountComponent
                                        text={carddes}
                                        limit={carddeslimite}
                                    />
                                </label>

                                <textarea
                                    maxLength={carddeslimite}
                                    value={carddes}
                                    onChange={(e) => setcarddes(e.target.value)}
                                    placeholder="Write a meaningful message..."
                                    className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                                />
                                </div>

                                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                                    <span className="flex items-center gap-1">
                                        Package Title
                                        <span className="text-red-500">*</span>
                                    </span>
                                    <CharactersCountComponent
                                        text={packageTitle}
                                        limit={packageTitlelimite}
                                    />
                                </label>
                                <input
                                    maxLength={packageTitlelimite}
                                    value={packageTitle}
                                    onChange={(e) => setPackageTitle(e.target.value)}
                                    placeholder="Enter package title..."
                                    className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                                />
                            </div>
                            <div className="border border-gray-200 p-4 md:p-5 mb-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                
                                <label className="block text-xl text-gray-700 mb-3 mt-4 font-semibold">Card Content</label>

                                <div className="w-full flex items-center gap-3 mb-3 rounded-lg p-1 transition-shadow duration-200 hover:shadow-sm">
                                    <div className="w-full">
                                        <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                                            <span className="flex items-center gap-1">
                                                Card Title
                                                <span className="text-red-500">*</span>
                                            </span>

                                            <CharactersCountComponent
                                                text={cardti}
                                                limit={cardtiltelimite}
                                            />
                                        </label>
                                        <input 
                                            value={cardti} 
                                            maxLength={cardtiltelimite} 
                                            onChange={(e) => setcardti(e.target.value)} 
                                            type="text" 
                                            className="border border-slate-200 px-3 py-2 rounded-lg text-slate-700 outline-none w-full transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100" 
                                        />
                                    </div>
                                </div>

                                {/* <div className="w-full flex items-center gap-3 mb-3 rounded-lg p-1 transition-shadow duration-200 hover:shadow-sm">
                                    <div className="w-full">
                                        <label className="text-gray-500 mb-1 text-sm flex items-center justify-between">
                                            <span>Created For: <span className="text-red-600 text-xl">*</span></span>
                                            <div className="relative">
                                                <CharactersCountComponent text={carddes} limit={carddeslimite} />
                                            </div>
                                        </label>
                                        <textarea 
                                            maxLength={carddeslimite} 
                                            value={carddes} 
                                            onChange={(e) => setcarddes(e.target.value)} 
                                            className="border border-gray-200 px-3 py-2 rounded-lg text-gray-600 outline-none w-full h-[90px] transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                        />
                                    </div>
                                </div> */}
                            </div>

                            <div className="border border-gray-200 p-4 md:p-5 mb-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                <label className="block text-xl text-gray-700 mb-3 font-semibold">Card Attributes</label>

                                <div className="space-y-3">
                                    {/* Attribute One */}
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="relative flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIconPicker((prev) => (prev === "one" ? null : "one"))}
                                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                            >
                                                {renderIconPreview(attrIconOne, "Attribute one icon")}
                                            </button>
                                            <input
                                                value={name}
                                                maxLength={namelimite}
                                                onChange={(e) => setname(e.target.value)}
                                                type="text"
                                                placeholder="Attribute One"
                                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                                            />

                                            {activeIconPicker === "one" && (
                                                <div className="absolute top-14 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                    <div className="grid grid-cols-8 gap-2">
                                                        {attributeIconOptions.map((icon) => (
                                                            <button
                                                                key={`one-${icon}`}
                                                                type="button"
                                                                onClick={() => { setAttrIconOne(icon); setActiveIconPicker(null); }}
                                                                className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                            >
                                                                {renderIconPreview(icon, "Attribute icon option")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-3 mb-1 flex items-center justify-between text-sm text-slate-600">
                                            <span>Value</span>
                                            <span className="font-medium text-slate-800">{labelone}</span>
                                        </div>
                                        <input
                                            min={1}
                                            max={100}
                                            value={labelone}
                                            onChange={(e) => setlabelone(e.target.value)}
                                            type="range"
                                            className="h-2 w-full cursor-pointer appearance-none rounded-full"
                                            style={getSliderTrackStyle(labelone)}
                                        />
                                    </div>

                                    {/* Attribute Two */}
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="relative flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIconPicker((prev) => (prev === "two" ? null : "two"))}
                                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                            >
                                                {renderIconPreview(attrIconTwo, "Attribute two icon")}
                                            </button>
                                            <input
                                                value={name2}
                                                maxLength={name2limite}
                                                onChange={(e) => setname2(e.target.value)}
                                                type="text"
                                                placeholder="Attribute Two"
                                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                                            />

                                            {activeIconPicker === "two" && (
                                                <div className="absolute top-14 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                    <div className="grid grid-cols-8 gap-2">
                                                        {attributeIconOptions.map((icon) => (
                                                            <button
                                                                key={`two-${icon}`}
                                                                type="button"
                                                                onClick={() => { setAttrIconTwo(icon); setActiveIconPicker(null); }}
                                                                className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                            >
                                                                {renderIconPreview(icon, "Attribute icon option")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-3 mb-1 flex items-center justify-between text-sm text-slate-600">
                                            <span>Value</span>
                                            <span className="font-medium text-slate-800">{labeltwo}</span>
                                        </div>
                                        <input
                                            min={1}
                                            max={100}
                                            value={labeltwo}
                                            onChange={(e) => setlabeltwo(e.target.value)}
                                            type="range"
                                            className="h-2 w-full cursor-pointer appearance-none rounded-full"
                                            style={getSliderTrackStyle(labeltwo)}
                                        />
                                    </div>

                                    {/* Attribute Three */}
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="relative flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIconPicker((prev) => (prev === "three" ? null : "three"))}
                                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                            >
                                                {renderIconPreview(attrIconThree, "Attribute three icon")}
                                            </button>
                                            <input
                                                value={name3}
                                                maxLength={name3limite}
                                                onChange={(e) => setname3(e.target.value)}
                                                type="text"
                                                placeholder="Attribute Three"
                                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                                            />

                                            {activeIconPicker === "three" && (
                                                <div className="absolute top-14 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                    <div className="grid grid-cols-8 gap-2">
                                                        {attributeIconOptions.map((icon) => (
                                                            <button
                                                                key={`three-${icon}`}
                                                                type="button"
                                                                onClick={() => { setAttrIconThree(icon); setActiveIconPicker(null); }}
                                                                className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                            >
                                                                {renderIconPreview(icon, "Attribute icon option")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-3 mb-1 flex items-center justify-between text-sm text-slate-600">
                                            <span>Value</span>
                                            <span className="font-medium text-slate-800">{labelthree}</span>
                                        </div>
                                        <input
                                            min={1}
                                            max={100}
                                            value={labelthree}
                                            onChange={(e) => setlabelthree(e.target.value)}
                                            type="range"
                                            className="h-2 w-full cursor-pointer appearance-none rounded-full"
                                            style={getSliderTrackStyle(labelthree)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 p-4 md:p-5 mb-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                <label className="block text-xl text-gray-700 mb-3 font-semibold">About Card Date</label>
                                <div className="w-full flex items-center mb-1 rounded-lg p-1 transition-shadow duration-200 hover:shadow-sm">
                                    <div className="w-full flex flex-col">
                                        <label className="text-gray-500 mb-1 text-sm flex items-center justify-between">
                                            <span>Card Date/Tag: <span className="text-red-600 text-xl">*</span></span>
                                            <div className="relative">
                                                <CharactersCountComponent text={acarddate} limit={acarddatelimite} />
                                            </div>
                                        </label>
                                        <input 
                                            value={acarddate} 
                                            maxLength={acarddatelimite} 
                                            onChange={(e) => setacarddate(e.target.value)} 
                                            type="text" 
                                            className="border border-slate-200 px-3 py-2 rounded-lg text-slate-700 outline-none transition-all duration-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {savedSlots.length >= 0 && (
                <button
                    onClick={handleNext}
                    disabled={spinloading || doneloading || (!baseFront && !(savedSlots.length >= packageConfig.designs && editingSlotId === null))}
                    className="w-full bg-[#00bcff] text-white text-lg font-semibold py-2.5 mt-1 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                    {doneloading || spinloading
                        ? "Please wait..."
                        : editingSlotId
                            ? "Update Design"
                            : savedSlots.length >= packageConfig.designs
                                ? workingcard === "front"
                                    ? "Customize Back Card"
                                    : "Go to Checkout"
                                : savedSlots.length >= packageConfig.designs - 1
                                    ? workingcard === "front"
                                        ? `Save & Customize Back (${savedSlots.length + 1}/${packageConfig.designs})`
                                        : `Save & Checkout (${savedSlots.length + 1}/${packageConfig.designs})`
                                    : `Next (${savedSlots.length + 1}/${packageConfig.designs})`
                    }
                </button>
            )}
        </div>
    );
}
