import { useState } from "react";
import { Button } from "../../components/button";
import { UserLoginModal } from "./user-login-modal";
import { UserRegisterModal } from "./user-register-modal";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/axios";
import { registerUser } from "../../lib/axios";

export interface UserRegister {
  user_name: string;
  user_email: string;
  user_password: string;
}
export interface UserLogin {
  user_email: string;
  user_password: string;
}

export function LoginPage() {
  const [isUserLoginModalOpen, setIsUserLoginModalOpen] = useState(false);
  const [isUserRegisterModalOpen, setIsUserRegisterModalOpen] = useState(false);
  const [usersToRegister, setUsersToRegister] = useState<UserRegister[]>([
    {
      user_name: "Vítor Augusto",
      user_email: "vitor@teste.com",
      user_password: "12345",
    },
  ]);
  const navigate = useNavigate();

  function openUserLoginModal() {
    setIsUserLoginModalOpen(true);
  }
  function closeUserLoginModal() {
    setIsUserLoginModalOpen(false);
  }
  function openUserRegisterModal() {
    setIsUserRegisterModalOpen(true);
  }
  function closeUserRegisterModal() {
    setIsUserRegisterModalOpen(false);
  }
  async function handleLogin(userLogin: UserLogin) {
    try {
      const response = await loginUser(userLogin);
      if (response.message === 'Login successful!') {
        navigate("/transactions");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      alert("Error during login. Please try again.");
    }
  }
  async function handleCreateUser(userRegister: UserRegister) {
    try {
      await registerUser(userRegister);
      setUsersToRegister([...usersToRegister, userRegister]);
      closeUserRegisterModal();
    } catch (error) {
      alert("Error registering user. Please try again.");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center bg-cover">
      <div className="flex flex-col items-center space-y-5">
        <span className="text-5xl font-bold">
          Contabilidade <span className="text-[#7045ff]">eficiente</span>
        </span>
        <div className="flex flex-col space-y-3">
          <Button onClick={openUserLoginModal}>Login</Button>
          <Button onClick={openUserRegisterModal}>Cadastro</Button>
        </div>
      </div>

      {/* MODALS */}

      {isUserLoginModalOpen && (
        <UserLoginModal
          handleLogin={handleLogin}
          closeUserLoginModal={closeUserLoginModal}
        />
      )}

      {isUserRegisterModalOpen && (
        <UserRegisterModal
          handleCreateUser={handleCreateUser}
          closeUserRegisterModal={closeUserRegisterModal}
        />
      )}
    </div>
  );
}
