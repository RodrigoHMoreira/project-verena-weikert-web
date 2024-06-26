import React, { FC, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { formatTelephone } from "../../helpers/utils";

export interface UserFormModalProps {}

const UserFormModal: FC<UserFormModalProps> = () => {
  const {
    userData,
    validationErrors,
    setValidationErrors,
    updateUserData,
    updatePhotoUrl,
  } = useUserContext();

  const [, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataType: "name" | "email" | "telephone"
  ) => {
    setValidationErrors([""]);
    const { name, value } = e.target;

    if (dataType === "telephone") {
      const formattedValue = formatTelephone(value);

      updateUserData({ [name]: formattedValue });
    } else {
      updateUserData({ [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updatePhotoUrl(imageUrl);
      setImageFile(file);
    }
  };

  return (
    <form>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nome
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              value={userData.name}
              onChange={(e) => handleChange(e, "name")}
            />
            {validationErrors.includes("Nome") && (
              <span className="text-red-600">O campo Nome está vazio!</span>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            E-mail
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              value={userData.email}
              onChange={(e) => handleChange(e, "email")}
            />
            {validationErrors.includes("E-mail") && (
              <span className="text-red-600">O campo E-mail está vazio!</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="telefone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Telefone
          </label>
          {validationErrors.includes("Telefone") && (
            <span className="text-red-600">O campo E-Telefone está vazio!</span>
          )}
          <div className="mt-2">
            <input
              type="text"
              name="telephone"
              id="telephone"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              value={userData.telephone}
              onChange={(e) => handleChange(e, "telephone")}
            />
          </div>
        </div>
        <div className="sm:col-span-3 flex justify-center">
          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <img
                src={userData.photoUrl}
                alt="Preview"
                className="rounded-full w-[50px] h-[50px]"
              />
              <label
                htmlFor="photoUpload"
                className="cursor-pointer mt-3 inline-flex justify-center w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
              >
                Mudar
                <input
                  type="file"
                  id="photoUpload"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserFormModal;
