"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

  const [state, setState] = useState({
    selectedIndex: 0,
    isActive: false,
  });

  const value = {
    state,
    setState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
