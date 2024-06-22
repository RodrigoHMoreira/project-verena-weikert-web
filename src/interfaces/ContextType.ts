import { Dispatch, SetStateAction } from "react";

export interface UserData {
  name: string;
  email: string;
  telephone: string;
  photoUrl: string;
  tp_user: string;
}

export interface UserContextType {
  userData: UserData;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
  updateUserData: (newData: Partial<UserData>) => void;
  updatePhotoUrl: (newUrl: string) => void;
}

export interface PaginationContextType {
  currentPage: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (pageNumber: number) => void;
}
