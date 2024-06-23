import React, { createContext, ReactNode, useContext, useState } from "react";
import { UserContextType, UserData } from "../interfaces/ContextType";

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext deve ser usado dentro de um UserContextProvider"
    );
  }
  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    telephone: "",
    photoUrl:
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([""]);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData({ ...userData, ...newData });
  };

  const updatePhotoUrl = (newUrl: string) => {
    setUserData({ ...userData, photoUrl: newUrl });
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        validationErrors,
        setValidationErrors,
        updateUserData,
        updatePhotoUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
