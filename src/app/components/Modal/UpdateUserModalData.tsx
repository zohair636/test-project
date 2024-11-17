"use client";

import { UserProfileHelperFunction } from "@/app/helper/UserProfileHelper";
import { useUpdateUserData } from "@/app/hooks/useTanstackQuery";
import { ArrayIndex, InputChangeEvent } from "@/app/utils/types";
import React, { useContext, useState } from "react";
import { UpdateButton } from "../Buttons/AuthButtons.tsx/ActionButtons";
import { headingText } from "@/app/Global/text";
import { AppGetterContext, AppSetterContext } from "@/app/context/AppContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const UpdateUserModalData = ({ onClose }: { onClose: () => void }) => {
  const [userDetails, setUserDetails] = useState(UserProfileHelperFunction());
  const { updateUserMutation, updatingUserData } = useUpdateUserData();
  const { setIsValidate } = useContext(AppSetterContext);
  const { isValidate } = useContext(AppGetterContext);
  const { setMessage } = useContext(AppSetterContext);
  const queryClient = useQueryClient();

  const handleChange = (e: InputChangeEvent, index: ArrayIndex) => {
    setUserDetails((prev) => {
      const updateInput = [...prev];
      updateInput[index].value = e.target.value;
      return updateInput;
    });
  };

  const handleValidation = (index: ArrayIndex, valid: boolean) => {
    setIsValidate((prev) => {
      const validate = [...prev];
      validate[index] = valid;
      return validate;
    });
  };

  const handleSubmit = () => {
    const name = userDetails[0]?.value;
    const email = userDetails[1]?.value;
    const password = userDetails[2]?.value;
    if (!name || !email || !password) {
      handleValidation(2, true);
      return;
    }
    updateUserMutation(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Your data updated successfully!", {
            style: {
              border: "1px solid #27272a",
              padding: "8px",
              color: "#fff",
              backgroundColor: "#18181b",
            },
            iconTheme: {
              primary: "green",
              secondary: "#fff",
            },
          });
          queryClient.invalidateQueries("user-data");
          setMessage("Your data updated successfully!");
          setTimeout(() => {
            setMessage("");
          }, 2000);
          onClose();
        },
      }
    );
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl mb-4 bg-neutral-800 p-1 rounded-md">
        {headingText.UPDATE_YOUR_PROFILE}
      </h1>
      <div className="flex flex-col justify-center items-center gap-2">
        {userDetails?.map((items, index) => (
          <div key={items?.id} className="flex flex-col w-full">
            <label>{items?.label}</label>
            <input
              value={items?.value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={handleEnterKey}
              className={`bg-transparent outline-none ${
                isValidate[2] && !items?.value
                  ? "focus:outline-red-800 border border-red-800"
                  : "focus:outline-neutral-800 border border-neutral-800"
              } p-1 px-4 my-1 rounded-full duration-200`}
            />
          </div>
        ))}
      </div>
      <UpdateButton isLoading={updatingUserData} onClick={handleSubmit} />
    </>
  );
};

export default UpdateUserModalData;
