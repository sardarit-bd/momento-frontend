import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});






//local font is here
const Brunson = localFont({
  src: [
    {
      path: "../public/font/Brunson.ttf",
      weight: "500",
      style: "regular",
    },
  ],
  variable: "--font-Brunson",
});

const FastSpeedDemo = localFont({
  src: [
    {
      path: "../public/font/FastSpeedDemo-eZROg.ttf",
      weight: "500",
      style: "regular",
    },
  ],
  variable: "--font-FastSpeedDemo",
});

const GustanBlack = localFont({
  src: [
    {
      path: "../public/font/GustanBlack.otf",
      weight: "500",
      style: "regular",
    },
  ],
  variable: "--font-GustanBlack",
});

const AileronFont = localFont({
  src: [
    {
      path: "../public/font/Aileron-Heavy.otf",
      weight: "700",
      style: "heavy",
    },
    {
      path: "../public/font/Aileron-Bold.otf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../public/font/Aileron-SemiBold.otf",
      weight: "500",
      style: "semibold",
    },
    {
      path: "../public/font/Aileron-Regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/font/Aileron-Light.otf",
      weight: "300",
      style: "thin",
    },
  ],
  variable: "--font-Aileron",
});

const RamaGothic = localFont({
  src: [
    {
      path: "../public/font/Rama-Gothic.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-RamaGothic",
});



export const metadata = {
  title: "Momento Cards - Customize Your Own Cards",
  description: "Design your own custom cards with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable} ${Brunson.variable} ${GustanBlack.variable} ${AileronFont.variable} ${FastSpeedDemo.variable} ${RamaGothic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
