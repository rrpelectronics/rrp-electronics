// app/context/FooterContext.js
"use client";
import { createContext, useContext, useState } from "react";

const FooterContext = createContext();

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
};

export const FooterProvider = ({ children }) => {
  const [footerContent, setFooterContent] = useState(null); // Start with null

  return (
    <FooterContext.Provider value={{ footerContent, setFooterContent }}>
      {children}
    </FooterContext.Provider>
  );
};
