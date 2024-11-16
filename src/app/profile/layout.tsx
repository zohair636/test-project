"use client";

import React from "react";
import { useUserData } from "../hooks/useTanstackQuery";
import { getAuth } from "firebase/auth";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { userInfoData, loadingUserData } = useUserData();
  const auth = getAuth();
  const authenticatedUser = userInfoData?.filter(
    (user) => user?.uid === auth?.currentUser?.uid
  );

  if (loadingUserData)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        Loading....
      </div>
    );

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      <h1 className="text-5xl">{authenticatedUser?.[0]?.name} Profile</h1>
      {children}
    </div>
  );
};

export default layout;
