"use client";

import { SignInHelperFunction } from "@/app/helper/AuthHelper";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import AuthButton, {
  FollowOnButton,
} from "../../Buttons/AuthButtons.tsx/AuthButton";
import { buttonText, errorText } from "@/app/Global/text";
import {
  ArrayIndex,
  InputChangeEvent,
  KeyboardEvent,
  UserInput,
} from "@/app/utils/types";
import app from "@/app/utils/firebase";
import {
  useEmailValidation,
  usePasswordValidation,
} from "@/app/hooks/useValidationHook";
import { useSignIn } from "@/app/hooks/useTanstackQuery";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const navigate = useRouter();
  const auth = getAuth(app);
  const [userInput, setUserInput] = useState<UserInput[]>(
    SignInHelperFunction()
  );
  const [isValidate, setIsValidate] = useState(false);
  const validEmail = useEmailValidation(userInput, 0);
  const validPassword = usePasswordValidation(userInput, 1);
  const {
    signInMutation,
    signInPending,
    signinError,
    signinReset,
  } = useSignIn();

  const handleChange = (e: InputChangeEvent, index: ArrayIndex) => {
    setUserInput((prev) => {
      const newInput = [...prev];
      newInput[index].value = e.target.value;
      return newInput;
    });
  };

  const handleSubmit = async () => {
    const email = userInput[0].value;
    const password = userInput[1].value;

    if (!email || !password) {
      setIsValidate(true);
      return;
    }
    signInMutation(
      { auth, email, password },
      {
        onSuccess: () => {
          navigate.push("/profile");
        },
      }
    );
    setTimeout(() => {
      signinReset();
    }, 3000);
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center border border-neutral-900 p-4 rounded-lg">
      {userInput.map((items, index) => (
        <div key={items?.id} className="flex flex-col my-1">
          <label className="text-sm">{items?.label}</label>
          <input
            value={items?.value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={handleEnterKey}
            placeholder={
              isValidate ? errorText.REQUIRED_FIELD : items?.placeholder
            }
            type={items?.type}
            className={`bg-transparent outline-none sm:w-96 w-80 border ${
              isValidate && !items?.value
                ? "border-red-700 placeholder:text-red-700 focus:outline-red-800"
                : "border-neutral-800 placeholder:text-neutral-600 focus:outline-neutral-800"
            } p-2 px-4 mt-1 rounded-full duration-200`}
          />
          {index === 0 && !validEmail && (
            <p className="text-xs text-red-700 mt-2">
              {errorText.USE_VALID_EMAIL}
            </p>
          )}
          {index === 1 && !validPassword && (
            <p className="text-xs text-red-700 mt-2">
              {errorText.USE_VALID_PASSWORD}
            </p>
          )}
        </div>
      ))}
      <AuthButton
        onClick={handleSubmit}
        label={buttonText.SIGNIN_LABEL}
        isLoading={signInPending}
      />
      <FollowOnButton
        label={buttonText.DO_NOT_HAVE_AN_ACCOUNT_LABEL}
        onClick={() => navigate.push("/register")}
      />
      {signinError && (
        <p className="bg-red-800 text-center text-sm w-full my-2 p-1 rounded-full">
          Something went wrong!
        </p>
      )}
    </div>
  );
};

export default SignInForm;
