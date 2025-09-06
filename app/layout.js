import { Outfit,Ovo } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const outfit = Outfit({
  subsets: ["latin"], weight :["400","500",'600','700']
});

const ovo = Ovo({
  subsets: ["latin"], weight :["400"]
});

export const metadata = {
  title: "Portfolio - Deepak Behara",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:text-white dark:bg-darkTheme`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
