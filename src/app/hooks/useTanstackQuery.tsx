"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { AppSetterContext } from "../context/AppContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
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
    mutationFn: async ({ auth, email, password }) => {
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
    isPending: signInPending,
    error: signinError,
    reset: signinReset,
  } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async ({ auth, email, password }) => {
      return await signInWithEmailAndPassword(auth, email, password);
    },
  });

  return {
    signInMutation,
    signInPending,
    signinError,
    signinReset,
  };
};

const useSaveUser = () => {
  const db = getFirestore(app);
  const { mutate: saveUserMutation } = useMutation({
    mutationKey: ["db"],
    mutationFn: async ({ name, email, password }) => {
      return await addDoc(collection(db, "users"), { name, email, password });
    },
  });

  return { saveUserMutation };
};

export { useSignUp, useSignIn, useSaveUser };
