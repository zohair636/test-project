"use client";

import { SignUpHelperFunction } from "@/app/helper/AuthHelper";
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
import { useSaveUser, useSignUp } from "@/app/hooks/useTanstackQuery";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const navigate = useRouter();
  const auth = getAuth(app);
  const [userInput, setUserInput] = useState<UserInput[]>(
    SignUpHelperFunction()
  );
  const [isValidate, setIsValidate] = useState(false);
  const validEmail = useEmailValidation(userInput, 1);
  const validPassword = usePasswordValidation(userInput, 2);
  const {
    SignUpMutation,
    SignUpPending,
    SignUpSuccess,
    SignUpError,
    resetSignUpState,
  } = useSignUp();
  const { saveUserMutation } = useSaveUser();

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
      setIsValidate(true);
      return;
    }
    SignUpMutation(
      { auth, email, password },
      {
        onSuccess: () => {
          saveUserMutation({
            uid: auth?.currentUser?.uid,
            name,
            email,
            password,
          });
        },
      }
    );
    setTimeout(() => {
      resetSignUpState();
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
          {index === 1 && !validEmail && (
            <p className="text-xs text-red-700 mt-2">
              {errorText.USE_VALID_EMAIL}
            </p>
          )}
          {index === 2 && !validPassword && (
            <p className="text-xs text-red-700 mt-2">
              {errorText.USE_VALID_PASSWORD}
            </p>
          )}
        </div>
      ))}
      <AuthButton
        onClick={handleSubmit}
        label={buttonText.REGISTER_LABEL}
        isLoading={SignUpPending}
      />
      <FollowOnButton
        label={buttonText.ALREADY_HAVE_AN_ACCOUNT_LABEL}
        onClick={() => navigate.push("/login")}
      />
      {SignUpSuccess && (
        <p className="bg-green-800 text-center text-sm w-full my-2 p-1 rounded-full">
          Your Account has been created successfully!
        </p>
      )}
      {SignUpError && (
        <p className="bg-red-800 text-center text-sm w-full my-2 p-1 rounded-full">
          Something went wrong!
        </p>
      )}
    </div>
  );
};

export default SignUpForm;
