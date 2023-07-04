//hooks
import { useEffect, useState } from "react";
import { useNotify } from "../../hooks/useNotify";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//redux

import {
  docTypeSelector,
  deleteDocType,
  insertDocType,
  getDocTypes,
  updateDocType,
} from "../../slices/DocumentTypeSlice";

//icons
import { Edit, X } from "lucide-react";
import { TDocType } from "../../Interfaces/IDocType";

type Props = {};

const DocType = (props: Props) => {
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const [docLoading] = useState<boolean>(false);
  const [openedForm, setOpenedForm] = useState<boolean>(false);
  const [idLabel, setIdLabel] = useState<string>("");
  const [typeName, setTypeName] = useState<string>("");
  const [toStation, setToStation] = useState<boolean>(false);
  const [toSystem, setToSystem] = useState<boolean>(false);
  const [isRequired, setIsRequired] = useState<boolean>(false);

  function toggle(value: boolean): boolean {
    return !value;
  }

  const { success, docTypes } = useAppSelector(docTypeSelector);

  useEffect(() => {
    dispatch(getDocTypes());
  }, [dispatch, success]);

  const handleFormEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, doc: TDocType) => {
    setOpenedForm(true);
    setIdLabel(doc._id);
    setTypeName(doc.typeName);
    setToStation(doc.toStation);
    setToSystem(doc.toSystem);
    setIsRequired(doc.isRequired);
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, doc: TDocType) => {
    e.preventDefault();
    dispatch(deleteDocType(doc._id));
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeName === "") {
      notify("Por favor preencha um título", "E");
      return;
    }

    if (!toStation && !toSystem) {
      notify("Você deve indicar uma destinação para o documento", "E");
      return;
    }

    if (idLabel === "") {
      const data = {
        typeName,
        toStation,
        toSystem,
        isRequired,
      };
      dispatch(insertDocType(data));
    } else {
      const data = {
        id: idLabel,
        typeName,
        toStation,
        toSystem,
        isRequired,
      };
      dispatch(updateDocType(data));
    }

    setOpenedForm(false);
    setIdLabel("");
    setTypeName("");
    setToStation(false);
    setToSystem(false);
    setIsRequired(false);
  };

  return (
    <div className="flex">
      <div className="bg-white border p-2 m-2 w-1/2 mx-auto h-[50vh]  order-1 md:order-2">
        {docLoading ? (
          <p>Aguarde....</p>
        ) : (
          <>
            <h1 className="text-3xl text-top-digital font-semibold mb-2 font-top-digital-title">Tipos de Documentos</h1>
            {!openedForm && (
              <button
                className="rounded-md bg-top-digital py-3 px-8 text-center text-base font-normal font-top-digital-title text-white hover:text-top-digital-buttom-hover outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenedForm(true);
                }}
              >
                Cadastrar
              </button>
            )}

            {openedForm && (
              <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital text-lg">
                {/* <div className="mx-auto w-full max-w-[550px] mb-6">
                <h2 className="font-top-digital-content font-normal text-top-digital-content-color">
                  Upload de documentação relacionada ao Site
                  <span className="font-bold"> {station && station._id}</span>
                </h2>
              </div> */}
                <div className="mx-auto w-full max-w-[550px]">
                  <form onSubmit={submitHandle}>
                    <div className="flex gap-3 items-center mb-4">
                      <label
                        htmlFor="typeName"
                        className="mb-3 block text-base font-medium text-top-digital-content-color"
                      >
                        Tipo de Documento
                      </label>
                      <input
                        type="text"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        name="typeName"
                        id="typeName"
                        className="w-1/3 appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                      <label htmlFor="toStation" className="text-base font-medium text-top-digital-content-color">
                        Documento de Estação
                      </label>
                      <input
                        type="checkbox"
                        checked={toStation}
                        name="toStation"
                        id="toStation"
                        onChange={() => setToStation(toggle)}
                        className=""
                      />
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                      <label htmlFor="toSystem" className="text-base font-medium text-top-digital-content-color">
                        Documento de Sistema
                      </label>
                      <input
                        type="checkbox"
                        checked={toSystem}
                        name="toSystem"
                        id="toSystem"
                        onChange={() => setToSystem(toggle)}
                        className=""
                      />
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                      <label htmlFor="isRequired" className="text-base font-medium text-top-digital-content-color">
                        Documento Obrigatório
                      </label>
                      <input
                        type="checkbox"
                        checked={isRequired}
                        name="isRequired"
                        id="isRequired"
                        onChange={() => setIsRequired(toggle)}
                        className=""
                      />
                    </div>
                    <div>
                      <div className="flex gap-1">
                        <button
                          type="submit"
                          className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                          Enviar
                        </button>
                        <button
                          className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenedForm(false);
                            setIdLabel("");
                            setTypeName("");
                            setToStation(false);
                            setToSystem(false);
                            setIsRequired(false);
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {docTypes && docTypes.length !== 0 && (
              <div className="bg-white p-2 m-2 flex-1 order-2 md:order-1 overflow-x-auto">
                <div className="grid grid-cols-6 text-top-digital-content-color">
                  <div className="bg-top-digital-op-25 font-semibold">Tipo do Documento</div>
                  <div className="bg-top-digital-op-25 font-semibold">Estação</div>
                  <div className="bg-top-digital-op-25 font-semibold">Sistema</div>
                  <div className="bg-top-digital-op-25 font-semibold">Obrigatório</div>
                  <div className="bg-top-digital-op-25 font-semibold">Editar</div>
                  <div className="bg-top-digital-op-25 font-semibold">Remover</div>
                </div>
                {docTypes &&
                  docTypes.map((doc, index) => (
                    <div key={`${index}`} className="grid grid-cols-6 border border-top-digital-op-25">
                      <div
                        className={`${
                          !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                        } text-top-digital-content-color p-1`}
                      >
                        {doc.typeName}
                      </div>
                      <div
                        className={`${
                          !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                        } text-top-digital-content-color p-1`}
                      >
                        {doc.toStation ? <>Sim</> : <>Não</>}
                      </div>
                      <div
                        className={`${
                          !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                        } text-top-digital-content-color p-1`}
                      >
                        {doc.toSystem ? <>Sim</> : <>Não</>}
                      </div>
                      <div
                        className={`${
                          !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                        } text-top-digital-content-color p-1`}
                      >
                        {doc.isRequired ? <>Sim</> : <>Não</>}
                      </div>
                      <div
                        className={`${
                          !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                        } text-top-digital-content-color p-1`}
                      >
                        <Edit className="cursor-pointer" onClick={(e) => handleFormEdit(e, doc)} />
                      </div>
                      <div
                        className={`${
                          !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                        } text-top-digital-content-color p-1`}
                      >
                        <X className="cursor-pointer" onClick={(e) => handleDelete(e, doc)} />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DocType;
