//componnents
import { Link } from "react-router-dom";

//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../../hooks/useNotify";

//types

import { TRegisterFields } from "../../Interfaces/IRegisterStates";

//redux

import { register, reset, registerSelector } from "../../slices/RegisterSlice";

const numRand: string = String(Math.floor(Math.random() * 10000));

const Register = () => {
  const [name, setName] = useState(`Usuário de Teste ${numRand}`);
  const [email, setEmail] = useState(`user${numRand}@example.com`);
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  const navigate = useNavigate();
  const notify = useNotify();
  const dispatch = useAppDispatch();

  const { loading, error, success } = useAppSelector(registerSelector);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: TRegisterFields = {
      name,
      email,
      password,
      confirmPassword,
    };
    dispatch(register(user));
  };

  //show error message
  useEffect(() => {
    notify(error, "E");
  }, [error, notify]);

  //show success message and clean all auth states
  useEffect(() => {
    if (success) {
      notify("Registro feito com sucesso", "S");
      navigate("/login");
      dispatch(reset());
    }
    return;
  }, [dispatch, success, navigate, notify]);

  return (
    <div className="flex w-full mt-4">
      <div className="w-full flex items-center justify-center">
        <div className="px-10 py-20 rounded-3xl border-2 border-gray-200  bg-white">
          <p className="text-top-digital text-4xl font-semibold pb-8 pt-2">
            Cadastre-se no Agiliza
          </p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="py-2">
                <label className="text-lg font-medium">
                  Nome:
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <div className="py-2">
                <label className="text-lg font-medium">
                  E-mail
                  <input
                    type="email"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="E-mail"
                    name="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="py-2">
                <label className="text-lg font-medium">
                  Senha:
                  <input
                    type="password"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Senha"
                    name="password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="py-2">
                <label className="text-lg font-medium">
                  Confirme a Senha:
                  <input
                    type="password"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Confirme a Senha"
                    name="confirmPassword"
                    value={confirmPassword || ""}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-col gap-y-4">
                {!loading && (
                  <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-top-digital text-white text-lg font-bold"
                  >
                    Cadastrar
                  </button>
                )}
                {loading && (
                  <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-top-digital text-white text-lg font-bold">
                    Aguarde...
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="text-center text-top-digital font-semibold">
            <p>
              Já tem conta?{" "}
              <Link to="/login" className="hover:text-top-digital-hover">
                Faça seu Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
