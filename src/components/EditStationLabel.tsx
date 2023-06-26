//react
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

//redux
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { labelStationSelector, setNewLabelStation, resetLabelStationSlice } from "../slices/LabelStationSlice";
import { stationSelector } from "../slices/StationSlice";

type Props = {
  setOpenedLabelStationForm: Dispatch<SetStateAction<boolean>>;
  label: string;
};

const EditStationLabel = ({ setOpenedLabelStationForm, label }: Props) => {
  const [labelStation, setLabelStation] = useState<string>("");

  const dispatch = useAppDispatch();
  const { success } = useAppSelector(labelStationSelector);
  const { station } = useAppSelector(stationSelector);

  useEffect(() => {
    setLabelStation(label);
  }, [label]);

  useEffect(() => {
    if (success) {
      setOpenedLabelStationForm(false);
    }
    dispatch(resetLabelStationSlice());
  }, [success, dispatch, setOpenedLabelStationForm]);

  const submitHandleLabelStation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: any = {
      labelStation,
      idStation: station!._id,
    };
    console.log(data);
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
              <label htmlFor="labelStation" className="mb-3 block text-base font-medium text-top-digital-content-color">
                Apelido da Estação
              </label>
              <input
                type="text"
                onChange={(e) => setLabelStation(e.target.value)}
                name="labelStation"
                value={labelStation}
                id="labelStation"
                className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-3 px-6 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              />
            </div>
            <div>
              <div className="flex gap-1">
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Enviar
                </button>
                <button
                  className="hover:shadow-form rounded-md bg-top-digital hover:text-top-digital-buttom-hover py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenedLabelStationForm(false);
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
