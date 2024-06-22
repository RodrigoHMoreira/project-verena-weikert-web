import React, { FC } from "react";
import { usePaginationContext } from "../../contexts/paginationContext";

export interface PaginationProps {
  totalIndexes: number;
}

const Pagination: FC<PaginationProps> = ({ totalIndexes }: PaginationProps) => {
  const { currentPage, totalPages, setItemsPerPage, handlePageChange } =
    usePaginationContext();

  const handleItemsPerPage = (value: number) => {
    setItemsPerPage(Number(value));
  };

  return (
    <div className="flex justify-between items-center p-x3 w-full">
      <div className="mt-3 d-flex justify-content-end w-100 align-items-center gap-3">
        <p className="mt-3">Itens por página:</p>
        <select
          className="my-3 p-2 rounded-md"
          onChange={(e) => handleItemsPerPage(Number(e.target.value))}
        >
          <option>4</option>
          <option>8</option>
          <option>12</option>
          <option>24</option>
        </select>
      </div>
      <nav>
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage <= 1}
              className="flex items-center justify-center px-3 h-8 leading-tight rounded-md bg-white text-gray-500
         border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <p>{"<"}</p>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight rounded-md ${
                  index + 1 === currentPage
                    ? "bg-[#feae00] text-white border hover:bg-[#fe9000]"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                } border border-gray-300`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              aria-disabled={currentPage === totalIndexes}
              className="flex items-center justify-center px-3 h-8 leading-tight rounded-md bg-white text-gray-500
         border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <p>{">"}</p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
