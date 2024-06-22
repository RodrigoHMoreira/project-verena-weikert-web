import React, { createContext, ReactNode, useState } from "react";
import { UserContextType, UserData } from "../interfaces/UserContextType";

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  userData: {
    name: "",
    email: "",
    telephone: "",
    photoUrl:
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
  },
  updateUserData: () => {},
  updatePhotoUrl: (newUrl: string) => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    telephone: "",
    photoUrl:
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
  });

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData({ ...userData, ...newData });
  };

  const updatePhotoUrl = (newUrl: string) => {
    setUserData({ ...userData, photoUrl: newUrl });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, updatePhotoUrl }}>
      {children}
    </UserContext.Provider>
  );
};
