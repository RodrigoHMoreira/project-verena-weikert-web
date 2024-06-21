import React, { FC } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";

export interface SearchHeaderProps {}

const SearchHeader: FC<SearchHeaderProps> = () => {
  return (
    <div className="flex items-center border rounded-xl w-64 bg-[#ffffff] shadow-sm">
      <input
        type="text"
        placeholder="Buscar usuário"
        className="flex-grow px-4 py-2 rounded-xl focus:outline-none"
        onChange={() => {
          console.log("buscar");
        }}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchHeader;
