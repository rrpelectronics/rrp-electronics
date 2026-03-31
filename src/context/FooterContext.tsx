"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface FooterContent {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface FooterContextType {
  footerContent: FooterContent | null;
  setFooterContent: (content: FooterContent | null) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
};

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);

  return (
    <FooterContext.Provider value={{ footerContent, setFooterContent }}>
      {children}
    </FooterContext.Provider>
  );
};
