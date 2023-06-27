import React, { useEffect } from "react";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//redux

//primeira parte do componente: config e station
import { documentSelector, getSystemDocs, downloadDoc } from "../../slices/DocumentSlice";
import { Download } from "lucide-react";
import DocIcon from "../../components/DocIcon";
import DateFormat from "../../components/DateFormat";

type Props = {
  systemId: string;
};

const DocumentsSystem = ({ systemId }: Props) => {
  const dispatch = useAppDispatch();
  const { docsSystemDetails: documents } = useAppSelector(documentSelector);

  useEffect(() => {
    const obj = {
      systemId,
    };
    dispatch(getSystemDocs(obj));
  }, [dispatch, systemId]);

  const submitDownload = (e: React.MouseEvent<HTMLDivElement>, doc: any) => {
    e.preventDefault();
    dispatch(downloadDoc(doc));
  };
  return (
    <div className="flex flex-col border">
      <h2 className="text-2xl p-1 text-top-digital font-semibold mb-1 font-top-digital-title text-center">
        Documentos do sistema
      </h2>
      {documents && documents.length !== 0 && (
        <div className="bg-white p-1 m-1 flex-1 order-2 md:order-1 overflow-x-auto">
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
                  className={`${!(index % 2) ? "bg-white" : "bg-top-digital-op-25"} text-top-digital-content-color p-1`}
                >
                  {doc.title}
                </div>
                <div
                  className={`${
                    !(index % 2) ? "bg-white" : "bg-top-digital-op-25"
                  } text-top-digital-content-color p-1 flex`}
                >
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
                  className={`${!(index % 2) ? "bg-white" : "bg-top-digital-op-25"} text-top-digital-content-color p-1`}
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
    </div>
  );
};

export default DocumentsSystem;
