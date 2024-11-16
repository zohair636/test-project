"use client";

import React, { useState } from "react";
import { UserProfileHelperFunction } from "../helper/UserProfileHelper";
import { ArrayIndex } from "../utils/types";
import Image from "next/image";
import UpdateUserModal from "../components/Modal/UpdateUserModal";
import UpdateUserModalData from "../components/Modal/UpdateUserModalData";
import { useUpdateUserData } from "../hooks/useTanstackQuery";

const page = () => {
  const [userDetails, setUserDetails] = useState(UserProfileHelperFunction());
  const [uploadImage, setUploadImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateUserMutation, updatingUserData } = useUpdateUserData();

  const handleChange = (e, index: ArrayIndex) => {
    setUserDetails((prev) => {
      const updateInput = [...prev];
      updateInput[index].value = e.target.value;
      return updateInput;
    });
  };

  const handleImage = (e) => {
    setUploadImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const name = userDetails[0]?.value;
    const email = userDetails[1]?.value;
    const password = userDetails[2]?.value;
    updateUserMutation({ name, email, password });
  };

  return (
    <div>
      {uploadImage ? (
        <Image
          src={URL.createObjectURL(uploadImage)}
          alt="image"
          loading="lazy"
          width={100}
          height={100}
          className="rounded-full"
        />
      ) : (
        <div className="bg-white size-40 rounded-full"></div>
      )}
      <input onChange={handleImage} type="file" />
      <div className="flex justify-center items-center gap-2">
        {userDetails?.map((items, index) => (
          <div key={items?.id} className="flex flex-col">
            <label>{items?.label}</label>
            <input
              value={items?.value}
              onChange={(e) => handleChange(e, index)}
              className="bg-transparent outline-none border border-neutral-800 p-1 px-4 my-1 rounded-full"
            />
          </div>
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
      <button onClick={handleSubmit}>
        {updatingUserData ? "Updating..." : "Update Profile"}
      </button>
      <UpdateUserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UpdateUserModalData />
      </UpdateUserModal>
    </div>
  );
};

export default page;
