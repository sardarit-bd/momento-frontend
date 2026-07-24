import GradientText from "./GradientText";

const AttributeLabel = ({ icon, text, className = "" }) => (
    <div
        className={`flex gap-1 ${className}`}
        style={{ backgroundColor: 'transparent', alignItems: 'center', lineHeight: 1 }}
    >
        {icon ? (
            <img
                src={icon}
                alt="attribute-icon"
                style={{
                    height: '10px',
                    width: '10px',
                    flexShrink: 0,
                    objectFit: 'contain',
                    display: 'block',
                }}
            />
        ) : null}
        <span style={{ lineHeight: 1, display: 'block' }}>{text}</span>
    </div>
);


const getTitleFontSize = (text = "") => {
    const len = text.length;
    if (len <= 8)  return "1.75rem";
    if (len <= 12) return "1.4rem";
    if (len <= 16) return "1.1rem";
    if (len <= 20) return "0.9rem";
    return "0.75rem";
};


const AttributeMetric = ({
    icon,
    text,
    value,
    wrapperClass = "",
    textClass = "",
    trackClass = "",
    fillClass = "",
    trackColor = "",
    fillColor = "",
    id,
}) => (
    <div
        id={id}
        className={wrapperClass}
        style={{
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
        }}
    >
        {/* Icon — fixed 34x34, no grid */}
        <div
            style={{
                backgroundColor: 'transparent',
                width: '34px',
                height: '34px',
                flexShrink: 0,
                flexGrow: 0,
                paddingTop: '2px',
                overflow: 'visible',
            }}
        >
            {icon ? (
                <img
                    src={icon}
                    alt="attribute-icon"
                    style={{
                        width: '34px',
                        height: '34px',
                        objectFit: 'contain',
                        display: 'block',
                    }}
                />
            ) : null}
        </div>

        {/* Text + track — fixed width, no 1fr */}
        <div
            style={{
                backgroundColor: 'transparent',
                width: '110px',
                flexShrink: 0,
                flexGrow: 0,
                minHeight: '22px',
                overflow: 'visible',
            }}
        >
            <span
                className={textClass}
                style={{
                    fontFamily: 'Libertad', fontWeight: 600, fontSize: '13px',
                    display: 'block',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    whiteSpace: 'nowrap',
                    paddingBottom: '0px',
                    textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px  1px 0 #000,
                        1px  1px 0 #000
                    `,
                    color: '#f5f0f0',
                }}
            >
                {text}
            </span>
            {/* Progress bar — fixed px width, matches parent */}
            <div
                className={trackClass}
                style={{
                    marginTop: '2px',
                    height: '7px',
                    borderRadius: '9999px',
                    width: '110px',
                    overflow: 'visible',
                    ...(trackColor ? { backgroundColor: trackColor } : {}),
                }}
            >
                <div
                    className={fillClass}
                    style={{
                        width: `${value}%`,
                        height: '100%',
                        borderRadius: '9999px',
                        ...(fillColor ? { backgroundColor: fillColor } : {}),
                    }}
                />
            </div>
        </div>
    </div>
);


const AttributeMetricHorizontal = ({
    icon,
    text,
    value,
    wrapperClass = "",
    textClass = "",
    trackColor = "#000000",
    fillColor = "#5ba2d8",
    id,
}) => (
    <div
        id={id}
        className={wrapperClass}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            backgroundColor: "transparent",
            width: "100%",
        }}
    >
        {/* Left Column */}
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flex: "0 0 55%",
            }}
        >
            <img
                src={icon}
                alt="attribute-icon"
                style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                    flexShrink: 0,
                }}
            />
            <span
                className={textClass}
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px  1px 0 #000,
                        1px  1px 0 #000
                    `,
                }}
            >
                {text}
            </span>
        </div>

        {/* Right Column — progress bar */}
        <div
            style={{
                flex: "1 1 0",          // ← was width: "90px", flexShrink: 0
                minWidth: 0,
                height: "8px",
                borderRadius: "999px",
                backgroundColor: trackColor,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    width: `${value}%`,
                    height: "100%",
                    backgroundColor: fillColor,
                    borderRadius: "999px",
                }}
            />
        </div>
    </div>
);

const fauxBoldShadow = `
    0 0 0 black,
    0.5px 0 0 black,
    -0.5px 0 0 black,
    0 0.5px 0 black,
    0 -0.5px 0 black,
    0.5px 0.5px 0 black,
    -0.5px -0.5px 0 black,
    0.5px -0.5px 0 black,
    -0.5px 0.5px 0 black
`;

const metallicGradientClass = `
    text-transparent
    bg-clip-text
    bg-[linear-gradient(180deg,_#3a3a3a_0%,_#787878_20%,_#ffffff_60%,_#787878_90%,_#3a3a3a_100%)]
    bg-[length:100%_100%]
`;

const AttributeMetricHorizontal2 = ({
    icon,
    text,
    value,
    wrapperClass = "",
    textClass = "",
    trackColor = "#000000",
    fillColor = "#5ba2d8",
    metallic = false,
    id,
}) => (
    <div
        id={id}
        className={wrapperClass}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
            backgroundColor: "transparent",
            width: "100%",
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: "0 0 62%" }}>
            <img
                src={icon}
                alt="attribute-icon"
                style={{ width: "20px", height: "20px", objectFit: "contain", flexShrink: 0 }}
            />
            <span
                className={`${textClass} ${metallic ? metallicGradientClass : ""}`}
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                    lineHeight: 1,
                    ...(metallic
                        ? { WebkitTextStroke: "0.5px black", paintOrder: "stroke fill" }
                        : {
                            textShadow: `
                                -1px -1px 0 #000,
                                1px -1px 0 #000,
                                -1px  1px 0 #000,
                                1px  1px 0 #000
                            `,
                        }),
                }}
            >
                {text}
            </span>
        </div>

        <div
            style={{
                flex: "1 1 0",
                minWidth: 0,
                height: "10px",
                borderRadius: "999px",
                backgroundColor: trackColor,
                overflow: "hidden",
            }}
        >
            <div style={{ width: `${value}%`, height: "100%", backgroundColor: fillColor, borderRadius: "999px" }} />
        </div>
    </div>
);


export const FrontOne = ({ cardti, name, name2, name3, acarddate, labelone, labeltwo, labelthree, iconOne, iconTwo, iconThree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>

            <div className="absolute left-[25px] right-[25px] bottom-[33px] h-1/3 z-40 pointer-events-none rounded-bl-2xl rounded-br-2xl overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-full"
                />
            </div>

            <div className="absolute left-[40px] bottom-[60px] z-50 w-[112px] lg:w-[132px]" style={{ backgroundColor: 'transparent', background: 'transparent' }}>
                <AttributeMetric
                    id="metric-row-1"
                    icon={iconOne}
                    text={name}
                    value={labelone}
                    textClass="text-[10px] lg:text-[13px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium text-left"
                    trackClass="bg-black"
                    fillClass="bg-[#f56f41]"
                    trackColor="#000000"
                    fillColor="#f56f41"
                />
                <AttributeMetric
                    id="metric-row-2"
                    icon={iconTwo}
                    text={name2}
                    value={labeltwo}
                    wrapperClass="mt-1.5 lg:mt-2"
                    textClass="text-[10px] lg:text-[13px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium text-left"
                    trackClass="bg-black"
                    fillClass="bg-[#f56f41]"
                    trackColor="#000000"
                    fillColor="#f56f41"
                />
                <AttributeMetric
                    id="metric-row-3"
                    icon={iconThree}
                    text={name3}
                    value={labelthree}
                    wrapperClass="mt-1.5 lg:mt-2"
                    textClass="text-[10px] lg:text-[13px] text-[#f7f7f7] GustanBlackFont tracking-wider font-medium text-left"
                    trackClass="bg-black"
                    fillClass="bg-[#f56f41]"
                    trackColor="#000000"
                    fillColor="#f56f41"
                />
            </div>

            <div className="absolute right-[10%] bottom-[16%] z-50 w-[180px] text-right" style={{ backgroundColor: 'transparent', background: 'transparent' }}>
                <span
                    id="card-title"
                    className="
                        block
                        w-full
                        text-right
                        text-4xl
                        font-bold
                        leading-[0.9]
                        text-transparent
                        bg-clip-text
                        bg-[linear-gradient(180deg,_#3a3a3a_0%,_#787878_30%,_#ffffff_50%,_#787878_70%,_#3a3a3a_100%)]
                        bg-[length:100%_100%]
                    "
                    style={{
                        WebkitTextStroke: '1px black',
                        paintOrder: 'stroke fill',
                    }}
                >
                    {cardti}
                </span>
                <span id="card-date" className="block CorsicaCanvas text-[11px] lg:text-[1rem] tracking-tighter leading-tight mt-0" style={{
                    WebkitTextStroke: '3px black', paintOrder: 'stroke fill', color: '#b8acac'
                }}>{acarddate}</span>
            </div>

            <span className="absolute bottom-[33px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[8px] text-[#1f1f1f] CorsicaCanvas tracking-wider text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontTwo = ({ cardti, name, name2, name3, acarddate, labelone, labeltwo, labelthree, iconOne, iconTwo, iconThree }) => {
    const dateParts = acarddate.match(/^(.*?)\s+(OF\s+.*)$/i);
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>

            <div
                className="absolute bottom-[13%] z-50"
                style={{
                    backgroundColor: "transparent",
                    left: "13%",
                    right: "13%",
                    width: "auto",
                }}
            >
                <AttributeMetricHorizontal
                    id="metric-row-1"
                    icon={iconOne}
                    text={name}
                    value={labelone}
                    textClass="text-[11px] lg:text-[14px] text-[#f7f7f7] GustanBlackFont tracking-wider"
                />

                <AttributeMetricHorizontal
                    id="metric-row-2"
                    icon={iconTwo}
                    text={name2}
                    value={labeltwo}
                    wrapperClass="mt-0"
                    textClass="text-[11px] lg:text-[14px] text-[#f7f7f7] GustanBlackFont tracking-wider"
                />

                <AttributeMetricHorizontal
                    id="metric-row-3"
                    icon={iconThree}
                    text={name3}
                    value={labelthree}
                    wrapperClass="mt-0"
                    textClass="text-[11px] lg:text-[14px] text-[#f7f7f7] GustanBlackFont tracking-wider"
                />
            </div>

            <div className="absolute inset-0 pointer-events-none z-50">

            {/* Card Title */}
            <span
            id="card-title"
            className="
                absolute
                left-0
                w-full
                bottom-[28%]
                text-center
                text-4xl
                font-bold
                leading-tight
                whitespace-nowrap
                text-transparent
                bg-clip-text
                bg-[linear-gradient(180deg,_#3a3a3a_0%,_#787878_30%,_#ffffff_50%,_#787878_70%,_#3a3a3a_100%)]
                bg-[length:100%_100%]
            "
            style={{
                WebkitTextStroke: '1px black',
                paintOrder: 'stroke fill',
            }}
        >
            {cardti}
        </span>
            {/* Card Date */}
            <span
                id="card-date"
                className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    bottom-[4%]
                    text-center
                    font-extrabold
                    text-[0.9rem]
                    tracking-tighter
                    leading-tight
                    FrontTwoCopy
                "
            >
                {dateParts ? (
                    <>
                        {dateParts[1]}
                        <br />
                        {dateParts[2]}
                    </>
                ) : (
                    acarddate
                )}
            </span>

        </div>
            <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[8px] text-[#1f1f1f] BrunsonCanvas tracking-wider text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontThree = ({ cardti, name, name2, name3, acarddate, labelone, labeltwo, labelthree, iconOne, iconTwo, iconThree, attributeName }) => {
    
    const currentYear = new Date().getFullYear();
    const dateLine1 = acarddate.length > 6 ? acarddate.slice(0, 6) : acarddate;
    const dateLine2 = acarddate.length > 6 ? acarddate.slice(6) : null;

    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>

            {/* Name — centered banner at the top */}
            <span
                id="card-title"
                className="absolute top-[7%] left-[38%] -translate-x-1/2 z-50 text-[#00BCFF] uppercase tracking-wide text-center"
                style={{
                    fontFamily: 'DinBold',
                    fontSize: getTitleFontSize(cardti),
                    textShadow: '-2px -1px 0 #000, 1px -1px 0 #000, -2px 1px 0 #000, 2px 1px 0 #000',
                    width: '85%',     
                    maxWidth: '340px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {cardti}
            </span>

            {/* Attributes label — plain, no gradient */}
            <div className="absolute left-[52%] -translate-x-1/2 bottom-[28.5%] z-50">
                <span
                    className="block text-black text-[14px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap"
                    style={{ fontFamily: 'DinBold'}}
                >
                    {attributeName || "Attributes"}
                </span>
            </div>

            {/* Attribute rows — full width, icon + label + bar on one line */}
            <div className="absolute left-[10%] right-[10%] bottom-[15%]  z-50 flex flex-col gap-1">
                <AttributeMetricHorizontal2
                    icon={iconOne}
                    text={name}
                    value={labelone}
                    metallic
                    textClass="text-[16px] tracking-wider GustanBlackFont"
                    trackColor="#000000"
                    fillColor="#f56f41"
                />
                <AttributeMetricHorizontal2
                    icon={iconOne}
                    text={name2}
                    value={labeltwo}
                    metallic
                    textClass="text-[16px] tracking-wider GustanBlackFont"
                    trackColor="#000000"
                    fillColor="#f56f41"
                />
                <AttributeMetricHorizontal2
                    icon={iconOne}
                    text={name3}
                    value={labelthree}
                    metallic
                    textClass="text-[16px] tracking-wider GustanBlackFont"
                    trackColor="#000000"
                    fillColor="#f56f41"
                />
            </div>

            {/* Date — bottom right */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[90%] z-50 text-center">
                <div className="TradingCardBadgeOrange">
                    <span
                        className="block TradingCardBadgeOrangeText font-bold uppercase text-[1rem] tracking-wider leading-tight"
                        style={{ fontFamily: 'DinBold' }}
                    >
                        {dateLine2 ? (
                            <>
                                {dateLine1}
                                <br />
                                {dateLine2}
                            </>
                        ) : (
                            dateLine1
                        )}
                    </span>
                </div>
            </div>

            <span
                className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-50 text-[0.5rem] text-[#1f1f1f] font-semibold tracking-wide text-center whitespace-nowrap"
                style={{ fontFamily: 'DinBold' }}
            >
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontFour = ({ cardti, name, name2, name3, acarddate, iconOne, iconTwo, iconThree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>

            <div className="absolute left-[25px] right-[25px] bottom-[33px] h-1/3 z-40 pointer-events-none rounded-bl-2xl rounded-br-2xl overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.62) 100%)" }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{ background: "linear-gradient(180deg, rgba(252,211,77,0) 0%, rgba(255, 117, 4, 0.34) 18%, rgba(234,88,12,0.58) 100%)" }}
                />
            </div>

            <div className="absolute left-[25px] bottom-[33px] z-50 w-[120px]" style={{ backgroundColor: 'transparent' }}>
                <AttributeLabel icon={iconOne} text={name.toUpperCase()} className="block text-white text-xs font-bold text-left" />
                <AttributeLabel icon={iconTwo} text={name2} className="block text-white text-xs font-bold text-left mt-1" />
                <AttributeLabel icon={iconThree} text={name3} className="block text-white text-xs font-bold text-left mt-1" />
            </div>

            <div className="absolute right-[25px] bottom-[33px] z-50 w-[130px] lg:w-[180px] text-right" style={{ backgroundColor: 'transparent' }}>
                <span className="block text-white text-sm lg:text-2xl font-bold tracking-widest bebas leading-tight">{cardti}</span>
                <span className="block lg:font-extrabold text-[11px] lg:text-[1.35rem] tracking-tighter leading-tight mt-0 TradingCardDateGrayGradient">{acarddate}</span>
            </div>
            <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[12px] text-[#1f1f1f] font-semibold tracking-wide text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const BackOne = ({
    dateLabel,
    description,
    highlightsTitle,
    highlights = [],
    legacyTagline,
    legacyText,
    isblack,
}) => {
    const safeHighlights = Array.isArray(highlights) ? highlights.slice(0, 6) : [];

    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>

            <span className="TradingCardDateGrayGradient text-xl font-extrabold absolute top-10 left-8 text-center w-[176px] z-50 tracking-tighter">
                {(dateLabel || "Memory Card").toUpperCase()}
            </span>

            <span
                className={`${isblack ? "text-black" : "text-white"} text-xs AileronFont tracking-wider font-thin leading-[1.1] absolute top-22 left-15 text-center break-words w-[270px] z-50`}
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'visible',
                    maxHeight: '40px',
                }}
            >
                {description || "Add a brief description..."}
            </span>

            <span className={`${isblack ? "text-black" : "text-white"} text-md font-extrabold absolute top-44 left-37 text-left w-[185px] z-50 tracking-tighter`}>
                {(highlightsTitle || "Highlights").toUpperCase()}
            </span>

            {safeHighlights.length > 0 ? (
                <div className={`${isblack ? "text-black" : "text-white"} AileronFont tracking-wider font-thin absolute top-57 left-15 w-[270px] z-50`}>
                    {safeHighlights.map((item, idx) => {
                        const icon = typeof item === "object" ? item?.icon : null;
                        const text = typeof item === "object" ? item?.text : item;
                        return (
                            <span key={`${text || "highlight"}-${idx}`} className="mb-1 flex items-center gap-1">
                                {icon ? <img src={icon} alt="highlight-icon" className="h-[24px] w-[24px] shrink-0 object-contain" /> : null}
                                <span
                                    className="text-left text-[13px] leading-tight"
                                    style={{
                                        overflow: 'visible',
                                        textOverflow: 'unset',
                                        whiteSpace: 'nowrap',
                                        paddingBottom: '2px',
                                    }}
                                >
                                    {text}
                                </span>
                            </span>
                        );
                    })}
                </div>
            ) : (
                <span className={`${isblack ? "text-black" : "text-white"} text-xs AileronFont tracking-wider font-thin absolute top-57 left-15 line-clamp-4 text-center w-[270px] z-50`}>
                    Add highlights to show key moments.
                </span>
            )}

            <span className={`${isblack ? "text-black" : "text-white"} text-md font-extrabold absolute top-98.5 left-15 text-right w-[176px] z-50 tracking-tighter`}>
                {(legacyTagline || "Legacy Tagline").toUpperCase()}
            </span>

            <span
                className={`${isblack ? "text-black" : "text-white"} text-xs AileronFont tracking-wider font-thin absolute top-107 left-15 text-center w-[270px] z-50`}
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'visible',
                }}
            >
                {legacyText || "Legacy text"}
            </span>
        </div>
    );
};