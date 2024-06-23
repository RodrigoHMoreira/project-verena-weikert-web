import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
