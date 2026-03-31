import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { AppProvider } from "@/context/AppContext";
import ClientLayout from "@/components/ClientLayout";

const neueMontreal = localFont({
  src: "../../public/fonts/NeueMontreal-Regular.woff",
  variable: "--font-neueMontreal",
});

const neueMontrealMd = localFont({
  src: "../../public/fonts/NeueMontreal-Medium.woff",
  variable: "--font-neueMontrealMd",
});

export const metadata = {
  title: "RRP Electronics",
  description: "RRP Electronics Limited",
  verification: {
    google: "Mauul6eDLnHoqbM-_J81nly1gJwbMfFLKwNvjX9UByw",
  },
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

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tf81zbnsjx");
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
