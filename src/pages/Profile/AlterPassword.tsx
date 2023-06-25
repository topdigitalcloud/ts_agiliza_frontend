//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useState, useEffect } from "react";
import { useNotify } from "../../hooks/useNotify";
import { useNavigate } from "react-router-dom";

//redux

import { changePassword, profileSelector, reset } from "../../slices/ProfileSlice";

const AlterPassword = () => {
  const [password, setPassword] = useState<string>("234567");
  const [confirmPassword, setConfirmPassword] = useState<string>("234567");

  const dispatch = useAppDispatch();
  const notify = useNotify();
  const navigate = useNavigate();

  const { loading, error, success, message } = useAppSelector(profileSelector);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Gather user data from states
    const user = {
      password,
      confirmPassword,
    };
    dispatch(changePassword(user));
  };

  //show error message
  useEffect(() => {
    notify(message, "E");
  }, [error, message, notify]);

  //show success message and clean all auth states
  useEffect(() => {
    if (success) {
      notify("Senha alterada com sucesso", "S");
      navigate("/login");
      dispatch(reset());
    }
    return;
  }, [dispatch, success, notify, navigate]);

  return (
    <div className="flex w-full mt-4">
      <div className="w-full flex items-center justify-center">
        <div className="px-10 py-20 rounded-3xl border-2 border-gray-200  bg-white">
          <p className="text-top-digital text-4xl font-semibold pb-8 pt-2">Alteração de Senha</p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
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
                    Alterar
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
        </div>
      </div>
    </div>
  );
};

export default AlterPassword;
