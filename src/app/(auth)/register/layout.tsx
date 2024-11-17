import { headingText } from "@/app/Global/text";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl">{headingText.REGISTER_TO_CONTINUE}</h1>
      {children}
    </div>
  );
};

export default layout;
