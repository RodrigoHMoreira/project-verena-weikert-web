import { createContext, ReactNode, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateUserBody } from "../helpers/utils";
import { AuthContextType } from "../interfaces/ContextType";
import { UserType } from "../interfaces/UserType";
import { apiClient } from "../services/apiClient";
import { useUserContext } from "./userContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useUserContext deve ser usado dentro de um UserContextProvider"
    );
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userData, setValidationErrors } = useUserContext();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async () => {
    const body = {
      ds_email: userData.email,
      hs_password: userData.password,
    };

    const requiredFields = ["ds_email", "hs_password"];

    const validationErrors = validateUserBody(body, requiredFields);

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      const response = await apiClient.post<{ token: string; user: UserType }>(
        "/login",
        body
      );
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
