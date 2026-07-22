export const JOKER_SLOT_BOX = {
  top: 18,
  left: 22, 
  width: 55, 
  height: 65, 
};

// Canvas size used by compositeCardToBase64 when baking the final image.
export const EXPORT_WIDTH = 750;
export const EXPORT_HEIGHT = 1050;

// Resolved pixel rect for the export canvas.
export const JOKER_SLOT_RECT = {
  x: (EXPORT_WIDTH * JOKER_SLOT_BOX.left) / 100,
  y: (EXPORT_HEIGHT * JOKER_SLOT_BOX.top) / 100,
  w: (EXPORT_WIDTH * JOKER_SLOT_BOX.width) / 100,
  h: (EXPORT_HEIGHT * JOKER_SLOT_BOX.height) / 100,
};
