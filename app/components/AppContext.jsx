"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Add your global state here
  const [state, setState] = useState({
    selectedIndex: 0,
    isActive: false,
  });

  // Add your context methods here
  const value = {
    state,
    setState,
    // Add other methods you want to expose through context
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
