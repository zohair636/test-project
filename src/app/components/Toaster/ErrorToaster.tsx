import React from "react";

const ErrorToaster = ({ content }: { content: string }) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

export default ErrorToaster;
