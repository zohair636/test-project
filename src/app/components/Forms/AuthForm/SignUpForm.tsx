"use client";

import { SignUpHelperFunction } from "@/app/helper/AuthHelper";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import AuthButton from "../../Buttons/AuthButtons.tsx/AuthButton";
import { buttonText } from "@/app/Global/text";
import { ArrayIndex, InputChangeEvent, UserInput } from "@/app/utils/types";
import app from "@/app/utils/firebase";
import {
  useEmailValidation,
  usePasswordValidation,
} from "@/app/hooks/useValidationHook";
import { useSignUp } from "@/app/hooks/useTanstackQuery";

const SignUpForm = () => {
  const auth = getAuth(app);
  const [userInput, setUserInput] = useState<UserInput[]>(
    SignUpHelperFunction()
  );
  const validEmail = useEmailValidation(userInput, 1);
  const validPassword = usePasswordValidation(userInput, 2);
  const { SignUpMutation, SignUpPending, SignUpSuccess, SignUpError } =
    useSignUp();

  const handleChange = (e: InputChangeEvent, index: ArrayIndex) => {
    setUserInput((prev) => {
      const newInput = [...prev];
      newInput[index].value = e.target.value;
      return newInput;
    });
  };

  const handleSubmit = async () => {
    const name = userInput[0].value;
    const email = userInput[1].value;
    const password = userInput[2].value;

    if (!name || !email || !password) {
      return;
    }
    SignUpMutation({ auth, email, password });
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border border-neutral-900 p-4 rounded-lg sm:w-full">
      {userInput.map((items, index) => (
        <div key={items?.id} className="flex flex-col my-1">
          <label className="text-sm">{items?.label}</label>
          <input
            value={items?.value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={handleEnterKey}
            placeholder={items?.placeholder}
            type={items?.type}
            className="bg-transparent outline-none sm:w-96 w-80 focus:outline-neutral-800 border border-neutral-800 placeholder:text-neutral-600 p-2 px-4 mt-1 rounded-full duration-200"
          />
        </div>
      ))}
      <AuthButton
        onClick={handleSubmit}
        label={buttonText.REGISTER_LABEL}
        isLoading={SignUpPending}
      />
      {SignUpSuccess && <p>User signup successfully!</p>}
      {SignUpError && <p>User not signup successfully!</p>}
    </div>
  );
};

export default SignUpForm;
