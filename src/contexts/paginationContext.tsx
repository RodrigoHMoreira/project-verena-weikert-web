import React, { createContext, ReactNode, useContext, useState } from "react";
import { PaginationContextType } from "../interfaces/ContextType";

interface PaginationProviderProps {
  children: ReactNode;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export const usePaginationContext = (): PaginationContextType => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error(
      "usePaginationContext deve ser usado dentro de um PaginationContextProvider"
    );
  }
  return context;
};

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        setTotalPages,
        itemsPerPage,
        setItemsPerPage,
        handlePageChange,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
