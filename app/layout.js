import "./globals.css";
import localFont from "next/font/local";
import { AppProvider } from "@/app/context/AppContext";
import ClientLayout from "@/app/ClientLayout";

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
          <ClientLayout>
            {children}
          </ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
