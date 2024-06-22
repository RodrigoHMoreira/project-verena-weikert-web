import { FC } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import UpdateIcon from "../../assets/icons/UpdateIcon";
import { UserType } from "../../interfaces/UserType";
import Pagination from "../Pagination";

export interface UserTableProps {
  dataUsers: UserType[];
  toggleModalCreation: (id: string) => void;
  toggleModalConfirmation: (id: string) => void;
}

const UserTable: FC<UserTableProps> = ({
  dataUsers,
  toggleModalCreation,
  toggleModalConfirmation,
}: UserTableProps) => {
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
          {dataUsers.map((item: UserType, index: number) => {
            return (
              <tr key={index} className="hover:bg-[#ffffff]">
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-l-xl">
                  <img
                    src={item.url_image}
                    alt={`user: ${item.nm_user}`}
                    className="rounded-full w-[50px] h-[50px] mt-4"
                  />
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
                  {item.nm_user}
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
                  {item.ds_email}
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5]">
                  {item.nb_telephone}
                </td>
                <td className="py-4 px-6 border-b-8 border-[#E5E5E5] rounded-r-xl">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        toggleModalCreation(String(item.cd_user));
                      }}
                    >
                      <UpdateIcon />
                    </button>
                    <button
                      onClick={() => {
                        toggleModalConfirmation(String(item.cd_user));
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination totalIndexes={dataUsers.length} />
    </div>
  );
};

export default UserTable;
