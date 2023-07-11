import React, { useState } from "react";

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

//noify
import { useNotify } from "../../hooks/useNotify";

//redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { stationSelector } from "../../slices/StationSlice";
import { docTypeSelector } from "../../slices/DocumentTypeSlice";
import { reset, documentSelector, insertDoc } from "../../slices/DocumentSlice";

type Props = {};

const DoumentUpload = (props: Props) => {
  //context
  const { globalState, dispatchGlobalState } = useGlobalContext();

  //usestate
  const [formdocument, setFormDocument] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [docTypeId, setDocTypeId] = useState<string>("0");

  //redux
  const dispatchDocument = useAppDispatch();
  const { station } = useAppSelector(stationSelector);
  const { success: docSuccess } = useAppSelector(documentSelector);
  const { docTypes } = useAppSelector(docTypeSelector);

  //notify
  const notify = useNotify();

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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = e?.target?.files?.[0];
    if (!doc) return;
    setFormDocument(doc);
  };

  return (
    <>
      {globalState.openedUploadForm && (
        <div className="flex flex-col items-center justify-center p-2 text-top-digital">
          <div className="mx-auto w-full max-w-[550px] mb-6">
            <h2 className="text-top-digital-content-color">
              Upload de documentação relacionada a estação
              <span className="font-bold">
                {" "}
                {station?.Label && station.Label !== "" ? station.Label : station?.EnderecoEstacao}
              </span>
            </h2>
          </div>
          <div className="mx-auto w-full max-w-[550px]">
            <form encType="multipart/form-data" onSubmit={submitHandle}>
              <div className="mb-5">
                <label htmlFor="title" className="mb-3 block text-base font-medium text-top-digital-content-color">
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
                <label htmlFor="typeDoc" className="mb-3 block text-base font-medium text-top-digital-content-color">
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
                <label htmlFor="document" className="mb-3 block text-base font-medium text-top-digital-content-color">
                  Selecione o arquivo para upload (PDF, DOC, Excel)
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
                    className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-2 px-6 text-center text-base font-semibold text-white outline-none"
                  >
                    Enviar
                  </button>
                  <button
                    className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-2 px-6 text-center text-base font-semibold text-white outline-none"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatchGlobalState({ type: "CLOSE_UPLOAD_DOC_FORM" });
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
    </>
  );
};

export default DoumentUpload;
