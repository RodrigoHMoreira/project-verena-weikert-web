import React, { FC, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { UserType } from "../../interfaces/UserType";
import { apiClient } from "../../services/apiClient";

export interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const {
    userData,
    validationErrors,
    setValidationErrors,
    updateUserData,
    updatePhotoUrl,
  } = useUserContext();

  const [, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors([""]);
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updatePhotoUrl(imageUrl);
      setImageFile(file);
    }
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

    if (!body.url_image || body.url_image.trim() === "") {
      errors.push("Imagem");
    }

    if (!body.hs_password || body.hs_password.trim() === "") {
      errors.push("Senha");
    }

    return errors;
  };

  const handleSubmit: (e: any) => Promise<void> = async (e: any) => {
    e.preventDefault();
    const body = {
      nm_user: userData.name,
      ds_email: userData.email,
      nb_telephone: userData.telephone,
      url_image: userData.photoUrl,
      hs_password: userData.password,
    };

    const validationErrors = validateUserBody(body);

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      const response = await apiClient.post<UserType>("/users", body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-custom-gradient min-h-screen w-full flex justify-center items-center">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-96 m-6">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-[#F8D442] h-10 w-2 md:h-12 md:w-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">CRUD PROJECT</h1>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-lg md:text-xl font-bold">Registrar</h1>
            <span className="text-sm text-gray-600">
              Crie sua conta e comece a explorar
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                className="block w-full px-3 py-1.5 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-gray-300 rounded-md focus:outline-none sm:text-sm sm:leading-6"
                value={userData.name}
                onChange={handleChange}
              />
              {validationErrors.includes("Nome") && (
                <span className="text-red-600">O campo Nome está vazio!</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                E-mail
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                placeholder="name@example.com"
                value={userData.email}
                onChange={handleChange}
              />
              {validationErrors.includes("E-mail") && (
                <span className="text-red-600">O campo E-mail está vazio!</span>
              )}
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone
              </label>
              <input
                type="text"
                name="telephone"
                id="telephone"
                className="block w-full px-3 py-1.5 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-gray-300 rounded-md focus:outline-none sm:text-sm sm:leading-6"
                value={userData.telephone}
                onChange={handleChange}
              />
              {validationErrors.includes("Telefone") && (
                <span className="text-red-600">
                  O campo Telefone está vazio!
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Foto de perfil
              </label>
              <div className="flex items-center gap-x-3">
                <img
                  src={userData.photoUrl}
                  alt="Preview"
                  className="rounded-full w-12 h-12 md:w-16 md:h-16"
                />
                <label
                  htmlFor="photoUpload"
                  className="cursor-pointer inline-flex justify-center w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100"
                >
                  Mudar
                  <input
                    type="file"
                    id="photoUpload"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
                {validationErrors.includes("Imagem") && (
                  <span className="text-red-600">
                    O campo Imagem está vazio!
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleChange}
              />
              {validationErrors.includes("Senha") && (
                <span className="text-red-600">O campo Senha está vazio!</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
