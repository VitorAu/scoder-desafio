import { IoClose } from "react-icons/io5";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { FormEvent } from "react";

interface UserLoginModalProps {
  closeUserLoginModal: () => void;
  handleLogin: (userLogin: { user_email: string; user_password: string }) => void;
}

export function UserLoginModal({
  closeUserLoginModal,
  handleLogin,
}: UserLoginModalProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userLogin = {
      user_email: formData.get("email")?.toString().trim() || "",
      user_password: formData.get("password")?.toString().trim() || "",
    };

    if (!userLogin.user_email || !userLogin.user_password) {
      alert("Formulário incompleto.");
      return;
    }

    handleLogin(userLogin);
    closeUserLoginModal();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-[#151518] space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Login</span>
          <button type="button" onClick={closeUserLoginModal}>
            <IoClose className="size-5 text-white" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full space-y-5"
        >
          <div className="flex flex-col w-full items-center space-y-3">
            <Input
              placeholder="Digite o seu e-mail"
              name="email"
              type="email"
            />
            <Input
              placeholder="Digite a sua senha"
              name="password"
              type="password"
            />
          </div>
          <Button type="submit" size="full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
