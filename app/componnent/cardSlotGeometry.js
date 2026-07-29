const BASE_BOX = { top: 4.06, left: 5.86, width: 88.12, height: 91.77 };

const SLOT_POLYGON = [
  { x: 0.4306, y: 0.0406 }, { x: 0.3966, y: 0.0459 }, { x: 0.3642, y: 0.0598 },
  { x: 0.0741, y: 0.2660 }, { x: 0.0586, y: 0.3002 }, { x: 0.0586, y: 0.9252 },
  { x: 0.0833, y: 0.9530 }, { x: 0.1065, y: 0.9583 }, { x: 0.5679, y: 0.9583 },
  { x: 0.6019, y: 0.9530 }, { x: 0.6343, y: 0.9391 }, { x: 0.9244, y: 0.7329 },
  { x: 0.9398, y: 0.6987 }, { x: 0.9398, y: 0.0737 }, { x: 0.9151, y: 0.0459 },
  { x: 0.8920, y: 0.0406 },
];

export const OUTSET_TOP = 0.053;
export const OUTSET_BOTTOM = 0.053;
export const OUTSET_LEFT = 0.053;
export const OUTSET_RIGHT = 0.06;

function buildSlotGeometry(baseBox, polygon, { left, right, top, bottom }) {
  const mLeft = baseBox.width * left;
  const mRight = baseBox.width * right;
  const mTop = baseBox.height * top;
  const mBottom = baseBox.height * bottom;

  const box = {
    left: baseBox.left - mLeft,
    top: baseBox.top - mTop,
    width: baseBox.width + mLeft + mRight,
    height: baseBox.height + mTop + mBottom,
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

const { box: CARD_SLOT_BOX, clipPath: CARD_SLOT_CLIP_PATH } = buildSlotGeometry(
  BASE_BOX,
  SLOT_POLYGON,
  { left: OUTSET_LEFT, right: OUTSET_RIGHT, top: OUTSET_TOP, bottom: OUTSET_BOTTOM }
);

export { CARD_SLOT_BOX, CARD_SLOT_CLIP_PATH };
export const CARD_SLOT_CLIP_POLYGON = SLOT_POLYGON;