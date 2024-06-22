import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import AlertBox from "../../components/AlertBox";
import UserConfirmationModal from "../../components/UserConfirmationModal";
import UserModal from "../../components/UserModal";
import UserTable from "../../components/UserTable";
import { usePaginationContext } from "../../contexts/paginationContext";
import { useUserContext } from "../../contexts/userContext";
import { UserType } from "../../interfaces/UserType";
import { apiClient } from "../../services/apiClient";

const Home: React.FC = () => {
  const { userData, setValidationErrors, updateUserData } = useUserContext();

  const { currentPage, itemsPerPage, setTotalPages } = usePaginationContext();

  const [users, setUsers] = useState<UserType[]>([]);
  const [, setLoading] = useState<boolean>(false);

  const [openModalCreation, setOpenModalCreation] = useState<boolean>(false);
  const [openModalConfirmation, setOpenModalConfirmation] =
    useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>("");

  const [returnMessage, setReturnMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [typeAlert, setTypeAlert] = useState<"success" | "error">("success");

  const [search, setSearch] = useState<string>("");

  const toggleModalCreation = (id: string) => {
    setIdUser(id);
    setOpenModalCreation(!openModalCreation);
  };

  const toggleModalConfirmation = (id: string) => {
    setIdUser(id);
    setOpenModalConfirmation(!openModalConfirmation);
  };

  const getAllUsers: (
    page: number,
    limit: number,
    search: string
  ) => Promise<void> = async (page: number, limit: number, search: string) => {
    setLoading(true);
    try {
      const response = await apiClient.get<{
        items: UserType[];
        totalPages: number;
      }>("/users", {
        params: { page, limit, search },
      });

      const newResponse = response.data.items.map((item) => {
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
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById: (id: string) => Promise<void> = async (id: string) => {
    setLoading(true);
    try {
      const response = await apiClient.get<UserType>("/users", {
        params: { id },
      });
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

  const openModalAndResetUserData = () => {
    const resetUserData = {
      name: "",
      email: "",
      telephone: "",
      photoUrl:
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
      tp_user: "",
    };

    updateUserData(resetUserData);
    toggleModalCreation("");
  };

  const validateUserBody = (body: UserType): string[] => {
    const errors: string[] = [];

    if (!body.nm_user || body.nm_user.trim() === "") {
      errors.push("Nome");
    }
    if (!body.ds_email || body.ds_email.trim() === "") {
      errors.push("E-mail");
    }
    if (!body.nb_telephone || body.nb_telephone.trim() === "") {
      errors.push("Telefone");
    }

    return errors;
  };

  const createUser: (body: UserType) => Promise<void> = async (
    body: UserType
  ) => {
    const validationErrors = validateUserBody(body);

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await apiClient.post<UserType>("/users", body);
      const message = "Usuário criado com sucesso";
      setReturnMessage(message);
      setTypeAlert("success");
      handleShowAlert();

      getAllUsers(currentPage, itemsPerPage, "");
      setOpenModalCreation(!openModalCreation);
    } catch (error) {
      console.log(error);

      const message = "Ocorreu um erro para criar o usuário";
      setReturnMessage(message);
      setTypeAlert("error");
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };

  const updateUser: (id: string, body: UserType) => Promise<void> = async (
    id: string,
    body: UserType
  ) => {
    const validationErrors = validateUserBody(body);

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    const idInt = Number(id);
    setLoading(true);

    try {
      const response = await apiClient.put<UserType>(`/users/${id}`, body);
      setUsers((prevArray) =>
        prevArray.map((obj) =>
          obj.cd_user === idInt ? { ...obj, ...response.data } : obj
        )
      );
      const message = "Usuário alterado com sucesso";
      setReturnMessage(message);
      setTypeAlert("success");
      handleShowAlert();

      getAllUsers(currentPage, itemsPerPage, "");
      setOpenModalCreation(!openModalCreation);
    } catch (error) {
      console.log(error);

      const message = "Ocorreu um erro para alterar o usuário";
      setReturnMessage(message);
      setTypeAlert("error");
      handleShowAlert();

      setOpenModalCreation(!openModalCreation);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser: (id: string) => Promise<void> = async (id: string) => {
    setLoading(true);

    try {
      await apiClient.delete<UserType>(`/users/${id}`);
      const message = "Usuário apagado com sucesso";
      setReturnMessage(message);
      handleShowAlert();

      getAllUsers(currentPage, itemsPerPage, "");
      setOpenModalConfirmation(!openModalConfirmation);
    } catch (error) {
      console.log(error);

      const message = "Ocorreu um erro para apagar o usuário";
      setReturnMessage(message);
      setTypeAlert("error");
      handleShowAlert();

      setOpenModalConfirmation(!openModalConfirmation);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (id: string) => {
    const body = {
      nm_user: userData.name,
      ds_email: userData.email,
      nb_telephone: userData.telephone,
      url_image: userData.photoUrl,
      tp_user: "guest",
    };

    if (id === "") {
      createUser(body);
    } else {
      updateUser(id, body);
    }
  };

  const handleShowAlert = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    getAllUsers(1, itemsPerPage, value);
  };

  useEffect(() => {
    getAllUsers(currentPage, itemsPerPage, "");
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    getUserById(idUser);
  }, [idUser]);

  return (
    <div className="w-full flex-col flex justify-end items-end">
      <div className="w-[calc(100%-256px)] flex justify-end items-center p-3 bg-[#ffffff]">
        <div className="flex items-center border rounded-xl w-64 bg-[#ffffff] shadow-sm">
          <input
            type="text"
            placeholder="Buscar usuário"
            className="flex-grow px-4 py-2 rounded-xl focus:outline-none"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <SearchIcon />
        </div>
      </div>
      <div className="pt-[90px] w-[calc(100%-256px)] px-6">
        <div className="pt-8 flex justify-between">
          <h1 className="text-xl font-bold">Lista de Usuários</h1>
          <button
            className="bg-[#feae00] text-sm text-white rounded-md px-4 py-4 ml-2 hover:bg-[#fe9000] focus:outline-none"
            onClick={openModalAndResetUserData}
          >
            ADICIONAR NOVO USUÁRIO
          </button>
        </div>
        <hr className="my-8 border-t-2" />
        <UserTable
          dataUsers={users}
          toggleModalCreation={toggleModalCreation}
          toggleModalConfirmation={toggleModalConfirmation}
        />
      </div>
      {openModalCreation && (
        <UserModal
          handleSubmit={handleSubmit}
          toggleModal={toggleModalCreation}
          idUser={idUser}
        />
      )}
      {openModalConfirmation && (
        <UserConfirmationModal
          handleSubmit={deleteUser}
          toggleModal={toggleModalConfirmation}
          idUser={idUser}
        />
      )}
      {showAlert && (
        <AlertBox returnMessage={returnMessage} variant={typeAlert} />
      )}
    </div>
  );
};

export default Home;
