"use client";

const DeckBoxPreview = ({ characterImages = [] }) => {
  console.log(characterImages);
  console.log(characterImages.length);
  return (
    <div className="relative w-70 sm:w-85 md:w-105 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      <img
        src="/boxpreview.png"
        alt="Box Template"
        width={1000}
        height={1000}
        className="w-full h-auto object-contain"
      />

      {characterImages.length > 0 && (
        <>
          <div
            className="absolute z-10 flex items-end justify-center"
            style={{
              top: "9.5%",
              left: "10%",
              width: "36%",
              height: "11%",
              transform: "rotate(180deg)",
            }}
          >
            {characterImages.map((charSrc, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden shrink-0"
                style={{
                  width: `${Math.min(22, 90 / characterImages.length)}%`,
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  marginLeft: idx === 0 ? "0" : "-4px",
                }}
              >
                <img
                  src={charSrc}
                  alt={`Character bust ${idx}`}
                  className="absolute w-full object-cover"
                  style={{
                    top: "0%",
                    left: "0%",
                    height: "160%",
                    objectPosition: "top center",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            className="absolute z-10"
            style={{ top: "43%", left: "10%", width: "36%", height: "42%" }}
          >
            {(() => {
              const total = characterImages.length;
              const getLayout = () => {
                if (total === 1)
                  return [{ i: 0, x: 0, y: 0, scale: 1, z: 3, size: "55%" }];
                if (total === 2)
                  return [
                    { i: 1, x: -20, y: -18, scale: 0.72, z: 1, size: "38%" },
                    { i: 0, x: 0, y: 0, scale: 1, z: 3, size: "55%" },
                  ];
                if (total === 3)
                  return [
                    { i: 1, x: -22, y: -18, scale: 0.72, z: 1, size: "38%" },
                    { i: 2, x: 22, y: -18, scale: 0.72, z: 1, size: "38%" },
                    { i: 0, x: 0, y: 0, scale: 1, z: 3, size: "55%" },
                  ];
                if (total === 4)
                  return [
                    {
                      i: 0,
                      x: -22,
                      y: -15,
                      scale: 0.65,
                      z: 1,
                      size: "95%",
                      clip: "0% 25% 10% 23%",
                    },
                    {
                      i: 3,
                      x: 22,
                      y: -15,
                      scale: 0.65,
                      z: 1,
                      size: "95%",
                      clip: "0% 23% 10% 25%",
                    },
                    {
                      i: 1,
                      x: -19,
                      y: 17,
                      scale: 0.8,
                      z: 2,
                      size: "99%",
                      clip: "0% 27% 55% 28%",
                    },
                    {
                      i: 2,
                      x: 19,
                      y: 17,
                      scale: 0.8,
                      z: 2,
                      size: "99%",
                      clip: "0% 27% 55% 25%",
                    },
                    {
                      i: 0,
                      x: 0,
                      y: 32,
                      scale: 1,
                      z: 3,
                      size: "99%",
                      clip: "0% 25% 49.3% 25%",
                    },
                  ];
                return [
                  {
                    i: 3,
                    x: -17,
                    y: -2,
                    scale: 0.8,
                    z: 1,
                    size: "99%",
                    clip: "0% 25% 10% 24%",
                  },
                  {
                    i: 4,
                    x: 17,
                    y: -2,
                    scale: 0.8,
                    z: 1,
                    size: "99%",
                    clip: "0% 25% 10% 24%",
                  },
                  {
                    i: 1,
                    x: -19,
                    y: 17,
                    scale: 0.8,
                    z: 2,
                    size: "99%",
                    clip: "0% 27% 55% 28%",
                  },
                  {
                    i: 2,
                    x: 19,
                    y: 17,
                    scale: 0.8,
                    z: 2,
                    size: "99%",
                    clip: "0% 27% 55% 25%",
                  },
                  {
                    i: 0,
                    x: 0,
                    y: 32,
                    scale: 1,
                    z: 3,
                    size: "99%",
                    clip: "0% 25% 49.3% 25%",
                  },
                ];
              };
              return getLayout().map((slot, key) => (
                <div
                  key={key}
                  className="absolute overflow-hidden"
                  style={{
                    width: slot.size,
                    aspectRatio: "3 / 4",
                    bottom: "0%",
                    left: "50%",
                    transform: `translateX(calc(-50% + ${slot.x}%)) translateY(${slot.y}%) scale(${slot.scale})`,
                    transformOrigin: "bottom center",
                    zIndex: slot.z,
                    borderRadius: "4px",
                    clipPath: slot.clip
                      ? `inset(${slot.clip} round 4px)`
                      : "none",
                  }}
                >
                  <img
                    src={characterImages[slot.i]}
                    alt={`Character ${slot.i}`}
                    className="absolute w-full object-cover"
                    style={{
                      top: "0%",
                      height: "100%",
                      objectPosition: "top center",
                    }}
                  />
                </div>
              ));
            })()}
          </div>

          <div
            className="absolute z-10 flex flex-col items-center justify-start"
            style={{ top: "28%", left: "51%", width: "8%", height: "45%" }}
          >
            {(() => {
              const total = characterImages.length;
              const getStripLayout = () => {
                if (total === 1) return [{ i: 0, isLeader: true }];
                if (total === 2)
                  return [
                    { i: 1, isLeader: false },
                    { i: 0, isLeader: false },
                    { i: 0, isLeader: true },
                  ];
                if (total === 3)
                  return [
                    { i: 2, isLeader: false },
                    { i: 1, isLeader: false },
                    { i: 0, isLeader: false },
                    { i: 0, isLeader: true },
                  ];
                if (total === 4)
                  return [
                    { i: 3, isLeader: false },
                    { i: 2, isLeader: false },
                    { i: 1, isLeader: false },
                    { i: 0, isLeader: false },
                    { i: 0, isLeader: true },
                  ];
                return [
                  { i: 4, isLeader: false },
                  { i: 3, isLeader: false },
                  { i: 2, isLeader: false },
                  { i: 1, isLeader: false },
                  { i: 0, isLeader: true },
                ];
              };
              return getStripLayout().map((slot, key) => (
                <div
                  key={key}
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    width: slot.isLeader ? "85%" : "70%",
                    aspectRatio: "1 / 1",
                    borderRadius: slot.isLeader ? "0%" : "40%",
                    marginTop: key === 0 ? "0" : "-12%",
                    transform: `translateX(${slot.isLeader ? -80 : -90}%) translateY(${slot.isLeader ? 0 : -40}%) rotate(-90deg)`,
                  }}
                >
                  <img
                    src={characterImages[slot.i]}
                    alt={`Strip character ${slot.i}`}
                    className="absolute object-cover"
                    style={{
                      width: "100%",
                      height: "250%",
                      top: "0%",
                      left: "-10%",
                      objectPosition: "top center",
                    }}
                  />
                </div>
              ));
            })()}
          </div>
        </>
      )}
    </div>
  );
};

export default DeckBoxPreview;
