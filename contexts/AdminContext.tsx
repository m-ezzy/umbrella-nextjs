"use client";
import { createContext, useContext, useState } from "react";

const AdminContext: any = createContext(null);

export function useAdminContext() {
  return useContext(AdminContext);
}

export function AdminContextProvider({ children, data }: any) {
  // const [currentMenu, setCurrentMenu] = useState(null);
  const [selectedFilters, setSelectedFilters]: any = useState({});

  return (
    <AdminContext.Provider value={{ selectedFilters: selectedFilters, setSelectedFilters: setSelectedFilters }}>
      {children}
    </AdminContext.Provider>
  );
}
