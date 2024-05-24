import React, { createContext, useState } from "react";

const MenuItemContext = createContext({ selectedMenuText: "" });

const MenuItemProvider = ({ children }) => {
  const [selectedMenuText, setSelectedMenuText] = useState("Tổng quan"); // Initial text

  return (
    <MenuItemContext.Provider value={{ selectedMenuText, setSelectedMenuText }}>
      {children}
    </MenuItemContext.Provider>
  );
};

export { MenuItemContext, MenuItemProvider };
