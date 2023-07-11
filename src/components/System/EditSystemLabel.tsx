import React, { useEffect } from "react";
//context global
import { useGlobalContext } from "../../hooks/useGlobalContext";

//redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { systemSelector, setLabelSystem, resetSystemSlice } from "../../slices/SystemSlice";

type Props = {};

const EditSystemLabel = (props: Props) => {
  //context
  const { globalState, dispatchGlobalState } = useGlobalContext();

  //redux
  const dispatch = useAppDispatch();
  const { success: successSystem } = useAppSelector(systemSelector);

  /*Ini Formulário de Label do Sistema*/

  const submitHandleLabelSystem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: any = {
      labelSystem: globalState.labelSystem,
      idSystem: globalState.idSystem,
    };
    dispatch(setLabelSystem(data));
  };

  useEffect(() => {
    if (successSystem) {
      dispatchGlobalState({ type: "CLOSE_LABEL_SYSTEM_FORM" });
    }
    dispatch(resetSystemSlice());
  }, [successSystem, dispatch, globalState, dispatchGlobalState]);

  /*Fim Formulário de Label do Sistema*/

  return (
    <div className="absolute bg-white top-0 right-0 w-full h-full border">
      <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital text-lg">
        <div className="mx-auto w-full max-w-[550px] mb-6">
          <h2 className="font-top-digital-content font-normal text-top-digital-content-color">
            Adicione/Edite um apelido para o Sistema
            <span className="font-bold">
              {" "}
              {globalState.labelSystem && globalState.labelSystem !== ""
                ? globalState.labelSystem
                : globalState.idSystem}
            </span>
          </h2>
        </div>
        <div className="mx-auto w-full max-w-[550px]">
          <form encType="multipart/form-data" onSubmit={submitHandleLabelSystem}>
            <div className="mb-5">
              <label htmlFor="labelStation" className="mb-3 block text-base font-medium text-top-digital-content-color">
                Apelido para o Sistema
              </label>
              <input
                type="text"
                onChange={(e) => dispatchGlobalState({ type: "SET_LABEL_SYSTEM", labelSystem: e.target.value })}
                //onChange={(e) => setGlobalState({ ...globalState, labelSystem: e.target.value })}
                name="labelSystem"
                value={globalState.labelSystem}
                id="labelSystem"
                className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              />
            </div>
            <div>
              <div className="flex gap-1">
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-2 px-6 text-center text-base font-semibold text-white outline-none"
                >
                  Enviar
                </button>
                <button
                  className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-2 px-6 text-center text-base font-semibold text-white outline-none"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    //setGlobalState({ ...globalState, openedLabelSystemForm: false });
                    dispatchGlobalState({ type: "CLOSE_LABEL_SYSTEM_FORM" });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSystemLabel;
