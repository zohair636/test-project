"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type SetterContextType = {
  setAuthErrorMessage: Dispatch<SetStateAction<string>>;
} | null;

type GetterContextType = {
  authErrorMessage: string;
} | null;

const AppSetterContext = createContext<SetterContextType>(null);
const AppGetterContext = createContext<GetterContextType>(null);

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  return (
    <AppSetterContext.Provider value={{ setAuthErrorMessage }}>
      <AppGetterContext.Provider value={{ authErrorMessage }}>
        {children}
      </AppGetterContext.Provider>
    </AppSetterContext.Provider>
  );
};

export default AppContext;
export { AppSetterContext, AppGetterContext };
