import React from "react";
import SearchIcon from "../../assets/icons/SearchIcon";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-full flex-col flex justify-end items-end">
      <div className="w-[calc(100%-256px)] flex justify-end items-center p-3">
        <div className="flex items-center border rounded-xl w-64 bg-[#ffffff] shadow-sm">
          <input
            type="text"
            placeholder="Buscar usuário"
            className="flex-grow px-4 py-2 rounded-xl focus:outline-none"
          />
          <SearchIcon />
        </div>
      </div>
      <div className="bg-[#E5E5E5] h-[calc(100%-90px)] w-[calc(100%-256px)] px-6">
        <div className="pt-8 flex justify-between">
          <h1 className="text-xl font-bold">Lista de Usuários</h1>
          <button className="bg-[#feae00] text-sm text-white rounded-md px-4 py-4 ml-2 hover:bg-[#fe9000] focus:outline-none">
            ADICIONAR NOVO USUÁRIO
          </button>
        </div>
        <hr className="my-8 border-t-2" />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  align="left"
                  className="py-3 px-6 text-gray-600 border-b-8 border-[#E5E5E5] rounded-l-xl"
                >
                  Nome
                </th>
                <th
                  align="left"
                  className="py-3 px-6 text-gray-600 border-b-8 border-[#E5E5E5]"
                >
                  Email
                </th>
                <th
                  align="left"
                  className="py-3 px-6 text-gray-600 border-b-8 border-[#E5E5E5] rounded-l-xl"
                >
                  Telefone
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#f5f5f5]">
              <tr className="hover:bg-[#ffffff]">
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
                  João Silva
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
                  joao.silva@example.com
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
                  (11) 1234-5678
                </td>
              </tr>
              <tr className="hover:bg-[#ffffff]">
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
                  Maria Souza
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
                  maria.souza@example.com
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
                  (21) 9876-5432
                </td>
              </tr>
              <tr className="hover:bg-[#ffffff]">
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
                  Pedro Costa
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
                  pedro.costa@example.com
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
                  (31) 1234-9876
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
