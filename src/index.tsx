import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/userContext";
import { PaginationProvider } from "./contexts/paginationContext";
import { AuthProvider } from "./contexts/authContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
