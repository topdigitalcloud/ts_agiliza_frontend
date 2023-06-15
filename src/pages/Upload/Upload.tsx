import React, { ChangeEvent, useState, useEffect } from "react";

//Hooks Redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//Slice
import { equipmentSelector, uploadEquipments, reset } from "../../slices/EquipmentSlice";

//notify
import { useNotify } from "../../hooks/useNotify";

type Props = {};

const Upload = (props: Props) => {
  //Notify
  const notify = useNotify();

  //Redux
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(equipmentSelector);

  const [csvFile, setCsvFile] = useState<File>();

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
      dispatch(uploadEquipments(formData));

      const timer = setTimeout(() => {
        dispatch(reset());
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      notify("Favor Selecionar um arquivo", "E");
    }
    //resetComponentMessage();
  };

  //show error message
  useEffect(() => {
    if (error) {
      notify(error, "E");
      dispatch(reset());
    }
  }, [error, notify, dispatch]);

  if (loading) {
    return <div>Realizando o Upload....</div>;
  }

  return (
    <div className="flex w-full mt-4">
      <div className="w-full flex items-center justify-center">
        <div className="px-10 py-20 rounded-3xl border-2 border-gray-200  bg-white">
          {success && (
            <div className="flex flex-col items-center justify-center font-bold pt-4 pb-2 text-top-digital-hover text-lg">
              <div className="mx-auto w-full h-32 max-w-[550px] bg-top-digital-op-25 text-top-digital-content-color font-top-digital-content">
                <h1>Upload feito com sucesso!</h1>
                <p>Acesse a o link home para utilizar o Agiliza.</p>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital-hover text-lg">
            <div className="mx-auto w-full max-w-[550px] mb-6">
              <h1 className="text-3xl text-top-digital font-top-digital-title">Upload do arquivo CSV</h1>
            </div>
            <div className="mx-auto w-full max-w-[550px]">
              <form onSubmit={submitHandle}>
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
      </div>
    </div>
  );
};

export default Upload;
