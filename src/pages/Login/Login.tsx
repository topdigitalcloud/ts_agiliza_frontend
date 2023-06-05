//import "./Auth.css"

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//Hooks
import { useState, useEffect, FormEvent } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useNotify } from "../../hooks/useNotify";

//Redux
import { login, reset, loginSelector } from "../../slices/LoginSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("topdigitalcloud@gmail.com");
  const [password, setPassword] = useState<string>("234567");

  const dispatch = useAppDispatch();
  const notify = useNotify();

  //const { loading, error } = useSelector((state: ILoginStates) => state.auth);

  const { loading, error } = useAppSelector(loginSelector);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  //show error message
  useEffect(() => {
    notify(error, "E");
  }, [error, notify]);

  //clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-5xl font-semibold text-top-digital">Bem Vindo</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Entre com suas credenciais do Agiliza
          </p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-lg font-medium">
                  E-mail
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    type="email"
                    placeholder="insira o seu e-mail de acesso"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ""}
                  />
                </label>
              </div>
              <div className="mt-4">
                <label className="text-lg font-medium">
                  Password
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    type="password"
                    placeholder="insira a sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ""}
                  />
                </label>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <button className="font-medium text-base text-top-digital">
                  Esqueci minha senha
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                {!loading && (
                  <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-top-digital text-white text-lg font-bold"
                  >
                    Acessar
                  </button>
                )}
                {loading && (
                  <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-top-digital text-white text-lg font-bold disabled:opacity-75"
                  >
                    Aguarde....
                  </button>
                )}
              </div>
              <div className="mt-3 text-red-700">
                {error && typeof error === "string" && (
                  <Message msg={error} type="error" />
                )}
              </div>
            </form>
          </div>
          <div className="mt-8  text-center text-top-digital font-semibold">
            <p>
              Não tem conta?{" "}
              <Link to="/register" className="hover:text-top-digital-hover">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <img
          src="/img/img-top-1536x1536.png"
          alt=""
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Login;
