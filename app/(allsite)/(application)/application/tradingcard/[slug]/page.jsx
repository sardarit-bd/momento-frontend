"use client";

import React, { useState } from "react";
import { useTradingCardState } from "./_tradingcard/hooks/useTradingCardState";
import TradingCardPreview from "./_tradingcard/components/TradingCardPreview";
import TradingCardControls from "./_tradingcard/components/TradingCardControls";
import TradingCardApplicationSkelaton from "@/app/componnent/TradingCardApplicationSkelaton";
import TradingCardSidebar from "@/app/componnent/TradingCardSidebar";
import TradingBoxPreview from "@/app/componnent/TradingBoxPreview/TradingBoxPreview";
import { ToastContainer } from "react-toastify";
import TradingCardCaptureNode from "@/app/componnent/TradingCardCaptureNode";

export default function ProductCustomizer() {
    const state = useTradingCardState();
    // Mobile drawer: null | "front" | "attributes" | "back"
    const [mobileDrawer, setMobileDrawer] = useState(null);

    if (state.fetchingDataLoading) {
        return <TradingCardApplicationSkelaton />;
    }

    return (
        <>
            {/* ─────────────────────────────────────────────
                DESKTOP LAYOUT  (lg and above — untouched)
            ───────────────────────────────────────────── */}
            <div className="hidden lg:grid grid-cols-12 grid-rows-12 gap-2 h-screen w-screen fixed bg-gray-100">
                {/* Left Sidebar */}
                <div className="col-span-2 row-span-12 w-full h-full bg-white shadow-sm">
                    <div className="w-full h-full">
                        <TradingCardSidebar
                            savedSlots={state.savedSlots}
                            packageConfig={state.packageConfig}
                            onSaveSlot={state.handleSaveSlot}
                            onDeleteSlot={state.handleDeleteSlot}
                            onEditSlot={state.handleEditSlot}
                            onCheckout={state.goToFinalView}
                            doneloading={state.doneloading}
                            spinloading={state.spinloading}
                            canSave={!!state.baseFront}
                            editingSlotId={state.editingSlotId}
                            state={state}
                        />
                    </div>
                </div>

                {/* Middle + Right */}
                <div className="col-span-10 row-span-12 h-full w-full">
                    <div className="grid grid-cols-10 grid-rows-10 h-full w-full relative">
                        <TradingCardPreview
                            previewCardNodeRef={state.previewCardNodeRef}
                            uploads={state.uploads}
                            activeText={state.activeText}
                            setActiveText={state.setActiveText}
                            activeImage={state.activeImage}
                            setActiveImage={state.setActiveImage}
                            updateUploadPosition={state.updateUploadPosition}
                            updateUploadSize={state.updateUploadSize}
                            workingcard={state.workingcard}
                            setworkingcard={state.setworkingcard}
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
                            backDateDisplay={state.backDateDisplay}
                            backDescription={state.backDescription}
                            backHighlightsTitle={state.backHighlightsTitle}
                            backHighlightsPreview={state.backHighlightsPreview}
                            backLegacyTagline={state.backLegacyTagline}
                            backLegacyText={state.backLegacyText}
                            isblack={state.isblack}
                        />

                        <TradingCardControls
                            sidebarTab={state.sidebarTab}
                            setSidebarTab={state.setSidebarTab}
                            setworkingcard={state.setworkingcard}
                            workingcard={state.workingcard}
                            frontImages={state.frontImages}
                            baseFront={state.baseFront}
                            setBaseFront={state.setBaseFront}
                            setcardfinder={state.setcardfinder}
                            backImages={state.backImages}
                            baseBack={state.baseBack}
                            setBaseBack={state.setBaseBack}
                            backDescription={state.backDescription}
                            setBackDescription={state.setBackDescription}
                            backHighlightsTitle={state.backHighlightsTitle}
                            setBackHighlightsTitle={state.setBackHighlightsTitle}
                            backHighlights={state.backHighlights}
                            addBackHighlight={state.addBackHighlight}
                            removeBackHighlight={state.removeBackHighlight}
                            updateBackHighlightText={state.updateBackHighlightText}
                            updateBackHighlightIcon={state.updateBackHighlightIcon}
                            activeBackHighlightPicker={state.activeBackHighlightPicker}
                            setActiveBackHighlightPicker={state.setActiveBackHighlightPicker}
                            backLegacyTagline={state.backLegacyTagline}
                            setBackLegacyTagline={state.setBackLegacyTagline}
                            backLegacyText={state.backLegacyText}
                            setBackLegacyText={state.setBackLegacyText}
                            uploads={state.uploads}
                            handleUpload={state.handleUpload}
                            activeImage={state.activeImage}
                            cardti={state.cardti}
                            setcardti={state.setcardti}
                            packageTitle={state.packageTitle}
                            setPackageTitle={state.setPackageTitle}
                            packageTitlelimite={state.packageTitlelimite}
                            cardtiltelimite={state.cardtiltelimite}
                            carddes={state.carddes}
                            setcarddes={state.setcarddes}
                            carddeslimite={state.carddeslimite}
                            name={state.name}
                            setname={state.setname}
                            namelimite={state.namelimite}
                            name2={state.name2}
                            setname2={state.setname2}
                            name2limite={state.name2limite}
                            name3={state.name3}
                            setname3={state.setname3}
                            name3limite={state.name3limite}
                            labelone={state.labelone}
                            setlabelone={state.setlabelone}
                            labeltwo={state.labeltwo}
                            setlabeltwo={state.setlabeltwo}
                            labelthree={state.labelthree}
                            setlabelthree={state.setlabelthree}
                            acarddate={state.acarddate}
                            setacarddate={state.setacarddate}
                            acarddatelimite={state.acarddatelimite}
                            attrIconOne={state.attrIconOne}
                            setAttrIconOne={state.setAttrIconOne}
                            attrIconTwo={state.attrIconTwo}
                            setAttrIconTwo={state.setAttrIconTwo}
                            attrIconThree={state.attrIconThree}
                            setAttrIconThree={state.setAttrIconThree}
                            activeIconPicker={state.activeIconPicker}
                            setActiveIconPicker={state.setActiveIconPicker}
                            getSliderTrackStyle={state.getSliderTrackStyle}
                            renderIconPreview={state.renderIconPreview}
                            savedSlots={state.savedSlots}
                            handleNext={state.handleNext}
                            spinloading={state.spinloading}
                            doneloading={state.doneloading}
                            packageConfig={state.packageConfig}
                            editingSlotId={state.editingSlotId}
                            smallconOpen={state.smallconOpen}
                            setsmallconOpen={state.setsmallconOpen}
                        />
                    </div>
                </div>

                {/* Hidden trading box composite */}
                <div className="absolute opacity-0 pointer-events-none" style={{ zIndex: -1 }}>
                    <TradingBoxPreview
                        ref={state.tradingBoxPreviewRef}
                        packTitle={state.packageTitle}
                        createdFor={state.carddes}
                    />
                </div>
            </div>

            {/* ─────────────────────────────────────────────
                MOBILE LAYOUT  (below lg)
            ───────────────────────────────────────────── */}
            <div className="lg:hidden flex flex-col w-screen fixed bg-gray-100 overflow-hidden justify-between" style={{ height: '100dvh' }}>

                {/* 1. Card Canvas — fills remaining space above the bottom bar */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden" style={{ minHeight: 0 }}>
                    <TradingCardPreview
                        isMobileCanvas={true}
                        previewCardNodeRef={state.previewCardNodeRef}
                        uploads={state.uploads}
                        activeText={state.activeText}
                        setActiveText={state.setActiveText}
                        activeImage={state.activeImage}
                        setActiveImage={state.setActiveImage}
                        updateUploadPosition={state.updateUploadPosition}
                        updateUploadSize={state.updateUploadSize}
                        workingcard={state.workingcard}
                        setworkingcard={state.setworkingcard}
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
                        backDateDisplay={state.backDateDisplay}
                        backDescription={state.backDescription}
                        backHighlightsTitle={state.backHighlightsTitle}
                        backHighlightsPreview={state.backHighlightsPreview}
                        backLegacyTagline={state.backLegacyTagline}
                        backLegacyText={state.backLegacyText}
                        isblack={state.isblack}
                    />

                    {/* Right-side vertical tab strip */}
                    <MobileTabStrip
                        activeTab={mobileDrawer}
                        onTabClick={(tab) => {
                            setMobileDrawer(tab);
                            // Sync sidebarTab so controls render the right panel
                            if (tab === "front") { state.setSidebarTab("front"); state.setworkingcard("front"); }
                            if (tab === "attributes") state.setSidebarTab("attributes");
                            if (tab === "back") { state.setSidebarTab("back"); state.setworkingcard("back"); }
                        }}
                    />
                </div>

                {/* 2. Bottom saved-cards bar — always visible, horizontally scrollable */}
                <div className="flex-shrink-0 bg-white border-t border-gray-200 shadow-lg overflow-hidden" style={{ height: 155 }}>
                    <MobileSavedSlotsBar
                        savedSlots={state.savedSlots}
                        packageConfig={state.packageConfig}
                        editingSlotId={state.editingSlotId}
                        onEditSlot={state.handleEditSlot}
                        onDeleteSlot={state.handleDeleteSlot}
                        state={state}
                        onCheckout={state.goToFinalView}
                    />
                </div>

                {/* 3. Full-screen right drawer */}
                {mobileDrawer && (
                    <div className="absolute inset-0 z-50 bg-white flex flex-col">
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
                            <span className="text-gray-800 font-semibold text-base capitalize">
                                {mobileDrawer === "front" ? "Front" : mobileDrawer === "attributes" ? "Attributes" : "Back"}
                            </span>
                            <button
                                onClick={() => setMobileDrawer(null)}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                                aria-label="Close drawer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Drawer body — full TradingCardControls in mobile mode */}
                        <div className="flex-1 overflow-hidden">
                            <TradingCardControls
                                isMobileDrawer={true}
                                sidebarTab={state.sidebarTab}
                                setSidebarTab={(tab) => {
                                    state.setSidebarTab(tab);
                                    setMobileDrawer(tab === "front" ? "front" : tab === "attributes" ? "attributes" : "back");
                                }}
                                setworkingcard={state.setworkingcard}
                                workingcard={state.workingcard}
                                frontImages={state.frontImages}
                                baseFront={state.baseFront}
                                setBaseFront={state.setBaseFront}
                                setcardfinder={state.setcardfinder}
                                backImages={state.backImages}
                                baseBack={state.baseBack}
                                setBaseBack={state.setBaseBack}
                                backDescription={state.backDescription}
                                setBackDescription={state.setBackDescription}
                                backHighlightsTitle={state.backHighlightsTitle}
                                setBackHighlightsTitle={state.setBackHighlightsTitle}
                                backHighlights={state.backHighlights}
                                addBackHighlight={state.addBackHighlight}
                                removeBackHighlight={state.removeBackHighlight}
                                updateBackHighlightText={state.updateBackHighlightText}
                                updateBackHighlightIcon={state.updateBackHighlightIcon}
                                activeBackHighlightPicker={state.activeBackHighlightPicker}
                                setActiveBackHighlightPicker={state.setActiveBackHighlightPicker}
                                backLegacyTagline={state.backLegacyTagline}
                                setBackLegacyTagline={state.setBackLegacyTagline}
                                backLegacyText={state.backLegacyText}
                                setBackLegacyText={state.setBackLegacyText}
                                uploads={state.uploads}
                                handleUpload={state.handleUpload}
                                activeImage={state.activeImage}
                                cardti={state.cardti}
                                setcardti={state.setcardti}
                                packageTitle={state.packageTitle}
                                setPackageTitle={state.setPackageTitle}
                                packageTitlelimite={state.packageTitlelimite}
                                cardtiltelimite={state.cardtiltelimite}
                                carddes={state.carddes}
                                setcarddes={state.setcarddes}
                                carddeslimite={state.carddeslimite}
                                name={state.name}
                                setname={state.setname}
                                namelimite={state.namelimite}
                                name2={state.name2}
                                setname2={state.setname2}
                                name2limite={state.name2limite}
                                name3={state.name3}
                                setname3={state.setname3}
                                name3limite={state.name3limite}
                                labelone={state.labelone}
                                setlabelone={state.setlabelone}
                                labeltwo={state.labeltwo}
                                setlabeltwo={state.setlabeltwo}
                                labelthree={state.labelthree}
                                setlabelthree={state.setlabelthree}
                                acarddate={state.acarddate}
                                setacarddate={state.setacarddate}
                                acarddatelimite={state.acarddatelimite}
                                attrIconOne={state.attrIconOne}
                                setAttrIconOne={state.setAttrIconOne}
                                attrIconTwo={state.attrIconTwo}
                                setAttrIconTwo={state.setAttrIconTwo}
                                attrIconThree={state.attrIconThree}
                                setAttrIconThree={state.setAttrIconThree}
                                activeIconPicker={state.activeIconPicker}
                                setActiveIconPicker={state.setActiveIconPicker}
                                getSliderTrackStyle={state.getSliderTrackStyle}
                                renderIconPreview={state.renderIconPreview}
                                savedSlots={state.savedSlots}
                                handleNext={() => { state.handleNext(); setMobileDrawer(null); }}
                                spinloading={state.spinloading}
                                doneloading={state.doneloading}
                                packageConfig={state.packageConfig}
                                editingSlotId={state.editingSlotId}
                                smallconOpen={state.smallconOpen}
                                setsmallconOpen={state.setsmallconOpen}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden nodes — always mounted regardless of breakpoint */}
            <div className="absolute opacity-0 pointer-events-none" style={{ zIndex: -1 }}>
                <TradingBoxPreview
                    ref={state.tradingBoxPreviewRef}
                    packTitle={state.packageTitle}
                    createdFor={state.carddes}
                />
            </div>

            <TradingCardCaptureNode
                ref={state.captureNodeRef}
                workingcard={state.workingcard}
                baseFront={state.baseFront}
                baseBack={state.baseBack}
                cardfinder={state.cardfinder}
                uploads={state.uploads}
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
                backDateDisplay={state.backDateDisplay}
                backDescription={state.backDescription}
                backHighlightsTitle={state.backHighlightsTitle}
                backHighlightsPreview={state.backHighlightsPreview}
                backLegacyTagline={state.backLegacyTagline}
                backLegacyText={state.backLegacyText}
                isblack={state.isblack}
            />

            <ToastContainer position="bottom-center" />
        </>
    );
}

/* ─── Mobile Right-side Vertical Tab Strip ──────────────────────── */
function MobileTabStrip({ activeTab, onTabClick }) {
    const tabs = [
        {
            id: "front",
            label: "Front",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
            ),
        },
        {
            id: "attributes",
            label: "Attrs",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
            ),
        },
        {
            id: "back",
            label: "Back",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18"/>
                </svg>
            ),
        },
    ];

    return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1 pr-0">
            <div className="flex flex-col gap-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-l-2xl shadow-xl overflow-hidden py-1">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabClick(tab.id)}
                            className={`flex flex-col items-center justify-center gap-1 px-3 py-3 transition-all duration-200 min-w-[56px] ${
                                isActive
                                    ? "bg-sky-500 text-white"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                            aria-label={`Open ${tab.label} panel`}
                        >
                            {tab.icon}
                            <span className="text-[10px] font-semibold leading-none">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── Mobile Bottom Saved-Slots Bar ────────────────────────────── */
function MobileSavedSlotsBar({
    savedSlots,
    packageConfig,
    editingSlotId,
    onEditSlot,
    onDeleteSlot,
    state,
    onCheckout,
}) {
    return (
        <div className="h-full flex flex-col">
            {/* Bar header */}
            <div className="flex items-center justify-between px-3 pt-2 pb-1 flex-shrink-0">
                <span className="text-xs font-semibold text-gray-600">
                    Designs{" "}
                    <span className="text-gray-400 font-normal">
                        {savedSlots.length}/{packageConfig.designs}
                    </span>
                </span>
                {savedSlots.length >= packageConfig.designs && (
                    <button
                        onClick={onCheckout}
                        className="text-xs font-semibold bg-sky-500 text-white px-3 py-1 rounded-full shadow"
                    >
                        Checkout →
                    </button>
                )}
            </div>

            {/* Horizontally scrollable slots */}
            <div
                className="flex-1 flex items-center gap-2 overflow-x-auto px-3 pb-2 scrollbar-hide"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {/* Live "editing" slot — shown when a new design is in progress */}
                {editingSlotId === null && savedSlots.length < packageConfig.designs && state && (
                    <MobileSavedSlotCard
                        isEditing
                        label={`#${savedSlots.length + 1}`}
                        state={state}
                        snapshot={null}
                        onDelete={null}
                        onClick={null}
                    />
                )}

                {savedSlots.map((slot, index) => (
                    <MobileSavedSlotCard
                        key={slot.id}
                        isEditing={editingSlotId === slot.id}
                        label={`#${index + 1}`}
                        state={editingSlotId === slot.id ? state : null}
                        snapshot={slot.snapshot}
                        onDelete={() => onDeleteSlot(slot.id)}
                        onClick={() => onEditSlot(slot)}
                    />
                ))}

                {/* Empty placeholder slots */}
                {Array.from({
                    length: Math.max(0, packageConfig.designs - savedSlots.length - (editingSlotId === null ? 1 : 0)),
                }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50"
                        style={{ width: 68, height: 90 }}
                    >
                        <span className="text-gray-300 text-xl">+</span>
                        <span className="text-[10px] text-gray-300 mt-0.5">Empty</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Individual slot card in the bottom bar ────────────────────── */
function MobileSavedSlotCard({ isEditing, label, state, snapshot, onDelete, onClick }) {
    // Determine which props to pass to the mini preview
    const previewProps = isEditing && state
        ? {
            uploads: state.uploads,
            workingcard: state.workingcard,
            baseFront: state.baseFront,
            baseBack: state.baseBack,
            cardfinder: state.cardfinder,
            cardti: state.cardti,
            carddes: state.carddes,
            displayAttributeOne: state.displayAttributeOne,
            displayAttributeTwo: state.displayAttributeTwo,
            displayAttributeThree: state.displayAttributeThree,
            acarddate: state.acarddate,
            labelone: state.labelone,
            labeltwo: state.labeltwo,
            labelthree: state.labelthree,
            attrIconOne: state.attrIconOne,
            attrIconTwo: state.attrIconTwo,
            attrIconThree: state.attrIconThree,
            backDateDisplay: state.backDateDisplay,
            backDescription: state.backDescription,
            backHighlightsTitle: state.backHighlightsTitle,
            backHighlightsPreview: state.backHighlightsPreview,
            backLegacyTagline: state.backLegacyTagline,
            backLegacyText: state.backLegacyText,
            isblack: state.isblack,
          }
        : snapshot
        ? {
            uploads: snapshot.uploads ?? [],
            workingcard: "front",
            baseFront: snapshot.baseFront,
            baseBack: null,
            cardfinder: snapshot.cardfinder ?? 0,
            cardti: snapshot.cardti,
            carddes: snapshot.carddes,
            displayAttributeOne: snapshot.name,
            displayAttributeTwo: snapshot.name2,
            displayAttributeThree: snapshot.name3,
            acarddate: snapshot.acarddate,
            labelone: snapshot.labelone,
            labeltwo: snapshot.labeltwo,
            labelthree: snapshot.labelthree,
            attrIconOne: snapshot.attrIconOne,
            attrIconTwo: snapshot.attrIconTwo,
            attrIconThree: snapshot.attrIconThree,
            backDateDisplay: "",
            backDescription: "",
            backHighlightsTitle: "",
            backHighlightsPreview: [],
            backLegacyTagline: "",
            backLegacyText: "",
            isblack: snapshot.isblack ?? false,
          }
        : null;

    return (
        <div
            onClick={onClick}
            className={`flex-shrink-0 relative flex flex-col items-center rounded-xl border-2 p-1.5 transition-all duration-200 ${
                isEditing
                    ? "border-sky-400 bg-sky-50 ring-2 ring-sky-200"
                    : "border-gray-200 bg-white hover:border-sky-300 cursor-pointer"
            }`}
            style={{ width: 68, height: 90 }}
        >
            {/* Mini preview */}
            <div
                style={{ width: 54, height: 68, overflow: "hidden", position: "relative", borderRadius: 6 }}
                className="bg-white border border-gray-100"
            >
                {previewProps ? (
                    <div
                        style={{
                            width: 390,
                            height: 570,
                            transform: "scale(0.154)",
                            transformOrigin: "top left",
                            pointerEvents: "none",
                        }}
                    >
                        <TradingCardPreview
                            previewCardNodeRef={null}
                            activeText={null}
                            setActiveText={() => {}}
                            activeImage={null}
                            setActiveImage={() => {}}
                            updateUploadPosition={() => {}}
                            updateUploadSize={() => {}}
                            setworkingcard={() => {}}
                            isMini={true}
                            {...previewProps}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 text-xs">
                        Empty
                    </div>
                )}
            </div>

            {/* Label + status */}
            <div className="mt-1 text-center leading-none">
                <p className="text-[10px] font-semibold text-gray-700">Front {label}</p>
                <span className={`text-[9px] font-medium ${isEditing ? "text-sky-500" : "text-emerald-500"}`}>
                    {isEditing ? "✏️ Editing" : "✓ Saved"}
                </span>
            </div>

            {/* Delete button */}
            {onDelete && (
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-white/90 border border-gray-100 text-red-400 hover:text-red-600 shadow-sm z-10"
                    aria-label="Remove design"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            )}
        </div>
    );
}