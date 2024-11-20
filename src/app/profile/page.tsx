"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserProfileHelperFunction } from "../helper/UserProfileHelper";
import Image from "next/image";
import UpdateUserModal from "../components/Modal/UpdateUserModal";
import UpdateUserModalData from "../components/Modal/UpdateUserModalData";
import SuccessToaster from "../components/Toaster/SuccessToaster";
import {
  EditButton,
  LogoutButton,
} from "../components/Buttons/AuthButtons.tsx/ActionButtons";
import { AppGetterContext, AppSetterContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const userDetails = UserProfileHelperFunction();
  const [uploadImage, setUploadImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMessage } = useContext(AppSetterContext);
  const { message } = useContext(AppGetterContext);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadImage(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [setMessage]);

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        {uploadImage ? (
          <Image
            src={URL.createObjectURL(uploadImage)}
            alt="image"
            loading="lazy"
            width={100}
            height={100}
            className="size-40 rounded-full"
          />
        ) : (
          <div className="bg-transparent border-2 border-neutral-800 md:size-40 size-28 rounded-full" />
        )}
      </div>
      <div className="flex justify-center items-center mb-10">
        <input
          onChange={handleImage}
          type="file"
          className="file:bg-neutral-800 file:text-white file:p-1 file:px-4 file:rounded-full file:border-0 border border-neutral-800 rounded-full p-1 my-4"
        />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {userDetails?.map((items) => (
          <div key={items?.id} className="flex flex-col w-full md:mx-0 mx-4">
            <label>{items?.label}</label>
            <input
              value={items?.value}
              disabled
              className="bg-transparent outline-none border border-neutral-800 p-1 px-3 my-1 rounded-md"
            />
          </div>
        ))}
      </div>
      <EditButton onClick={() => setIsModalOpen(true)} />
      <LogoutButton onClick={handleLogout} />
      <UpdateUserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UpdateUserModalData onClose={() => setIsModalOpen(false)} />
      </UpdateUserModal>
      {message && <SuccessToaster content={message} />}
    </div>
  );
};

export default Page;
