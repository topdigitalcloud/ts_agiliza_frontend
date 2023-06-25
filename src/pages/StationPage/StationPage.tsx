import { useParams } from "react-router-dom";

//hooks
import { useEffect, useState, useContext } from "react";
import { useNotify } from "../../hooks/useNotify";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//redux
import { reset, getStationDocs, documentSelector, insertDoc, downloadDoc } from "../../slices/DocumentSlice";
import {
  getStationById,
  stationSelector,
  setLabelStation as setLabelSliceStation,
  reset as resetSliceStation,
} from "../../slices/StationSlice";
import { getConfig, configSelector } from "../../slices/ConfigStationSlice";
import {
  systemSelector,
  setLabelSystem as setSystemSliceStation,
  reset as resetSliceSystem,
} from "../../slices/SystemSlice";
import { getDocTypes, docTypeSelector } from "../../slices/DocumentTypeSlice";

//context
import { ContextSystem } from "../../contexts/ContextSystem";

//types
import DateFormat from "../../components/DateFormat";
import { LabelSystem } from "../../contexts/ContextSystem";

//icons
import { Download, Link } from "lucide-react";
import DocIcon from "../../components/DocIcon";
import { TDocument } from "../../Interfaces/IDocument";
import { TStation } from "../../Interfaces/IStation";

//pages
import System from "../System/System";
import SystemLinkDocument from "../System/SystemLinkDocument";

type Props = {};

const StationPage = (props: Props) => {
  //Notify
  const notify = useNotify();

  const { id } = useParams();

  const dispatchStation = useAppDispatch();
  const dispatchSystem = useAppDispatch();
  const dispatchConfig = useAppDispatch();
  const dispatchTypes = useAppDispatch();
  const { config } = useAppSelector(configSelector);
  //get doc types to fill form to upload document
  const { docTypes } = useAppSelector(docTypeSelector);

  /*Inicio Formulário de Vinculação dos Sistemas*/
  const [openSystemLinkForm, setOpenSystemLinkForm] = useState<boolean>(false);
  //const [stationId, setStationId] = useState<string | undefined>("");
  const [documentId, setDocumentId] = useState<string>("");
  const handleOpenFormLinkSystem = (idDocument: string) => {
    setOpenSystemLinkForm(true);
    //setStationId(idStation);
    setDocumentId(idDocument);
  };
  /*Fim Formulário de Vinculação dos Sistemas*/

  //Extract context with initial state bellow
  /* 
  openedLabelSystemForm: false,
  labelStation: "",
  idSystem: "",  
  */
  const { success: successSystem } = useAppSelector(systemSelector);
  const { labelSystem, setLabelSystem } = useContext<LabelSystem>(ContextSystem);
  const submitHandleLabelSystem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: any = {
      labelSystem: labelSystem.labelSystem,
      idSystem: labelSystem.idSystem,
    };
    dispatchSystem(setSystemSliceStation(data));
  };

  useEffect(() => {
    if (successSystem) {
      setLabelSystem({ ...labelSystem, openedLabelSystemForm: false });
    }
    dispatchStation(resetSliceSystem());
  }, [successSystem, dispatchStation, setLabelSystem, labelSystem]);

  /*Fim Formulário de Label do Sistema*/

  /*Inicio Formulário de Label da Estação*/
  const { station, success } = useAppSelector(stationSelector);
  const [openedLabelStationForm, setOpenedLabelStationForm] = useState<boolean>(false);
  const [labelStation, setLabelStation] = useState<string>("");
  const submitHandleLabelStation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: any = {
      labelStation,
      idStation: station!._id,
    };

    dispatchStation(setLabelSliceStation(data));
  };

  useEffect(() => {
    if (success) {
      setOpenedLabelStationForm(false);
    }
    dispatchStation(resetSliceStation());
  }, [success, dispatchStation]);

  /*Fim Formulário de Label da Estação*/

  /*Inicio Formulário de Documentos*/
  const {
    documents,
    error: docError,
    message: docMessage,
    success: docSuccess,
    loading: docLoading,
  } = useAppSelector(documentSelector);
  const [formdocument, setFormDocument] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [docTypeId, setDocTypeId] = useState<string>("0");
  const [openedUploadForm, setOpenedUploadForm] = useState<boolean>(false);
  const dispatchDocument = useAppDispatch();
  useEffect(() => {
    dispatchDocument(getStationDocs(id));
  }, [id, dispatchDocument, docSuccess]);

  const submitDownload = (e: React.MouseEvent<HTMLDivElement>, doc: TDocument) => {
    e.preventDefault();
    dispatchDocument(downloadDoc(doc));
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //build form data
    if (formdocument) {
      const formData = new FormData();
      formData.append("stationId", station!._id);
      formData.append("title", title);
      formData.append("systemId", "");
      formData.append("typeId", docTypeId);
      formData.append("document", formdocument, formdocument.name);
      if (!title) {
        notify("Favor inserir um título para o documento", "E");
        return;
      }
      dispatchDocument(insertDoc(formData));

      if (docSuccess) {
        const timer = setTimeout(() => {
          dispatchDocument(reset());
        }, 2000);

        return () => clearTimeout(timer);
      }
    } else {
      notify("Favor Selecionar um arquivo", "E");
    }
  };

  useEffect(() => {
    if (docError) {
      alert(docError);
      notify(docMessage, "E");
      dispatchDocument(reset());
    }

    if (docSuccess) {
      notify("Arquivo inserido com sucesso", "S");
      setOpenedUploadForm(false);
      dispatchDocument(reset());
    }
  }, [docSuccess, docError, docMessage, dispatchDocument, notify]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = e?.target?.files?.[0];
    if (!doc) return;
    setFormDocument(doc);
  };

  /*Fim Formulário de Documentos*/

  useEffect(() => {
    dispatchConfig(getConfig());
  }, [dispatchConfig]);

  useEffect(() => {
    dispatchTypes(getDocTypes());
  }, [dispatchTypes]);

  useEffect(() => {
    dispatchStation(getStationById(id));
  }, [id, dispatchStation, success]);

  return (
    <div className="flex justify-center items-center container mx-auto">
      <div className="flex-1 w-full">
        <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap ">
          <div className="bg-white m-2 flex-1 order-2 md:order-1 overflow-x-auto relative">
            {config &&
              station &&
              config.map((conf, index) => (
                <div key={`label${index}`} className="grid grid-cols-2 ">
                  <div
                    className={`${
                      index % 2 ? "bg-white" : "bg-top-digital-op-25"
                    } font-semibold text-top-digital-content-color font-top-digital-content`}
                  >
                    {conf.campo === "Label" && (
                      <button
                        className="underline hover:text-top-digital-link-hover"
                        title="Coloque um apelido na Estação"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenedLabelStationForm(true);
                          setLabelStation(station[conf.campo as keyof TStation]);
                        }}
                      >
                        {conf.label}
                      </button>
                    )}
                    {conf.campo !== "Label" && <>{conf.label}</>}
                  </div>
                  <div
                    className={`${
                      index % 2 ? "bg-white" : "bg-top-digital-op-25"
                    } text-top-digital-content-color font-normal font-top-digital-content`}
                  >
                    {station[conf.campo as keyof TStation]}
                  </div>
                </div>
              ))}
            {openSystemLinkForm && (
              <div className="absolute bg-white top-0 right-0 w-full h-full border">
                <SystemLinkDocument
                  setOpenSystemLinkForm={setOpenSystemLinkForm}
                  stationId={id}
                  documentId={documentId}
                />
              </div>
            )}
            {station && openedLabelStationForm && (
              <div className="absolute bg-white top-0 right-0 w-full h-full border">
                <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital text-lg">
                  <div className="mx-auto w-full max-w-[550px] mb-6">
                    <h2 className="font-top-digital-content font-normal text-top-digital-content-color">
                      Adicione/Edite um apelido para a estação
                      <span className="font-bold"> {station && station.EnderecoEstacao}</span>
                    </h2>
                  </div>
                  <div className="mx-auto w-full max-w-[550px]">
                    <form encType="multipart/form-data" onSubmit={submitHandleLabelStation}>
                      <div className="mb-5">
                        <label
                          htmlFor="labelStation"
                          className="mb-3 block text-base font-medium text-top-digital-content-color"
                        >
                          Apelido da Estação
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setLabelStation(e.target.value)}
                          name="labelStation"
                          value={labelStation}
                          id="labelStation"
                          className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
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
                              setOpenedLabelStationForm(false);
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
            )}
            {station && labelSystem.openedLabelSystemForm && (
              <div className="absolute bg-white top-0 right-0 w-full h-full border">
                <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital text-lg">
                  <div className="mx-auto w-full max-w-[550px] mb-6">
                    <h2 className="font-top-digital-content font-normal text-top-digital-content-color">
                      Adicione/Edite um apelido para o Sistema
                      <span className="font-bold"> {labelSystem.openedLabelSystemForm && labelSystem.idSystem}</span>
                    </h2>
                  </div>
                  <div className="mx-auto w-full max-w-[550px]">
                    <form encType="multipart/form-data" onSubmit={submitHandleLabelSystem}>
                      <div className="mb-5">
                        <label
                          htmlFor="labelStation"
                          className="mb-3 block text-base font-medium text-top-digital-content-color"
                        >
                          Apelido da Estação
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setLabelSystem({ ...labelSystem, labelSystem: e.target.value })}
                          name="labelSystem"
                          value={labelSystem.labelSystem}
                          id="labelSystem"
                          className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
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
                              setLabelSystem({ ...labelSystem, openedLabelSystemForm: false });
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
            )}
          </div>
          <div className="bg-white border p-2 m-2 flex-1 order-1 md:order-2">
            {docLoading ? (
              <p>Aguarde....</p>
            ) : (
              <>
                <h1 className="text-3xl text-top-digital font-semibold mb-2 font-top-digital-title">Documentos</h1>
                {!openedUploadForm && (
                  <button
                    className="rounded-md bg-top-digital py-3 px-8 text-center text-base font-normal font-top-digital-title text-white hover:text-top-digital-buttom-hover outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenedUploadForm(true);
                    }}
                  >
                    Cadastrar
                  </button>
                )}

                {documents && documents.length === 0 && (
                  <p className="text-top-digital-content-color">
                    Você ainda não possui documentos cadastrados para esse site. Faço seu primeiro upload utilizando o
                    formulário abaixo
                  </p>
                )}
                {openedUploadForm && (
                  <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital text-lg">
                    <div className="mx-auto w-full max-w-[550px] mb-6">
                      <h2 className="font-top-digital-content font-normal text-top-digital-content-color">
                        Upload de documentação relacionada ao Site
                        <span className="font-bold"> {station && station._id}</span>
                      </h2>
                    </div>
                    <div className="mx-auto w-full max-w-[550px]">
                      <form encType="multipart/form-data" onSubmit={submitHandle}>
                        <div className="mb-5">
                          <label
                            htmlFor="title"
                            className="mb-3 block text-base font-medium text-top-digital-content-color"
                          >
                            Título do documento
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            id="title"
                            min="0"
                            className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="typeDoc"
                            className="mb-3 block text-base font-medium text-top-digital-content-color"
                          >
                            Tipo do documento
                          </label>
                          <select
                            name="typeDoc"
                            value={docTypeId}
                            onChange={(e) => setDocTypeId(e.target.value)}
                            id="typeDoc"
                            className="w-full rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color  focus:border-top-digital focus:shadow-md  focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                          >
                            <option key="0" value="0">
                              Selecione um Tipo
                            </option>
                            {docTypes &&
                              docTypes.length > 0 &&
                              docTypes.map((docType) => (
                                <option key={docType._id} value={docType._id}>
                                  {docType.typeName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="document"
                            className="mb-3 block text-base font-medium text-top-digital-content-color"
                          >
                            Selecione o arquivo CSV para upload
                          </label>
                          <input
                            type="file"
                            onChange={handleFile}
                            name="document"
                            id="document"
                            min="0"
                            className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-top-digital file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:text-top-digital-buttom-hover focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
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
                                setOpenedUploadForm(false);
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
                {documents && documents.length !== 0 && (
                  <div className="bg-white p-2 m-2 flex-1 order-2 md:order-1 overflow-x-auto">
                    <div className="grid grid-cols-5 text-top-digital-content-color">
                      <div className="bg-top-digital-op-25 font-semibold">Titulo do Documento</div>
                      <div className="bg-top-digital-op-25 font-semibold">Tipo</div>
                      <div className="bg-top-digital-op-25 font-semibold">Extensão</div>
                      <div className="bg-top-digital-op-25 font-semibold">Data Criação</div>
                      <div className="bg-top-digital-op-25 font-semibold">Download</div>
                    </div>
                    {documents &&
                      documents.map((doc, index) => (
                        <div key={`${index}`} className="grid grid-cols-5 border border-top-digital-op-25">
                          <div
                            className={`${
                              !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                            } text-top-digital-content-color p-1`}
                          >
                            {doc.title}
                          </div>
                          <div
                            title="Vincular Documento com Sistemas"
                            className={`${
                              !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                            } text-top-digital-content-color p-1 flex`}
                          >
                            {doc.tipo?.typeName || "-"}
                            {doc.tipo?.toSystem && (
                              <Link
                                className="cursor-pointer text-top-digital-hover"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleOpenFormLinkSystem(doc._id);
                                }}
                              />
                            )}
                          </div>
                          <div
                            className={`${
                              !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                            } text-top-digital-content-color center flex justify-center items-center p-1`}
                          >
                            <DocIcon extension={doc.extension} />
                          </div>
                          <div
                            className={`${
                              !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                            } text-top-digital-content-color p-1`}
                          >
                            <DateFormat data={doc.createdAt} />
                          </div>
                          <div
                            className={`${
                              !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                            } text-top-digital-content-color flex justify-center items-center p-1 cursor-pointer`}
                            onClick={(e) => submitDownload(e, doc)}
                          >
                            <Download />
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="mt-2 w-full h-[50vh] overflow-y-auto">
          <System stationId={id} refreshSystems={successSystem} />
        </div>
      </div>
    </div>
  );
};

export default StationPage;
