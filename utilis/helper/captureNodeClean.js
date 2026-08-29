/**
 * @param {HTMLElement} node
 * @param {(node: HTMLElement) => Promise<string>} captureFn
 * @returns {Promise<string|null>}
 */
export default async function captureNodeClean(node, captureFn) {
  if (typeof window === "undefined") {
    return null;
  }

  if (!node) return null;

  const containerProps = [
    "border",
    "borderColor",
    "borderWidth",
    "borderStyle",
    "boxShadow",
    "outline",
    "outlineWidth",
    "outlineColor",
    "outlineStyle",
  ];

  const rndWrappers = Array.from(
    node.querySelectorAll(
      'div[style*="position: absolute"], div[style*="position:absolute"]',
    ),
  );

  const handleSelectors = [
    '[class*="react-resizable-handle"]',
    '[class*="resizable-handle"]',

    "[data-direction]",
  ].join(", ");
  const handles = Array.from(node.querySelectorAll(handleSelectors));

  const containerSnapshot = {};
  containerProps.forEach((prop) => {
    containerSnapshot[prop] = node.style[prop];
  });

  node.style.border = "none";
  node.style.boxShadow = "none";
  node.style.outline = "none";

  const containerBorderRadius = node.style.borderRadius;

  const rndSnapshots = rndWrappers.map((el) => {
    const snap = {
      border: el.style.border,
      borderColor: el.style.borderColor,
      borderWidth: el.style.borderWidth,
      borderStyle: el.style.borderStyle,
      outline: el.style.outline,
      outlineWidth: el.style.outlineWidth,
      boxShadow: el.style.boxShadow,
    };
    el.style.border = "none";
    el.style.outline = "none";
    el.style.boxShadow = "none";
    return { el, snap };
  });

  const handleSnapshots = handles.map((el) => {
    const snap = { display: el.style.display };
    el.style.display = "none";
    return { el, snap };
  });

  const classesToStrip = [
    "border",
    "border-gray-200",
    "ring-1",
    "ring-gray-100",
    "shadow-xl",
    "shadow-lg",
    "shadow-md",
    "shadow-sm",
  ];
  const strippedClasses = classesToStrip.filter((cls) =>
    node.classList.contains(cls),
  );
  strippedClasses.forEach((cls) => node.classList.remove(cls));

  const rndTailwindSnapshots = rndWrappers.map((el) => {
    const stripped = classesToStrip.filter((cls) => el.classList.contains(cls));
    stripped.forEach((cls) => el.classList.remove(cls));
    return { el, stripped };
  });

  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );

  let dataUrl = null;
  try {
    dataUrl = await captureFn(node);
  } catch (err) {
    console.error("captureNodeClean: capture failed", err);
  }

  containerProps.forEach((prop) => {
    node.style[prop] = containerSnapshot[prop] ?? "";
  });
  node.style.borderRadius = containerBorderRadius;

  strippedClasses.forEach((cls) => node.classList.add(cls));

  rndSnapshots.forEach(({ el, snap }) => {
    Object.entries(snap).forEach(([prop, val]) => {
      el.style[prop] = val ?? "";
    });
  });

  rndTailwindSnapshots.forEach(({ el, stripped }) => {
    stripped.forEach((cls) => el.classList.add(cls));
  });

  handleSnapshots.forEach(({ el, snap }) => {
    el.style.display = snap.display ?? "";
  });

  return dataUrl;
}
