"use client";

import { useEffect, useState } from "react";
import { ArrayIndex, UserInput } from "../utils/types";

const useEmailValidation = (userInput: UserInput[], index: ArrayIndex) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(userInput[index]?.value)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [userInput, index]);

  return isValidEmail;
};

const usePasswordValidation = (userInput: UserInput[], index: ArrayIndex) => {
  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (passwordRegex.test(userInput[index]?.value)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [userInput, index]);

  return isValidPassword;
};

export { useEmailValidation, usePasswordValidation };
