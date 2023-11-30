"use client"

import React, { useContext } from 'react';

// Create the context
export const APIContext = React.createContext("");
const Api = "http://localhost:3050";

// Create the context provider component
export const APIProvider = ({ children }) => {
  return (
    <APIContext.Provider value={{Api}}>
      {children}
    </APIContext.Provider>
  );
};

// Create a custom hook to access the context value
export function useAppContext() {
  return useContext(APIContext);
}
