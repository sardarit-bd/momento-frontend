// Joker card slot geometry — traced directly from the raw base card
// asset (joker1-base.png, 825×1125px native), NOT from a browser
// screenshot. Screenshots introduced letterbox/crop error because the
// display container's aspect ratio didn't match the image's native
// ratio; both are now reconciled (see JOKER_NATIVE_WIDTH/HEIGHT below,
// used to size the on-screen container so object-contain never
// letterboxes). If the Joker base art changes, re-measure from the
// new raw file, not a screenshot.

// Native pixel dimensions of the Joker base card art (825×1125 = 11:15).
// Used to set the on-screen preview/thumbnail container's aspect-ratio
// so the image fills it exactly with no letterboxing.
export const JOKER_NATIVE_WIDTH = 11;
export const JOKER_NATIVE_HEIGHT = 15;

export const JOKER_SLOT_BOX = {
  top: 6.76,
  left: 10.67,
  width: 78.55,
  height: 86.40,
};

// Polygon outline of the actual card panel, expressed as % coordinates
// *within* JOKER_SLOT_BOX (0% 0% = the box's top-left corner, 100% 100%
// = its bottom-right corner) — same convention as the SLOT_CLIP_PATH
// used for King/Queen/Jack/Ace cards in PhotoCardPreview.jsx.
export const JOKER_SLOT_CLIP_PATH =
  "polygon(22.07% 0.41%, 16.82% 2.78%, 13.73% 7.2%, 13.27% 47.02%, 10.8% 50.1%, 2.78% 54.42%, 0% 58.44%, 0.15% 97.12%, 2.16% 99.07%, 5.09% 100%, 77.93% 99.59%, 83.18% 97.22%, 86.27% 92.8%, 86.73% 52.98%, 89.2% 49.9%, 97.22% 45.58%, 100% 41.56%, 99.85% 2.88%, 97.84% 0.93%, 94.91% 0%)";

// Same polygon as fractional (0–1) points, used for canvas clipping
// when baking the final export image (see compositeCardToBase64).
export const JOKER_SLOT_CLIP_POLYGON = [
  { x: 0.2207, y: 0.0041 },
  { x: 0.1682, y: 0.0278 },
  { x: 0.1373, y: 0.0720 },
  { x: 0.1327, y: 0.4702 },
  { x: 0.1080, y: 0.5010 },
  { x: 0.0278, y: 0.5442 },
  { x: 0.0000, y: 0.5844 },
  { x: 0.0015, y: 0.9712 },
  { x: 0.0216, y: 0.9907 },
  { x: 0.0509, y: 1.0000 },
  { x: 0.7793, y: 0.9959 },
  { x: 0.8318, y: 0.9722 },
  { x: 0.8627, y: 0.9280 },
  { x: 0.8673, y: 0.5298 },
  { x: 0.8920, y: 0.4990 },
  { x: 0.9722, y: 0.4558 },
  { x: 1.0000, y: 0.4156 },
  { x: 0.9985, y: 0.0288 },
  { x: 0.9784, y: 0.0093 },
  { x: 0.9491, y: 0.0000 },
];

// Canvas size used by compositeCardToBase64 when baking the final image.
export const EXPORT_WIDTH = 750;
export const EXPORT_HEIGHT = 1050;

// Resolved pixel rect for the export canvas (bounding box of the polygon above).
export const JOKER_SLOT_RECT = {
  x: (EXPORT_WIDTH * JOKER_SLOT_BOX.left) / 100,
  y: (EXPORT_HEIGHT * JOKER_SLOT_BOX.top) / 100,
  w: (EXPORT_WIDTH * JOKER_SLOT_BOX.width) / 100,
  h: (EXPORT_HEIGHT * JOKER_SLOT_BOX.height) / 100,
};