import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { useUserContext } from "../../contexts/userContext";



export interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { userData, validationErrors, setValidationErrors, updateUserData } =
    useUserContext();

  const { login, isAuthenticated } = useAuthContext();
  const navegate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors([""]);
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleSubmit: (e: any) => Promise<void> = async (e: any) => {
    e.preventDefault();
    login();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navegate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-custom-gradient min-h-screen w-full flex justify-center items-center">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-96 m-6">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-[#F8D442] h-10 w-2 md:h-12 md:w-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">CRUD PROJECT</h1>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-lg md:text-xl font-bold">Login</h1>
            <span className="text-sm text-gray-600">
              Faça login para continuar.
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                E-mail
              </label>
              <input
                type="email"
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
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Password
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
            <button
              type="submit"
              className="w-full bg-[#FEAF00] text-white hover:bg-[#fe9000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Sign in
            </button>
            <p className="text-sm text-gray-500 text-center">
              Ainda não tem uma conta?
              <br />
              <a
                href="/register"
                className="text-[#feae00] font-semibold hover:underline"
              >
                Inscrever-se
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
