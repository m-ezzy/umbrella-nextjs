"use client";
import { createContext, useContext, useState } from "react";

export const FounderContext: any = createContext(null);

export function useFounderContext() {
  return useContext(FounderContext);
}

export function FounderContextProvider({ children, data }: any) {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [filters, setFilters] = useState([]);
  const [render, setRender] = useState(true); //tells whether to set the data passed from above component into the filters or not

  return (
    <FounderContext.Provider value={{ currentMenu, setCurrentMenu, filters, setFilters, render, setRender }}>
      {children}
    </FounderContext.Provider>
  );
}
