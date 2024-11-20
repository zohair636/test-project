"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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
      auth: Auth;
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
      auth: Auth;
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

  const saveUserMutation = useMutation({
    mutationKey: ["db"],
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      uid: string | undefined;
      name: string;
      email: string;
      password: string;
    }) => {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                password,
              });
              resolve("User saved successfully");
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error("User is not authenticated"));
          }
        });
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
  const { setMessage } = useContext(AppSetterContext);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const {
    mutate: updateUserMutation,
    isPending: updatingUserData,
    isSuccess: userDataUpdated,
  } = useMutation({
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
      if (!auth.currentUser?.uid) {
        throw new Error("User is not authenticated");
      }
      const docRef = doc(db, "users", auth.currentUser.uid); // Ensure uid is available
      return await updateDoc(docRef, { name, email, password });
    },
    onSuccess: () => {
      setMessage("Your data updated successfully!");
    },
  });

  return {
    updateUserMutation,
    updatingUserData,
    userDataUpdated,
  };
};

export { useSignUp, useSignIn, useSaveUser, useUserData, useUpdateUserData };
