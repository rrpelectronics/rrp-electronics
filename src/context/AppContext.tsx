"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface AppState {
  selectedIndex: number;
  isActive: boolean;
}

interface AppContextType {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
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
