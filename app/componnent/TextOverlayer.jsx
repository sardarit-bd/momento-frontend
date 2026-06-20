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
                width: "60%",
                flexShrink: 0,
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

        {/* Right Column */}
        <div
            style={{
                width: "90px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: trackColor,
                overflow: "hidden",
                flexShrink: 0,
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

export const FrontOne = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree, iconOne, iconTwo, iconThree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>
            <span id="card-description" className="text-white text-[10px] lg:text-xs AileronFont tracking-wider font-thin absolute top-71 left-[24px] lg:top-111 lg:left-8 text-center w-[205px] lg:w-[320px] z-50">{carddes}</span>

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

            <div className="absolute right-[10%] bottom-[16%] z-50 w-[115px] lg:w-[180px] text-right" style={{ backgroundColor: 'transparent', background: 'transparent' }}>
                <span
                    id="card-title"
                    className="
                        block
                        w-full
                        text-right
                        text-[30px]
                        lg:text-4xl
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

export const FrontTwo = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree, iconOne, iconTwo, iconThree }) => {
    const dateParts = acarddate.match(/^(.*?)\s+(OF\s+.*)$/i);
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>
            <span id="card-description" className="text-gray-50 text-[10px] lg:text-xs AileronFont tracking-wider font-thin absolute top-70 left-[24px] lg:top-108.5 lg:left-8 text-center w-[205px] lg:w-[320px] z-50">{carddes}</span>

            <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[13%] z-50 w-[170px] lg:w-[290px]"
                style={{ backgroundColor: "transparent" }}
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
                text-sm
                lg:text-4xl
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
                    lg:font-extrabold
                    text-[11px]
                    lg:text-[0.9rem]
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

export const FrontThree = ({ cardti, carddes, name, name2, name3, acarddate, labelone, labeltwo, labelthree, iconOne, iconTwo, iconThree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>
            <span className="text-white text-[10px] lg:text-[11.5px] AileronFont tracking-wider font-thin absolute left-5 lg:left-7 top-63 lg:top-97 w-[160px] lg:w-[265px] z-50">{carddes}</span>

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

            <div className="absolute left-[25px] bottom-[33px] z-50 w-[102px] lg:w-[118px]" style={{ backgroundColor: 'transparent' }}>
                <AttributeMetric
                    icon={iconOne}
                    text={name}
                    value={labelone}
                    textClass="text-white text-[10px] lg:text-[14px] AileronFont tracking-wider font-medium italic text-left"
                    trackClass="bg-white"
                    fillClass="bg-[#f56f41]"
                    trackColor="#ffffff"
                    fillColor="#f56f41"
                />
                <AttributeMetric
                    icon={iconTwo}
                    text={name2}
                    value={labeltwo}
                    wrapperClass="mt-1.5 lg:mt-2"
                    textClass="text-white text-[10px] lg:text-[14px] AileronFont tracking-wider font-medium italic text-left"
                    trackClass="bg-white"
                    fillClass="bg-[#f56f41]"
                    trackColor="#ffffff"
                    fillColor="#f56f41"
                />
                <AttributeMetric
                    icon={iconThree}
                    text={name3}
                    value={labelthree}
                    wrapperClass="mt-1.5 lg:mt-2"
                    textClass="text-white text-[10px] lg:text-[14px] AileronFont tracking-wider font-medium italic text-left"
                    trackClass="bg-white"
                    fillClass="bg-[#f56f41]"
                    trackColor="#ffffff"
                    fillColor="#f56f41"
                />
            </div>

            <div className="absolute right-[25px] bottom-[33px] z-50 w-[130px] lg:w-[200px] text-right" style={{ backgroundColor: 'transparent' }}>
                <span className="block uppercase text-white font-extrabold text-xs lg:text-xl BrunsonFont leading-tight">{cardti}</span>
                <span className="block font-semibold BrunsonFont tracking-widest lg:font-medium text-[11px] lg:text-[2.2rem] tracking-tighter leading-tight mt-0 TradingCardDateGrayGradient">{acarddate}</span>
            </div>
            <span className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 text-[8px] lg:text-[12px] text-[#1f1f1f] font-semibold tracking-wide text-center whitespace-nowrap">
                &copy; {currentYear} MOMENTO TRADING CARDS
            </span>
        </div>
    )
};

export const FrontFour = ({ cardti, carddes, name, name2, name3, acarddate, iconOne, iconTwo, iconThree }) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-full relative" style={{ backgroundColor: 'transparent' }}>
            <span className="text-white text-xs font-bold absolute top-108 text-center w-[265px] left-8 z-50">{carddes}</span>

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

            <span className="TradingCardDateGrayGradient text-md lg:text-xl font-semibold lg:font-extrabold absolute top-7.5 lg:top-10 left-10 lg:left-8 text-center w-[170px] lg:w-[176px] z-50 tracking-tighter">
                {(dateLabel || "Memory Card").toUpperCase()}
            </span>

            <span
                className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin leading-[1.05] lg:leading-[1.1] absolute top-17 lg:top-22 left-11 lg:left-15 text-center break-words w-[160px] lg:w-[270px] z-50`}
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

            <span className={`${isblack ? "text-black" : "text-white"} text-sm lg:text-md font-semibold lg:font-extrabold absolute top-30 lg:top-44 left-12 lg:left-37 text-left w-[176px] lg:w-[185px] z-50 tracking-tighter`}>
                {(highlightsTitle || "Highlights").toUpperCase()}
            </span>

            {safeHighlights.length > 0 ? (
                <div className={`${isblack ? "text-black" : "text-white"} AileronFont tracking-wider font-thin absolute top-36.5 left-10 lg:top-57 lg:left-15 w-[170px] lg:w-[270px] z-50`}>
                    {safeHighlights.map((item, idx) => {
                        const icon = typeof item === "object" ? item?.icon : null;
                        const text = typeof item === "object" ? item?.text : item;
                        return (
                            <span key={`${text || "highlight"}-${idx}`} className="mb-0.5 flex items-center gap-1 lg:mb-1">
                                {icon ? <img src={icon} alt="highlight-icon" className="h-[16px] w-[16px] shrink-0 object-contain lg:h-[24px] lg:w-[24px]" /> : null}

                                <span
                                    className="text-left text-[14px] lg:text-[13px] leading-tight"
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
                <span className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-36.5 left-10 lg:top-57 lg:left-15 line-clamp-4 text-center w-[170px] lg:w-[270px] z-50`}>
                    Add highlights to show key moments.
                </span>
            )}

            <span className={`${isblack ? "text-black" : "text-white"} text-sm lg:text-md font-semibold lg:font-extrabold absolute top-55.5 -left-4 lg:top-98.5 lg:left-15 text-right w-[176px] z-50 tracking-tighter`}>
                {(legacyTagline || "Legacy Tagline").toUpperCase()}
            </span>

            <span
                className={`${isblack ? "text-black" : "text-white"} text-[8px] lg:text-xs AileronFont tracking-wider font-thin absolute top-63 left-10 lg:top-107 lg:left-15 text-center w-[170px] lg:w-[270px] z-50`}
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
    )
};