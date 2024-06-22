import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/userContext";
import { PaginationProvider } from "./contexts/paginationContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <PaginationProvider>
        <App />
      </PaginationProvider>
    </UserProvider>
  </React.StrictMode>
);
