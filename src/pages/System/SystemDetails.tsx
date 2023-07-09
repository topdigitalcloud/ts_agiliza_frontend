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
import { GlobalStateSystem } from "../../Interfaces/ISystemState";
import DataUnixTimeStamp from "../../components/DataUnixTimeStamp";

type Props = {
  systemId: string;
};

const SystemDetails = ({ systemId }: Props) => {
  const { systemGlobalState, setSystemGlobalState } = useContext<GlobalStateSystem>(ContextSystem);
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

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl p-1 text-top-digital font-semibold mb-1 font-top-digital-title text-center">
            Sistema {system?.Label !== "" ? system?.Label : system?._id}
          </h1>
          <button
            onClick={() =>
              setSystemGlobalState({ ...systemGlobalState, openedSystemDetails: false, openedLabelSystemForm: false })
            }
          >
            <X className="cursor-pointer" />
          </button>
        </div>
        <DocumentsSystem systemId={systemId} />
        <div className="grid grid-cols-1 text-lg text-top-digital font-semibold font-top-digital-title text-center">
          Detalhes do sistema
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
                    {conf.label === "DataValidade" && (
                      <DataUnixTimeStamp timestamp={system[conf.campo as keyof TSystem]!.toString()} />
                    )}
                    {conf.label !== "DataValidade" && (
                      <div className="flex gap-2 items-center">{system[conf.campo as keyof TSystem]?.toString()}</div>
                    )}
                  </div>
                </div>
              )
          )}
      </div>
    </>
  );
};

export default SystemDetails;
