//componnents
import Message from "../../components/Message";

//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useState, useEffect } from "react";
import { useNotify } from "../../hooks/useNotify";

//redux

import {
  profile,
  update,
  reset,
  profileSelector,
} from "../../slices/ProfileSlice";

const MyProfile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const dispatch = useAppDispatch();
  const notify = useNotify();

  const { user, loading, error, success } = useAppSelector(profileSelector);

  //load user data

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Gather user data from states
    const user = {
      name,
      email,
    };
    dispatch(update(user));
  };

  //show error message
  useEffect(() => {
    notify(error, "E");
  }, [error, notify]);

  //show success message and clean all auth states
  useEffect(() => {
    if (success) {
      notify("Perfil atualizado com sucesso", "S");
    }
    dispatch(reset());
    return;
  }, [dispatch, success, notify]);

  return (
    <div className="flex w-full mt-4">
      <div className="w-full flex items-center justify-center">
        <div className="px-10 py-20 rounded-3xl border-2 border-gray-200  bg-white">
          <p className="text-top-digital text-4xl font-semibold pb-8 pt-2">
            Meu perfil
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
                    readOnly
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-col gap-y-4">
                {!loading && (
                  <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-top-digital text-white text-lg font-bold"
                  >
                    Atualizar
                  </button>
                )}
                {loading && (
                  <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-top-digital text-white text-lg font-bold">
                    Aguarde...
                  </button>
                )}
              </div>
              <div className="h-12 flex justify-center  text-red-800 items-center">
                {error && <Message msg={error} type="error" />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
