export interface UserData {
  name: string;
  email: string;
  telephone: string;
  photoUrl: string;
  tp_user: string;
}

export interface UserContextType {
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
  updatePhotoUrl: (newUrl: string) => void;
}
