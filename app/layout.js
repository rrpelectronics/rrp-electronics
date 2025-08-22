import "./globals.css";
import localFont from "next/font/local";
import { ReactLenis } from "lenis/react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { AppProvider } from "./components/AppContext";

const neueMontreal = localFont({
  src: "../public/fonts/NeueMontreal-Regular.woff",
  variable: "--font-neueMontreal",
});

const neueMontrealMd = localFont({
  src: "../public/fonts/NeueMontreal-Medium.woff",
  variable: "--font-neueMontrealMd",
});

export const metadata = {
  title: "RRP Electronics",
  description: "RRP Electronics Limited",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${neueMontreal.variable} ${neueMontrealMd.variable} antialiased relative`}
      >
        <AppProvider>
          <ReactLenis root>
            <Header />
              {children}
            <Footer />
          </ReactLenis>
        </AppProvider>
      </body>
    </html>
  );
}
