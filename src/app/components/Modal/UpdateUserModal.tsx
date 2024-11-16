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
        className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-50"
      />
      <div
        className="fixed z-50 bg-white w-96 h-96"
        style={{ top: "50%", left: "50%", transform: `translate(-50%, -50%)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default UpdateUserModal;
