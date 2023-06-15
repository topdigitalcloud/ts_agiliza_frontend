import { useParams } from "react-router-dom";

//hooks
import { useEffect, useState } from "react";
import { useNotify } from "../../hooks/useNotify";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//redux
import { reset, getEquipmentDocs, documentSelector, insertDoc } from "../../slices/DocumentSlice";
import { getEquipamentoById, equipmentSelector } from "../../slices/EquipmentSlice";
import { getConfig, configSelector } from "../../slices/ConfigSlice";

//types
import { TEquipment } from "../../Interfaces/IEquipment";
import DateFormat from "../../components/DateFormat";

type Props = {};

const Site = (props: Props) => {
  //Notify
  const notify = useNotify();

  const { id } = useParams();
  const [formdocument, setFormDocument] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [openedUploadForm, setOpenedUploadForm] = useState<boolean>(false);

  const dispatchDocument = useAppDispatch();
  const dispatchEquipment = useAppDispatch();
  const dispatchConfig = useAppDispatch();
  const { documents, error: docError, success: docSuccess, loading: docLoading } = useAppSelector(documentSelector);
  const { equipamento } = useAppSelector(equipmentSelector);
  const { config } = useAppSelector(configSelector);

  useEffect(() => {
    dispatchConfig(getConfig());
  }, [dispatchConfig]);

  useEffect(() => {
    dispatchEquipment(getEquipamentoById(id));
  }, [id, dispatchEquipment]);

  useEffect(() => {
    dispatchDocument(getEquipmentDocs(id));
  }, [id, dispatchDocument, docSuccess]);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //build form data
    if (formdocument) {
      const formData = new FormData();
      formData.append("equipment", equipamento!._id);
      formData.append("title", title);
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
    //resetComponentMessage();
  };

  useEffect(() => {
    if (docError) {
      notify(docError, "E");
      dispatchDocument(reset());
    }

    if (docSuccess) {
      notify("Arquivo inserido com sucesso", "S");
      setOpenedUploadForm(false);
      dispatchDocument(reset());
    }
  }, [docSuccess, docError, dispatchDocument, notify]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = e?.target?.files?.[0];
    if (!doc) return;
    setFormDocument(doc);
  };

  console.log(documents);
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap ">
        <div className="bg-white p-2 m-2 flex-1 order-2 md:order-1 overflow-x-auto">
          {config &&
            equipamento &&
            config.map((conf, index) => (
              <div key={`label${index}`} className="grid grid-cols-2">
                <div className={`${index % 2 ? "bg-white" : "bg-gray-300"} font-semibold`}>{conf.label}</div>
                <div className={`${index % 2 ? "bg-white" : "bg-gray-300"}`}>
                  {equipamento[conf.campo as keyof TEquipment]}
                </div>
              </div>
            ))}
        </div>
        <div className="bg-white border p-2 m-2 flex-1 order-1 md:order-2">
          {docLoading ? (
            <p>Aguarde....</p>
          ) : (
            <>
              <h1 className="text-xl text-top-digital font-semibold mb-2">Documentos</h1>
              {!openedUploadForm && (
                <button
                  className="hover:shadow-form rounded-md bg-top-digital hover:bg-top-digital-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenedUploadForm(true);
                  }}
                >
                  Cadastrar
                </button>
              )}

              {documents && documents.length === 0 && (
                <p className="text-top-digital">
                  Você ainda não possui documentos cadastrados para esse site. Faço seu primeiro upload utilizando o
                  formulário abaixo
                </p>
              )}
              {openedUploadForm && (
                <div className="flex flex-col items-center justify-center font-bold p-12 text-top-digital text-lg">
                  <div className="mx-auto w-full max-w-[550px] mb-6">
                    <h2>
                      Upload de documentação relacionada ao Site
                      <span className="text-top-digital-hover"> {equipamento && equipamento._id}</span>
                    </h2>
                  </div>
                  <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={submitHandle}>
                      <div className="mb-5">
                        <label htmlFor="title" className="mb-3 block text-base font-medium text-top-digital">
                          Título do documento
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          name="title"
                          id="title"
                          placeholder="Título do documento"
                          min="0"
                          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-top-digital file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-top-digital-hover focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="document" className="mb-3 block text-base font-medium text-top-digital">
                          Selecione o arquivo CSV para upload
                        </label>
                        <input
                          type="file"
                          onChange={handleFile}
                          name="document"
                          id="document"
                          min="0"
                          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-top-digital file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-top-digital-hover focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <div className="flex gap-1">
                          <button
                            type="submit"
                            className="hover:shadow-form rounded-md bg-top-digital hover:bg-top-digital-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                          >
                            Enviar
                          </button>
                          <button
                            className="hover:shadow-form rounded-md bg-top-digital hover:bg-top-digital-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
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
                  <div className="grid grid-cols-4">
                    <div className="bg-top-digital font-semibold">Titulo do Documento</div>
                    <div className="bg-top-digital font-semibold">Extensão</div>
                    <div className="bg-top-digital font-semibold">Data Criação</div>
                    <div className="bg-top-digital font-semibold">Download</div>
                  </div>
                  {documents &&
                    documents.map((doc, index) => (
                      <div key={`${index}`} className="grid grid-cols-4">
                        <div className={`${index % 2 ? "bg-white" : "bg-gray-300"}`}>{doc.title}</div>
                        <div className={`${index % 2 ? "bg-white" : "bg-gray-300"}`}>{doc.extension}</div>
                        <div className={`${index % 2 ? "bg-white" : "bg-gray-300"}`}>
                          <DateFormat data={doc.createdAt} />
                        </div>
                        <div className={`${index % 2 ? "bg-white" : "bg-gray-300"}`}>Download</div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Site;
