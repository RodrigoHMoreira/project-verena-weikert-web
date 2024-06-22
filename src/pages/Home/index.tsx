import React, { useContext, useEffect, useState } from "react";
import SearchHeader from "../../components/SearchHeader";
import UserCreationModal from "../../components/UserCreationModal";
import UserTable from "../../components/UserTable";
import { UserContext } from "../../contexts/userContext";
import { UserType } from "../../interfaces/UserType";
import { apiClient } from "../../services/apiClient";

const Home: React.FC = () => {
  const { userData, updateUserData } = useContext(UserContext);

  const [users, setUsers] = useState<UserType[]>([]);
  const [, setLoading] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>("");

  const toggleModal = (id: string) => {
    setIdUser(id);
    setOpenModal(!openModal);
  };

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

  const getUserById: (id: string) => Promise<void> = async (id: string) => {
    setLoading(true);
    try {
      const response = await apiClient.get<UserType>(`/users/${id}`);
      const newResponse = {
        name: response.data.nm_user,
        email: response.data.ds_email,
        telephone: response.data.nb_telephone,
        photoUrl: response.data.url_image,
        tp_user: response.data.tp_user,
      };

      updateUserData(newResponse);
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
      setOpenModal(!openModal);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser: (id: string, body: UserType) => Promise<void> = async (
    id: string,
    body: UserType
  ) => {
    const idInt = Number(id);
    setLoading(true);

    try {
      const response = await apiClient.put<UserType>(`/users/${id}`, body);
      setUsers((prevArray) =>
        prevArray.map((obj) =>
          obj.cd_user === idInt ? { ...obj, ...response.data } : obj
        )
      );
      getAllUsers();
      setOpenModal(!openModal);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (id: string) => {
    const body = {
      nm_user: userData.name,
      ds_email: userData.email,
      nb_telephone: userData.telephone,
      url_image: userData.photoUrl.replace("blob:", ""),
      tp_user: "guest",
    };

    if (id === "") {
      createUser(body);
    } else {
      updateUser(id, body);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getUserById(idUser);
  }, [idUser]);

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
              toggleModal("");
            }}
          >
            ADICIONAR NOVO USUÁRIO
          </button>
        </div>
        <hr className="my-8 border-t-2" />
        <UserTable dataUsers={users} toggleModal={toggleModal} />
      </div>
      {openModal && (
        <UserCreationModal
          handleSubmit={handleSubmit}
          toggleModal={toggleModal}
          idUser={idUser}
        />
      )}
    </div>
  );
};

export default Home;
