import React from "react";
import LogoutIcon from "../assets/icons/LogoutIcon";

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 bg-[#F2EAE1] w-64 py-4 px-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div
            className="bg-[#F8D442] text-[#F8D442] "
            style={{ width: "0.5rem", height: "2.5rem" }}
          >
            _
          </div>
          <h1 className="text-xl font-bold">VERENA-WEIKERT</h1>
        </div>
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
            alt=""
            className="rounded-full w-[150px] h-[150px] mt-4"
          />
          <h4 className="font-bold">NOME DO USUÁRIO</h4>
          <p className="text-[#FEAF00]">atribuição</p>
        </div>
      </div>
      <div className="py-4 flex justify-center gap-3">
        <span>Sair</span>
        <LogoutIcon />
      </div>
    </div>
  );
};

export default Sidebar;
