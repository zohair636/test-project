"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type SetterContextType = {
  setAuthErrorMessage: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setIsValidate: Dispatch<SetStateAction<boolean[]>>;
} | null;

type GetterContextType = {
  authErrorMessage: string;
  message: string;
  isValidate: boolean[];
} | null;

const AppSetterContext = createContext<SetterContextType>(null);
const AppGetterContext = createContext<GetterContextType>(null);

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isValidate, setIsValidate] = useState([false, false, false]);

  return (
    <AppSetterContext.Provider
      value={{ setAuthErrorMessage, setIsValidate, setMessage }}
    >
      <AppGetterContext.Provider
        value={{ authErrorMessage, isValidate, message }}
      >
        {children}
      </AppGetterContext.Provider>
    </AppSetterContext.Provider>
  );
};

export default AppContext;
export { AppSetterContext, AppGetterContext };
