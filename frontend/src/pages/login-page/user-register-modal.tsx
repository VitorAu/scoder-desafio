import { IoClose } from "react-icons/io5";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { FormEvent } from "react";
import { UserRegister } from ".";

interface UserRegisterModalProps {
  closeUserRegisterModal: () => void;
  handleCreateUser: (user: UserRegister) => Promise<void>;
}

export function UserRegisterModal({
  closeUserRegisterModal,
  handleCreateUser,
}: UserRegisterModalProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userRegister = {
      user_name: formData.get("name")?.toString().trim() || "",
      user_email: formData.get("email")?.toString().trim() || "",
      user_password: formData.get("password")?.toString().trim() || "",
    };

    if (!userRegister.user_name || !userRegister.user_email || !userRegister.user_password) {
      alert("Formulário incompleto");
      return;
    }

    try {
      await handleCreateUser(userRegister);
      closeUserRegisterModal();
    } catch (error) {
      alert("Erro ao registrar usuário. Tente novamente.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-[#151518] space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Cadastro</span>
          <button type="button" onClick={closeUserRegisterModal}>
            <IoClose className="size-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-5">
          <div className="flex flex-col w-full items-center space-y-3">
            <Input placeholder="Nome de usuário" name="name" />
            <Input placeholder="E-mail" name="email" type="email" />
            <Input placeholder="Senha" name="password" type="password" />
          </div>
          <Button type="submit" size="full">Cadastrar</Button>
        </form>
      </div>
    </div>
  );
}
