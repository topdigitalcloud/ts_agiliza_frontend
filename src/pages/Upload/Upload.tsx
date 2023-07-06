import React, { ChangeEvent, useState, useEffect, MouseEvent } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { api } from "../../utils/config";

//Hooks Redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//Slice
import { stationSelector, uploadStations, reset } from "../../slices/StationSlice";

//notify
import { useNotify } from "../../hooks/useNotify";
import { TUpload } from "../../Interfaces/IStation";

type Props = {};

//connect to socket io server
const socket = io(api);

const Upload = (props: Props) => {
  //Io Client

  const [progress, setProgress] = useState<TUpload | null>(null);

  //Notify
  const notify = useNotify();

  //Redux
  const dispatch = useAppDispatch();
  const { loading, error, success, message, uploadProgress } = useAppSelector(stationSelector);

  const [csvFile, setCsvFile] = useState<File>();

  useEffect(() => {
    socket.on("uploadProgress", (progress) => {
      setProgress(progress);
    });

    //Terminates socket connection when component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    //image preview
    const csv = e?.target?.files?.[0];
    if (!csv) return;
    setCsvFile(csv);
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //build form data
    if (csvFile) {
      const formData = new FormData();
      formData.append("csvfile", csvFile, csvFile.name);
      // Remove coords and page from localstorage
      localStorage.removeItem("page");
      localStorage.removeItem("coords");
      //progress of upload

      dispatch(uploadStations(formData));
    } else {
      notify("Favor Selecionar um arquivo", "E");
    }
    //resetComponentMessage();
  };

  const handleNewUpload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(reset());
  };

  //show error message
  useEffect(() => {
    if (error) {
      notify(message, "E");
      dispatch(reset());
    }
  }, [error, notify, dispatch, message]);
  return (
    <div className="flex w-full mt-4">
      <div className="w-full flex items-center justify-center">
        {!loading && !success ? (
          <div className="px-10 py-20 rounded-3xl border-2 border-gray-200  bg-white">
            <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital-hover text-lg">
              <div className="mx-auto w-full mb-2">
                <h1 className="text-3xl text-top-digital font-top-digital-title">Upload do arquivo CSV</h1>
              </div>
              <div className="mx-auto w-full max-w-[550px]">
                <form encType="multipart/form-data" onSubmit={submitHandle}>
                  <div className="mb-5">
                    <label
                      htmlFor="csvfile"
                      className="mb-3 block text-base font-medium text-top-digital-content-color font-top-digital-content"
                    >
                      Selecione o arquivo CSV para upload
                    </label>
                    <input
                      type="file"
                      onChange={handleFile}
                      name="csvfile"
                      id="csvfile"
                      placeholder="5"
                      min="0"
                      className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-top-digital file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:text-top-digital-buttom-hover focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col max-w-[650px]">
            <div className="mx-auto w-full mb-2 flex flex-col justify-center">
              <div className="text-top-digital text-xl font-semibold">Etapa 1: envio do arquivo CSV</div>
              <div className="flex items-center">
                <div className="h-2 bg-blue-500 rounded" style={{ width: `${uploadProgress}%` }} />
                <div className="text-top-digital text-sm">{uploadProgress}%</div>
              </div>
            </div>
            {progress?.firstStep.status && (
              <div className="mx-auto w-full mb-2 flex flex-col items-start">
                <div className="text-top-digital text-xl font-semibold">Etapa 2: checkagem do arquivo</div>
                <div className="flex">
                  <div className="text-top-digital text-base">
                    {progress?.secondStep.totalLines} registros encontrados
                  </div>
                </div>
              </div>
            )}
            <>
              {progress?.secondStep.status && (
                <div className="mx-auto w-full mb-2 flex flex-col items-start">
                  <div className="text-top-digital text-xl font-semibold">Etapa 3: checkagem dos registros</div>
                  <div className="flex flex-col">
                    <div className="text-top-digital text-base">
                      {progress?.secondStep.currentLine} registros analisados
                    </div>
                    <div className="text-top-digital text-base">
                      {progress?.secondStep.currentEnableLines} registros aptos
                    </div>
                    <div className="text-top-digital text-base">
                      {progress?.secondStep.currentProblemLines} registros com problema
                    </div>
                  </div>
                </div>
              )}

              {progress?.thirdStep.status && (
                <div className="mx-auto w-full mb-2 flex flex-col items-start">
                  <div className="text-top-digital text-xl font-semibold">Etapa 4: Registros auxiliares</div>
                  <div className="flex flex-col">
                    <div className="text-top-digital text-base">
                      {progress?.thirdStep.insertEquipments ? (
                        <p>Aguarde alguns instantes....</p>
                      ) : (
                        <p>Insersão concluída</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {progress?.fourthStep.status && (
                <div className="mx-auto w-full mb-2 flex flex-col items-start">
                  <div className="text-top-digital text-xl font-semibold">Etapa 5: Estações e Sistemas</div>
                  <div className="flex flex-col">
                    <div className="text-top-digital text-base">
                      Total estações: {progress?.fourthStep.totalStations}
                    </div>
                    <div className="text-top-digital text-base">
                      Total novas estações: {progress?.fourthStep.totalNewStations}
                    </div>
                    <div className="text-top-digital text-base">
                      Total Sistemas: {progress?.fourthStep.totalSystems}
                    </div>
                    <div className="text-top-digital text-base">
                      Total novos sistemas: {progress?.fourthStep.totalNewSystems}
                    </div>
                    <div className="text-top-digital text-base">
                      Total de sistemas atualizados: {progress?.fourthStep.totalUpdatedSystems}
                    </div>
                    <div className="text-top-digital text-base">
                      Total de sistemas sem atualização: {progress?.fourthStep.totalNoChangedSystems}
                    </div>
                  </div>
                </div>
              )}
              <div>
                {success && (
                  <div className="flex flex-col items-center justify-center font-bold pt-4 pb-2 text-top-digital-hover text-lg">
                    <div className="mx-auto w-full h-32 bg-top-digital-op-25 text-top-digital-content-color font-top-digital-content">
                      <h1>Upload feito com sucesso!</h1>
                      <p>
                        Acesse a o link <Link to="/">home</Link> para utilizar o Agiliza.
                      </p>
                      <button onClick={handleNewUpload}>
                        Ou faça um novo <Link to="/upload">upload</Link>.
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
