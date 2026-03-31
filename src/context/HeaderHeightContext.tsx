"use client";
import { createContext, useContext, ReactNode } from "react";

const HeaderHeightContext = createContext<number>(0);

export const HeaderHeightProvider = ({ children, height }: { children: ReactNode; height: number }) => (
  <HeaderHeightContext.Provider value={height}>
    {children}
  </HeaderHeightContext.Provider>
);

export const useHeaderHeight = () => useContext(HeaderHeightContext);
