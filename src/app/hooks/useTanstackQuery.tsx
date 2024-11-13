"use client";

import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";

const useSignUp = () => {
  const {
    mutate: SignUpMutation,
    isPending: SignUpPending,
    isSuccess: SignUpSuccess,
    error: SignUpError,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({ auth, email, password }) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    },
  });

  return { SignUpMutation, SignUpPending, SignUpSuccess, SignUpError };
};

export { useSignUp };
