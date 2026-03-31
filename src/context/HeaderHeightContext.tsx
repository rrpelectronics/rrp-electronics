"use client";
import { createContext, useContext } from "react";

const HeaderHeightContext = createContext(0);

export const HeaderHeightProvider = ({ children, height }) => (
  <HeaderHeightContext.Provider value={height}>
    {children}
  </HeaderHeightContext.Provider>
);

export const useHeaderHeight = () => useContext(HeaderHeightContext);
