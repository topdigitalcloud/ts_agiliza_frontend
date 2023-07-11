//react
import React, { useEffect } from "react";

//redux
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { labelStationSelector, setNewLabelStation, resetLabelStationSlice } from "../../slices/LabelStationSlice";
import { stationSelector } from "../../slices/StationSlice";

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

const EditStationLabel = () => {
  //global context
  const { globalState, dispatchGlobalState } = useGlobalContext();
  //states
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(labelStationSelector);
  const { station } = useAppSelector(stationSelector);

  useEffect(() => {
    dispatchGlobalState({ type: "SET_LABEL_STATION", labelStation: station!.Label });
  }, [station, dispatchGlobalState]);

  useEffect(() => {
    if (success) {
      dispatchGlobalState({ type: "CLOSE_LABEL_STATION_FORM" });
    }
    dispatch(resetLabelStationSlice());
  }, [success, dispatch, dispatchGlobalState]);

  const submitHandleLabelStation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const label = globalState.labelStation;

    const data: any = {
      labelStation: label,
      idStation: station!._id,
    };

    dispatch(setNewLabelStation(data));
  };

  return (
    <div className="absolute bg-white top-0 right-0 w-full h-full border">
      <div className="flex flex-col items-center justify-center font-bold p-2 text-top-digital text-lg">
        <div className="mx-auto w-full max-w-[550px] mb-6">
          <h2 className="font-top-digital-content font-normal text-top-digital-content-color">
            Adicione/Edite um apelido para a estação
            <span className="font-bold"> {station && station.EnderecoEstacao}</span>
          </h2>
        </div>
        <div className="mx-auto w-full max-w-[550px]">
          <form encType="multipart/form-data" onSubmit={submitHandleLabelStation}>
            <div className="mb-5">
              <label htmlFor="labelStation" className="mb-2 block text-base font-medium text-top-digital-content-color">
                Apelido da Estação:
              </label>
              <input
                type="text"
                onChange={(e) => dispatchGlobalState({ type: "SET_LABEL_STATION", labelStation: e.target.value })}
                name="labelStation"
                value={globalState.labelStation}
                id="labelStation"
                className="w-2/3 appearance-none rounded-md border border-top-digital-op-25 bg-white py-2 px-2 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
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
                    dispatchGlobalState({ type: "CLOSE_LABEL_STATION_FORM" });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStationLabel;
