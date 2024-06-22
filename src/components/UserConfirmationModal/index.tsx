import UserCreationForm from "../UserForm";

export interface UserConfirmationModalProps {
  idUser: string;
  toggleModal: (id: string) => void;
  handleSubmit: (id: string) => void;
}

const UserConfirmationModal = ({
  idUser,
  toggleModal,
  handleSubmit,
}: UserConfirmationModalProps) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="mt-2">
                    Deseja realmente apagar esse usuário?
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-between w-full sm:px-6">
              <button
                onClick={() => handleSubmit(idUser)}
                className="inline-flex w-full justify-center rounded-md bg-[#feae00]  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#fe9000] sm:ml-3 sm:w-auto"
              >
                Apagar
              </button>
              <button
                onClick={() => toggleModal("")}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConfirmationModal;
