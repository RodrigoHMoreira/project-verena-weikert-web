import React from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import UpdateIcon from "../../assets/icons/UpdateIcon";
import SearchHeader from "../../components/SearchHeader";
import UserTable from "../../components/UserTable";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-full flex-col flex justify-end items-end">
      <div className="w-[calc(100%-256px)] flex justify-end items-center p-3">
        <SearchHeader />
      </div>
      <div className="bg-[#E5E5E5] h-[calc(100%-90px)] w-[calc(100%-256px)] px-6">
        <div className="pt-8 flex justify-between">
          <h1 className="text-xl font-bold">Lista de Usuários</h1>
          <button
            className="bg-[#feae00] text-sm text-white rounded-md px-4 py-4 ml-2 hover:bg-[#fe9000] focus:outline-none"
            onClick={() => {
              console.log("adicionar");
            }}
          >
            ADICIONAR NOVO USUÁRIO
          </button>
        </div>
        <hr className="my-8 border-t-2" />
        <UserTable />
      </div>
    </div>
  );
};

export default Home;
