import React, { useEffect } from "react";

//icons

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

//notify

import { useNotify } from "../../hooks/useNotify";

//redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { reset, getStationDocs, documentSelector } from "../../slices/DocumentSlice";

//components
import DoumentUpload from "./DoumentUpload";
import DocumentList from "./DocumentList";

type Props = {
  id: string;
};

const Documents = ({ id }: Props) => {
  //notify
  const notify = useNotify();

  //context
  const { globalState, dispatchGlobalState } = useGlobalContext();

  /*Inicio Formulário de Documentos*/
  const {
    documents,
    error: docError,
    message: docMessage,
    success: docSuccess,
    loading: docLoading,
  } = useAppSelector(documentSelector);
  const dispatchDocument = useAppDispatch();
  useEffect(() => {
    dispatchDocument(getStationDocs(id));
  }, [id, dispatchDocument, docSuccess]);

  useEffect(() => {
    if (docError) {
      notify(docMessage, "E");
      dispatchDocument(reset());
    }

    if (docSuccess) {
      notify("Arquivo inserido com sucesso", "S");
      dispatchGlobalState({ type: "CLOSE_UPLOAD_DOC_FORM" });
      dispatchDocument(reset());
    }
  }, [docSuccess, docError, docMessage, dispatchDocument, notify, dispatchGlobalState]);

  /*Fim Formulário de Documentos*/

  return (
    <>
      {docLoading ? (
        <p>Aguarde....</p>
      ) : (
        <>
          <h1 className="text-2xl text-top-digital font-semibold mb-2 font-top-digital-title">Documentos</h1>
          {!globalState.openedUploadForm && (
            <div>
              {documents && documents.length === 0 && (
                <p className="text-top-digital-content-color">
                  Você ainda não possui documentos cadastrados para estação e seus respectivos sistemas.
                </p>
              )}

              <button
                className="rounded-md bg-top-digital py-2 px-6 text-center text-base font-normal font-top-digital-title text-white hover:text-top-digital-buttom-hover outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  dispatchGlobalState({ type: "OPEN_UPLOAD_DOC_FORM" });
                }}
              >
                Cadastrar Documento
              </button>
            </div>
          )}
          <DoumentUpload />
        </>
      )}
      <DocumentList />
    </>
  );
};

export default Documents;
