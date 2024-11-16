"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { AppSetterContext } from "../context/AppContext";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../utils/firebase";

const useSignUp = () => {
  const { setAuthErrorMessage } = useContext(AppSetterContext);
  const {
    mutate: SignUpMutation,
    isPending: SignUpPending,
    isSuccess: SignUpSuccess,
    error: SignUpError,
    reset: resetSignUpState,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({
      auth,
      email,
      password,
    }: {
      auth: any;
      email: string;
      password: string;
    }) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    },
    onError: (error) => {
      setAuthErrorMessage(error?.message);
    },
  });

  return {
    SignUpMutation,
    SignUpPending,
    SignUpSuccess,
    SignUpError,
    resetSignUpState,
  };
};

const useSignIn = () => {
  const {
    mutate: signInMutation,
    data: signInData,
    isPending: signInPending,
    error: signinError,
    reset: signinReset,
  } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async ({
      auth,
      email,
      password,
    }: {
      auth: any;
      email: string;
      password: string;
    }) => {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response || {};
    },
  });

  return {
    signInMutation,
    signInData,
    signInPending,
    signinError,
    signinReset,
  };
};

const useSaveUser = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const { mutate: saveUserMutation } = useMutation({
    mutationKey: ["db"],
    mutationFn: async ({
      uid,
      name,
      email,
      password,
    }: {
      uid: string | undefined;
      name: string;
      email: string;
      password: string;
    }) => {
      return await setDoc(doc(db, "users", auth.currentUser?.uid), {
        uid,
        name,
        email,
        password,
      });
    },
  });

  return { saveUserMutation };
};

const useUserData = () => {
  const db = getFirestore(app);
  const q = query(collection(db, "users"));
  const { data: userInfoData, isLoading: loadingUserData } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const querySnapshot = await getDocs(q);
      const response = querySnapshot.docs.map((doc) => doc.data());
      return response || {};
    },
    staleTime: 5000,
  });

  return { userInfoData, loadingUserData };
};

const useUpdateUserData = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const docRef = doc(db, "users", auth.currentUser?.uid);
  const { mutate: updateUserMutation, isPending: updatingUserData } =
    useMutation({
      mutationKey: ["update-user"],
      mutationFn: async ({
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      }) => {
        return await updateDoc(docRef, { name, email, password });
      },
    });

  return {
    updateUserMutation,
    updatingUserData,
  };
};

export { useSignUp, useSignIn, useSaveUser, useUserData, useUpdateUserData };
