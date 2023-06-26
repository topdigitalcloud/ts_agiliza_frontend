import React, { useContext, useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//redux

//primeira parte do componente: config e station
import { configSelector, getConfig } from "../../slices/ConfigSystemSlice";
import { systemSelector, getSystemById } from "../../slices/SystemSlice";
import { TSystem } from "../../Interfaces/ISystem";
import { X } from "lucide-react";

//context
import { ContextSystem } from "../../contexts/ContextSystem";

//components
import DocumentsSystem from "../Document/DocumentsSystem";
import { LabelSystem } from "../../contexts/ContextSystem";

type Props = {
  systemId: string;
};

const SystemDetails = ({ systemId }: Props) => {
  const { labelSystem, setLabelSystem } = useContext<LabelSystem>(ContextSystem);
  const dispatch = useAppDispatch();
  const { system } = useAppSelector(systemSelector);
  const { config } = useAppSelector(configSelector);

  useEffect(() => {
    const obj = {
      systemId,
    };
    dispatch(getSystemById(obj));
    dispatch(getConfig());
  }, [dispatch, systemId]);
  console.log(system, config);

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl p-1 text-top-digital font-semibold mb-1 font-top-digital-title text-center">
            Documentos do systema {system?.Label !== "" ? system?.Label : system?._id}
          </h1>
          <button
            onClick={() => setLabelSystem({ ...labelSystem, openedSystemDetails: false, openedLabelSystemForm: false })}
          >
            <X className="cursor-pointer" />
          </button>
        </div>
        {config &&
          system &&
          config.map(
            (conf, index) =>
              conf.visible && (
                <div key={`label${index}`} className="grid grid-cols-2 ">
                  <div
                    className={`${
                      index % 2 ? "bg-white" : "bg-top-digital-op-25"
                    } font-semibold text-top-digital-content-color font-top-digital-content`}
                  >
                    {conf.label}
                  </div>
                  <div
                    className={`${
                      index % 2 ? "bg-white" : "bg-top-digital-op-25"
                    } text-top-digital-content-color font-normal font-top-digital-content`}
                  >
                    <div className="flex gap-2 items-center">{system[conf.campo as keyof TSystem]}</div>
                  </div>
                </div>
              )
          )}
      </div>
      <DocumentsSystem systemId={systemId} />
    </>
  );
};

export default SystemDetails;
