"use client";

import React, { useState, useEffect } from "react";
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
    const [mobileDrawer, setMobileDrawer] = useState(null);

    React.useEffect(() => {
        const h = document.querySelector("nav")?.offsetHeight;
    }, []);

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
            <div
                className="lg:hidden flex flex-col bg-gray-100"
                style={{
                    position: "fixed",
                    top: "60px",
                    height: "calc(100dvh - 60px)",
                    overflow: "hidden",
                    left: 0,
                    right: 0,
                }}
            >
                {/* 1. Canvas area */}
                <div
                    style={{
                        flex: 1,
                        minHeight: 0,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <MobileCardScaler>
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
                    </MobileCardScaler>

                    {/* Right-side vertical tab strip */}
                    <MobileTabStrip
                        activeTab={mobileDrawer}
                        onTabClick={(tab) => {
                            setMobileDrawer(tab);
                            if (tab === "front")      { state.setSidebarTab("front");      state.setworkingcard("front"); }
                            if (tab === "attributes")   state.setSidebarTab("attributes");
                            if (tab === "back")        { state.setSidebarTab("back");       state.setworkingcard("back"); }
                        }}
                    />
                </div>

                {/* 2. Bottom saved-cards bar */}

                <div
                    style={{
                        flexShrink: 0,
                        height: 165,
                        minHeight: 165,
                        maxHeight: 165,
                        background: "#fff",
                        borderTop: "1px solid #e5e7eb",
                        boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    {/* Saved slots scrollable bar */}
                    <div style={{ height: 110, overflow: "hidden" }}>
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

                    {/* Next / Checkout button — always fully visible */}
                    <div style={{ padding: "6px 16px 8px", flexShrink: 0 }}>
                        <button
                            onClick={() => { state.handleNext(); setMobileDrawer(null); }}
                            disabled={
                                state.spinloading ||
                                state.doneloading ||
                                (!state.baseFront && !(state.savedSlots.length >= state.packageConfig.designs && state.editingSlotId === null))
                            }
                            className="w-full bg-[#00bcff] text-white text-sm font-semibold py-2 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
                        >
                            {state.doneloading || state.spinloading
                                ? "Please wait..."
                                : state.editingSlotId
                                    ? "Update Design"
                                    : state.savedSlots.length >= state.packageConfig.designs
                                        ? state.workingcard === "front"
                                            ? "Customize Back Card"
                                            : "Go to Checkout"
                                        : state.savedSlots.length >= state.packageConfig.designs - 1
                                            ? state.workingcard === "front"
                                                ? `Save & Customize Back (${state.savedSlots.length + 1}/${state.packageConfig.designs})`
                                                : `Save & Checkout (${state.savedSlots.length + 1}/${state.packageConfig.designs})`
                                            : `Next (${state.savedSlots.length + 1}/${state.packageConfig.designs})`
                            }
                        </button>
                    </div>
                </div>


                {/* 3. Full-screen drawer — covers the entire layout area */}
                {mobileDrawer && (
                    <div
                        style={{
                            position: "fixed",
                            top: "75px",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 50,
                            background: "#fff",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "12px 16px",
                                borderBottom: "1px solid #e5e7eb",
                                background: "#fff",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                flexShrink: 0,
                            }}
                        >
                            <button
                                onClick={() => setMobileDrawer(null)}
                                style={{
                                    width: 36, height: 36,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    borderRadius: "50%", background: "#f3f4f6",
                                    border: "none", cursor: "pointer", color: "#4b5563",
                                    flexShrink: 0,
                                }}
                                aria-label="Close drawer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                            <span style={{ fontWeight: 600, fontSize: 15, color: "#1f2937", textTransform: "capitalize" }}>
                                {mobileDrawer === "front" ? "Front" : mobileDrawer === "attributes" ? "Attributes" : "Back"}
                            </span>
                        </div>

                        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
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
        /*
         * position:absolute right:0, centered vertically in the canvas div.
         * marginRight:-1 hides the pill's right border flush with the screen
         * edge while keeping the rounded-left corners fully visible.
         * The parent canvas div must have overflow:visible (not hidden) for
         * this to render without clipping — which it now does.
         */
        <div
            style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 40,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid #e5e7eb",
                    borderRight: "none",          // hide flush-right border
                    borderRadius: "16px 0 0 16px",
                    boxShadow: "-2px 0 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    padding: "4px 0",
                }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabClick(tab.id)}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 4,
                                padding: "clamp(5px, 2vw, 8px) clamp(6px, 2.5vw, 10px)",
                                minWidth: "clamp(40px, 12vw, 48px)",
                                border: "none",
                                cursor: "pointer",
                                transition: "background 0.15s, color 0.15s",
                                background: isActive ? "#0ea5e9" : "transparent",
                                color: isActive ? "#fff" : "#6b7280",
                            }}
                            aria-label={`Open ${tab.label} panel`}
                        >
                            {tab.icon}
                            <span style={{ fontSize: "clamp(7px, 2.2vw, 10px)", fontWeight: 600, lineHeight: 1 }}>{tab.label}</span>
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
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Bar header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px 4px", flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#4b5563" }}>
                    Designs{" "}
                    <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                        {savedSlots.length}/{packageConfig.designs}
                    </span>
                </span>
            </div>

            {/* Horizontally scrollable slots */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    overflowX: "auto",
                    padding: "0 12px 8px",
                    WebkitOverflowScrolling: "touch",
                }}
            >
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

                {Array.from({
                    length: Math.max(0, packageConfig.designs - savedSlots.length - (editingSlotId === null ? 1 : 0)),
                }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        style={{
                            flexShrink: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 62,
                            height: 80,
                            borderRadius: 12,
                            border: "2px dashed #e5e7eb",
                            background: "#f9fafb",
                        }}
                    >
                        <span style={{ color: "#d1d5db", fontSize: 20 }}>+</span>
                        <span style={{ fontSize: 10, color: "#d1d5db", marginTop: 2 }}>Empty</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Individual slot card in the bottom bar ────────────────────── */
function MobileSavedSlotCard({ isEditing, label, state, snapshot, onDelete, onClick }) {
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
            style={{
                flexShrink: 0,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 68,
                height: 90,
                borderRadius: 12,
                border: isEditing ? "2px solid #38bdf8" : "2px solid #e5e7eb",
                background: isEditing ? "#f0f9ff" : "#fff",
                boxShadow: isEditing ? "0 0 0 2px #bae6fd" : "none",
                padding: 6,
                cursor: onClick ? "pointer" : "default",
                transition: "border 0.15s, box-shadow 0.15s",
            }}
        >
            {/* Mini preview */}
            <div
                style={{
                    width: 48,
                    height: 60,
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: 6,
                    background: "#fff",
                    border: "1px solid #f3f4f6",
                }}
            >
                {previewProps ? (
                    <div
                        style={{
                            position: "absolute",
                            width: 390,
                            height: 570,
                            transform: "scale(0.154)",
                            transformOrigin: "top left",
                            pointerEvents: "none",
                            overflow: "hidden",
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
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#e5e7eb", fontSize: 12 }}>
                        Empty
                    </div>
                )}
            </div>

            {/* Label + status */}
            <div style={{ marginTop: 4, textAlign: "center", lineHeight: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: "#374151", margin: 0 }}>Front {label}</p>
                <span style={{ fontSize: 9, fontWeight: 500, color: isEditing ? "#0ea5e9" : "#10b981" }}>
                    {isEditing ? "✏️ Editing" : "✓ Saved"}
                </span>
            </div>

            {/* Delete button */}
            {onDelete && (
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "1px solid #f3f4f6",
                        color: "#f87171",
                        cursor: "pointer",
                        zIndex: 10,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
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

function MobileCardScaler({ children }) {
    const containerRef = React.useRef(null);
    const [scale, setScale] = React.useState(1);

    React.useLayoutEffect(() => {
        const update = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            const CARD_W = 390;
            const CARD_H = 570;
            const scaleX = (width - 56) / CARD_W;
            const scaleY = height / CARD_H;
            setScale(Math.min(scaleX, scaleY, 1));
        };
        update();
        const ro = new ResizeObserver(update);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* 
                This div is 1024px wide — wide enough to trigger Tailwind's `lg:` 
                breakpoint inside the card components, so lg:text-4xl, lg:left-8 
                etc. all apply correctly. Then we scale it down to fit the screen.
            */}
            <div
                style={{
                    width: 1024,        // ← forces lg: breakpoint
                    height: 570,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    flexShrink: 0,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
}