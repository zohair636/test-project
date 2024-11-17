import React from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = ({ content }: { content: string }) =>
  toast.success(`${content}`, {
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

const SuccessToaster = ({ content }: { content: string }) => {
  return (
    <div className="absolute top-0 left-0 right-0 mx-auto flex justify-center items-center my-4">
      <p className="bg-green-800 p-2 px-4 rounded-md">{content}</p>
      <Toaster />
    </div>
  );
};

export default SuccessToaster;
