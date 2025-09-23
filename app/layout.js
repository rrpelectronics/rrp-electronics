import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
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
      <head>
        {/* Google Analytics Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7C3BEJ81LD"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7C3BEJ81LD');
          `}
        </Script>
      </head>
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