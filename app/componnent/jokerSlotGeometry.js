export const JOKER_NATIVE_WIDTH = 11;
export const JOKER_NATIVE_HEIGHT = 15;

export const JOKER_SLOT_BOX = {
  top: 6.76,
  left: 10.67,
  width: 78.55,
  height: 86.4,
};

export const JOKER_SLOT_CLIP_PATH =
  "polygon(22.07% 0.41%, 16.82% 2.78%, 13.73% 7.2%, 13.27% 47.02%, 10.8% 50.1%, 2.78% 54.42%, 0% 58.44%, 0.15% 97.12%, 2.16% 99.07%, 5.09% 100%, 77.93% 99.59%, 83.18% 97.22%, 86.27% 92.8%, 86.73% 52.98%, 89.2% 49.9%, 97.22% 45.58%, 100% 41.56%, 99.85% 2.88%, 97.84% 0.93%, 94.91% 0%)";

export const JOKER_SLOT_CLIP_POLYGON = [
  { x: 0.2207, y: 0.0041 },
  { x: 0.1682, y: 0.0278 },
  { x: 0.1373, y: 0.072 },
  { x: 0.1327, y: 0.4702 },
  { x: 0.108, y: 0.501 },
  { x: 0.0278, y: 0.5442 },
  { x: 0.0, y: 0.5844 },
  { x: 0.0015, y: 0.9712 },
  { x: 0.0216, y: 0.9907 },
  { x: 0.0509, y: 1.0 },
  { x: 0.7793, y: 0.9959 },
  { x: 0.8318, y: 0.9722 },
  { x: 0.8627, y: 0.928 },
  { x: 0.8673, y: 0.5298 },
  { x: 0.892, y: 0.499 },
  { x: 0.9722, y: 0.4558 },
  { x: 1.0, y: 0.4156 },
  { x: 0.9985, y: 0.0288 },
  { x: 0.9784, y: 0.0093 },
  { x: 0.9491, y: 0.0 },
];

export const EXPORT_WIDTH = 750;
export const EXPORT_HEIGHT = 1050;

export const JOKER_SLOT_RECT = {
  x: (EXPORT_WIDTH * JOKER_SLOT_BOX.left) / 100,
  y: (EXPORT_HEIGHT * JOKER_SLOT_BOX.top) / 100,
  w: (EXPORT_WIDTH * JOKER_SLOT_BOX.width) / 100,
  h: (EXPORT_HEIGHT * JOKER_SLOT_BOX.height) / 100,
};
