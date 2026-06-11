"use client";

import React from "react";
import { useTradingCardState } from "./_tradingcard/hooks/useTradingCardState";
import TradingCardPreview from "./_tradingcard/components/TradingCardPreview";
import TradingCardControls from "./_tradingcard/components/TradingCardControls";
import TradingCardApplicationSkelaton from "@/app/componnent/TradingCardApplicationSkelaton";
import TradingCardSidebar from "@/app/componnent/TradingCardSidebar";
import TradingBoxPreview from "@/app/componnent/TradingBoxPreview/TradingBoxPreview";
import { ToastContainer } from "react-toastify";

export default function ProductCustomizer() {
    const state = useTradingCardState();

    if (state.fetchingDataLoading) {
        return <TradingCardApplicationSkelaton />;
    }

    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 lg:gap-2 h-screen w-screen fixed bg-gray-100">
            {/* Left Sidebar */}
            <div className="col-span-12 row-span-2 lg:row-span-12 lg:col-span-2 w-full h-full bg-white shadow-sm">
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

            {/* Middle area (contains canvas and right-panel inside it) */}
            <div className="col-span-12 row-span-10 lg:row-span-12 lg:col-span-10 h-full lg:h-screen w-full">
                <div className="grid grid-cols-10 grid-rows-10 h-full w-full mt-2 lg:mt-0 relative">
                    {/* Canvas column (middle) */}
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

                    {/* Right Controls column */}
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

            {/* Hidden trading box composite — always mounted so ref is populated at capture time */}
            <div className="absolute opacity-0 pointer-events-none" style={{ zIndex: -1 }}>
                <TradingBoxPreview
                    ref={state.tradingBoxPreviewRef}
                    packTitle={state.cardti}
                    createdFor={state.carddes}
                />
            </div>

            <ToastContainer position="bottom-center" />
        </div>
    );
}
