const BASE_BOX = { top: 4.06, left: 5.86, width: 88.12, height: 91.77 };

const SLOT_POLYGON = [
  { x: 0.4306, y: 0.0406 }, { x: 0.3966, y: 0.0459 }, { x: 0.3642, y: 0.0598 },
  { x: 0.0741, y: 0.2660 }, { x: 0.0586, y: 0.3002 }, { x: 0.0586, y: 0.9252 },
  { x: 0.0833, y: 0.9530 }, { x: 0.1065, y: 0.9583 }, { x: 0.5679, y: 0.9583 },
  { x: 0.6019, y: 0.9530 }, { x: 0.6343, y: 0.9391 }, { x: 0.9244, y: 0.7329 },
  { x: 0.9398, y: 0.6987 }, { x: 0.9398, y: 0.0737 }, { x: 0.9151, y: 0.0459 },
  { x: 0.8920, y: 0.0406 },
];

export const OUTSET_X = 0.06; 
export const OUTSET_Y = 0.05; 

function buildSlotGeometry(baseBox, polygon, outsetX, outsetY) {
  const mx = baseBox.width * outsetX;
  const my = baseBox.height * outsetY;

  const box = {
    left: baseBox.left - mx,
    top: baseBox.top - my,
    width: baseBox.width + 2 * mx,
    height: baseBox.height + 2 * my,
  };

  const clipPath = `polygon(${polygon
    .map(({ x, y }) => {
      const px = box.left + x * box.width;
      const py = box.top + y * box.height;
      return `${px.toFixed(2)}% ${py.toFixed(2)}%`;
    })
    .join(", ")})`;

  return { box, clipPath };
}

const { box: CARD_SLOT_BOX, clipPath: CARD_SLOT_CLIP_PATH } =
  buildSlotGeometry(BASE_BOX, SLOT_POLYGON, OUTSET_X, OUTSET_Y);

export { CARD_SLOT_BOX, CARD_SLOT_CLIP_PATH };
export const CARD_SLOT_CLIP_POLYGON = SLOT_POLYGON;