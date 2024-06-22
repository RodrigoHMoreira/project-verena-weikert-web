import React, { useEffect, useState } from "react";
import SearchHeader from "../../components/SearchHeader";
import UserCreationModal from "../../components/UserCreationModal";
import UserTable from "../../components/UserTable";
import { UserType } from "../../interfaces/UserType";
import { apiClient } from "../../services/apiClient";

const Home: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getAllUsers: () => Promise<void> = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<UserType[]>("/users");
      const newResponse = response.data.map((item) => {
        return {
          cd_user: item.cd_user,
          nm_user: item.nm_user,
          ds_email: item.ds_email,
          nb_telephone: item.nb_telephone,
          url_image: item.url_image,
          tp_user: item.tp_user,
        };
      });

      setUsers(newResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createUser: (body: UserType) => Promise<void> = async (
    body: UserType
  ) => {
    setLoading(true);

    try {
      await apiClient.post<UserType>("/users", body);
      getAllUsers();
      toggleModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    console.log(openModal);
  }, [openModal]);

  return (
    <div className="w-full flex-col flex justify-end items-end">
      <div className="w-[calc(100%-256px)] flex justify-end items-center p-3">
        <SearchHeader />
      </div>
      <div className="bg-[#E5E5E5] pt-[90px] w-[calc(100%-256px)] px-6">
        <div className="pt-8 flex justify-between">
          <h1 className="text-xl font-bold">Lista de Usuários</h1>
          <button
            className="bg-[#feae00] text-sm text-white rounded-md px-4 py-4 ml-2 hover:bg-[#fe9000] focus:outline-none"
            onClick={() => {
              toggleModal();
            }}
          >
            ADICIONAR NOVO USUÁRIO
          </button>
        </div>
        <hr className="my-8 border-t-2" />
        <UserTable dataUsers={users} />
      </div>
      {openModal && (
        <UserCreationModal createUser={createUser} toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default Home;
