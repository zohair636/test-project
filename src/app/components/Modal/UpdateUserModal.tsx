"use client";

import React, { useEffect } from "react";

const UpdateUserModal = ({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    document.body.style.overflowY = visible ? "hidden" : "scroll";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  if (!visible) return null;

  return (
    <div>
      <div
        onClick={onClose}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-50 backdrop-blur-sm"
      />
      <div
        className="fixed z-50 bg-neutral-900 xl:w-4/12 lg:w-6/12 md:w-7/12 w-11/12 h-auto p-4 rounded-lg"
        style={{ top: "50%", left: "50%", transform: `translate(-50%, -50%)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default UpdateUserModal;
