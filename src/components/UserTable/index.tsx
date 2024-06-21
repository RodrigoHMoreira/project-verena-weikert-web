import React, { FC } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import UpdateIcon from "../../assets/icons/UpdateIcon";

export interface UserTableProps {}

const UserTable: FC<UserTableProps> = () => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th
              align="left"
              className="py-3 px-6 text-gray-600 border-b-8 border-[#E5E5E5] rounded-l-xl"
            ></th>
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
            <th
              align="left"
              className="py-3 px-6 text-gray-600 border-b-8 border-[#E5E5E5] rounded-l-xl"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-[#f5f5f5]">
          <tr className="hover:bg-[#ffffff]">
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                alt=""
                className="rounded-full w-[50px] h-[50px] mt-4"
              />
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              João Silva
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              joao.silva@example.com
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              (11) 1234-5678
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    console.log("alterar");
                  }}
                >
                  <UpdateIcon />
                </button>
                <button
                  onClick={() => {
                    console.log("deletar");
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-[#ffffff]">
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                alt=""
                className="rounded-full w-[50px] h-[50px] mt-4"
              />
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              João Silva
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              joao.silva@example.com
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              (11) 1234-5678
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    console.log("alterar");
                  }}
                >
                  <UpdateIcon />
                </button>
                <button
                  onClick={() => {
                    console.log("deletar");
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-[#ffffff]">
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                alt=""
                className="rounded-full w-[50px] h-[50px] mt-4"
              />
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              João Silva
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              joao.silva@example.com
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
              (11) 1234-5678
            </td>
            <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    console.log("alterar");
                  }}
                >
                  <UpdateIcon />
                </button>
                <button
                  onClick={() => {
                    console.log("deletar");
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
