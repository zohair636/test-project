import { loaderText } from "@/app/Global/text";
import { ReactNode } from "@/app/utils/types";
import React from "react";

const AuthButton = ({
  label,
  isLoading,
  onClick,
}: {
  label: ReactNode;
  isLoading: boolean;
  onClick: () => void;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-neutral-900 hover:bg-neutral-900/40 p-2 my-2 rounded-full duration-200 sm:w-96 w-80"
      >
        {isLoading ? loaderText.PROCESSING : label}
      </button>
    </div>
  );
};

export default AuthButton;
