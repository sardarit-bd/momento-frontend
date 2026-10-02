export const fonts = [
  "Arial",
  "Poppins",
  "Times New Roman",
  "Courier New",
  "Comic Sans MS",
];

export const cardTypeOptions = [
  { value: "graduation", label: "Graduation", icon: "🎓" },
  { value: "wedding", label: "Wedding", icon: "💍" },
  { value: "birthday", label: "Birthday", icon: "🎂" },
  { value: "achievement", label: "Achievement", icon: "🏆" },
  { value: "memory", label: "Memory", icon: "📷" },
  { value: "celebration", label: "Celebration", icon: "🎉" },
];

export const attributeIconOptions = [
  "/attribute-images/attribute_2.png",
  "/attribute-images/attribute_3.png",
  "/attribute-images/attribute_4.png",
  "/attribute-images/attribute_5.png",
  "/attribute-images/attribute_6.png",
  "/attribute-images/attribute_7.png",
  "/attribute-images/attribute_8.png",
  "/attribute-images/attribute_9.png",
  "/attribute-images/attribute_10.png",
  "/attribute-images/attribute_11.png",
  "/attribute-images/attribute_12.png",
  "/attribute-images/attribute_13.png",
  "/attribute-images/attribute_14.png",
  "/attribute-images/attribute_15.png",
  "/attribute-images/attribute_16.png",
  "/attribute-images/attribute_17.png",
  "/attribute-images/attribute_18.png",
];

export const defaultBackHighlights = [
  {
    id: 1,
    icon: "/attribute-images/attribute_2.png",
    text: "Always brings energy to the room",
  },
  {
    id: 2,
    icon: "/attribute-images/attribute_4.png",
    text: "Master of organization",
  },
];

export const PACKAGE_CONFIG = {
  single: { name: "Single", designs: 1, copiesPerDesign: 18, totalCards: 18 },
  trio: { name: "Trio", designs: 3, copiesPerDesign: 6, totalCards: 18 },
  collection: {
    name: "Collection",
    designs: 6,
    copiesPerDesign: 3,
    totalCards: 18,
  },
};

export const TEMPLATE_MAP = {
  1: { image: "/trading-cards/trading-front1-transparent.png", cardfinder: 0 },
  2: { image: "/trading-cards/trading-front2-transparent.png", cardfinder: 1 },
  3: { image: "/trading-cards/trading-front3-transparent.png", cardfinder: 2 },
};
const CORNER_ICON_NAMES = [
  "Achievement",
  "Airplane",
  "American Football",
  "Baby",
  "Baseball",
  "Basketball",
  "Birthday Cake",
  "Briefcase",
  "Camera",
  "Chef Hat",
  "Dumbbell",
  "Engagement Ring",
  "Film Clapper",
  "Game Controller",
  "Graduation Cap",
  "House",
  "Leaf or Plant",
  "Medal",
  "Music Note",
  "Paint Brush",
  "Party Popper",
  "Paw Print",
  "Soccer Ball",
  "Theater Masks",
  "Trophy",
  "Wedding Rings",
];

export const cardCornerIconOptions = CORNER_ICON_NAMES.map((label) => ({
  label,
  value: encodeURI(`/card-type-icons/${label}.png`),
}));
export const DEFAULT_CORNER_ICON = cardCornerIconOptions[0].value;
