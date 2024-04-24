import React, { createContext, useState, useContext } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [largeFont, setLargeFont] = useState(false);

  return (
    <FontSizeContext.Provider value={{ largeFont, setLargeFont }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
