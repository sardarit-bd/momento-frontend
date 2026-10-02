export const HEADER_LAYOUT_DEFAULT = {
  iconSize: 34,
  iconTop: 22,
  iconSideOffset: 26,
  iconRadius: 6,
  iconBg: "rgba(0,0,0,0.25)",
  drawFrame: true,
  frameWidth: 2,
  frameColor: "#c9ccd1",
  numberTop: 30,
  numberFontSize: 18,
  numberCaptureOffsetY: -2,
};

export const HEADER_LAYOUT_OVERRIDES = {
  0: {
    iconRadius: "50%",
    drawFrame: false,
    iconBg: "transparent",
    frameWidth: 3,
    frameColor: "transparent",
    isMetallicBorder: true,
    numberBadgeTop: 10,
    iconSize: 49,
    leftIconTop: 64,
    leftIconSide: 33,
    rightIconTop: 46,
    rightIconSide: 28,
    numberPillLeft: 22,
    numberPillTop: 40,
    numberPillWidth: 70,
    numberPillHeight: 20,
    numberPillFontSize: 13,
    numberPillColor: "#0f2438",
    numberPillCaptureOffsetY: 0,
    numberPillCx: 57,
    numberPillCy: 51.7,
  },
  1: {
    drawFrame: false,
    iconSize: 30,
    iconTop: 30,
    iconSideOffset: 26,
    iconRadius: 4,
  },
  2: {},
};

export const getHeaderLayout = (template = 0) => ({
  ...HEADER_LAYOUT_DEFAULT,
  ...(HEADER_LAYOUT_OVERRIDES[template] || {}),
});

export const formatCardNumber = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits ? `#${digits}` : "";
};
