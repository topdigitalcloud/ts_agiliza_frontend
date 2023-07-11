import React from "react";

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

//redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { documentSelector, downloadDoc } from "../../slices/DocumentSlice";

//components
import DocIcon from "../DocIcon";
import DateFormat from "../DateFormat";

//icons
import { Download, Link } from "lucide-react";

//types
import { TDocument } from "../../Interfaces/IDocument";

const DocumentList = () => {
  //context
  const { dispatchGlobalState } = useGlobalContext();

  //redux
  const dispatchDocument = useAppDispatch();
  const { documents } = useAppSelector(documentSelector);

  const submitDownload = (e: React.MouseEvent<HTMLDivElement>, doc: TDocument) => {
    e.preventDefault();
    dispatchDocument(downloadDoc(doc));
  };

  /*Inicio Formulário de Vinculação dos Sistemas*/
  const handleOpenFormLinkSystem = (idDocument: string) => {
    dispatchGlobalState({ type: "OPEN_SYSTEM_LINK_FORM", idDocument: idDocument });
    dispatchGlobalState({ type: "CLOSE_SYSTEM_DETAILS_AND_LABEL_SYSTEM_FORM" });
  };
  /*Fim Formulário de Vinculação dos Sistemas*/

  return (
    <>
      {documents && documents.length !== 0 && (
        <div className="mt-2 w-full h-[50vh] overflow-y-auto">
          <div className="grid grid-cols-5 text-top-digital-content-color">
            <div className="bg-top-digital-op-25 font-semibold ">Titulo do Documento</div>
            <div className="bg-top-digital-op-25 font-semibold">Tipo</div>
            <div className="bg-top-digital-op-25 font-semibold">Extensão</div>
            <div className="bg-top-digital-op-25 font-semibold">Data Criação</div>
            <div className="bg-top-digital-op-25 font-semibold">Download</div>
            {documents &&
              documents.map((doc, index) => (
                <>
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
                    {doc.tipo?.toSystem && (
                      <Link
                        className="cursor-pointer text-top-digital-hover"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenFormLinkSystem(doc._id);
                        }}
                      />
                    )}
                    {doc.tipo?.typeName || "-"}
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
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentList;
