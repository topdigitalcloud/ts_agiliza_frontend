import React from "react";

//types
import { TStation } from "../../Interfaces/IStation";

//redux
import useAppSelector from "../../hooks/useAppSelector";
import { configSelector } from "../../slices/ConfigStationSlice";
import { stationSelector } from "../../slices/StationSlice";

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

//icons
import { Edit } from "lucide-react";

type Props = {};

const StationDetails = (props: Props) => {
  //global context
  const { dispatchGlobalState } = useGlobalContext();
  //redux
  const { config } = useAppSelector(configSelector);
  const { station } = useAppSelector(stationSelector);
  return (
    <div>
      <h1 className="md:text-xl text-base text-top-digital font-semibold mb-2 font-top-digital-title">
        Dados da Estação {station?.Label && station?.Label !== "" ? station.Label : station?.EnderecoEstacao}
      </h1>
      {config &&
        station &&
        config.map((conf, index) => (
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
              <div className="flex gap-2 items-center">
                {station[conf.campo as keyof TStation]}
                {conf.campo === "Label" && (
                  <button
                    className="underline hover:text-top-digital-link-hover"
                    title="Coloque um apelido na Estação"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatchGlobalState({ type: "OPEN_LABEL_STATION_FORM" });
                    }}
                  >
                    <Edit />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StationDetails;
