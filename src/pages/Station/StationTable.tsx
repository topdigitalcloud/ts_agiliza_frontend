import { Edit, Save, X } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//redux
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { labelStationSelector, setNewLabelStation, resetLabelStationSlice } from "../../slices/LabelStationSlice";

type Props = {
  stations: any[];
  labels: any[];
  setResetVisibleStations: React.Dispatch<React.SetStateAction<boolean>>;
};

const StationTable = ({ stations, labels, setResetVisibleStations }: Props) => {
  const [editStation, setEditStation] = useState<string>("");
  const [labelStation, setLabelStation] = useState<string>("");

  const dispatch = useAppDispatch();
  const { success } = useAppSelector(labelStationSelector);

  useEffect(() => {
    if (success) {
      setEditStation("");
      setResetVisibleStations(true);
    }
    dispatch(resetLabelStationSlice());
  }, [success, dispatch, setResetVisibleStations]);

  const handleUpdateStation = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const data: any = {
      labelStation,
      idStation: editStation,
    };
    dispatch(setNewLabelStation(data));
  };

  return (
    <>
      {stations && stations.length !== 0 && (
        <table className="text-left text-sm font-light ">
          <thead className="border-b bg-top-digital-op-40 font-medium dark:border-neutral-500">
            <tr key="loc0">
              {labels && labels.length !== 0 && (
                <>
                  {labels.map((label, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base"
                    >
                      {label[1]}
                    </th>
                  ))}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {stations &&
              stations.map((station, index) => (
                <tr
                  key={station._id}
                  className={`border-b dark:border-neutral-500 ${index % 2 ? " bg-top-digital-op-25" : "bg-white"}`}
                >
                  {labels &&
                    labels.map((label) => (
                      <td
                        key={`${label[0]}${station._id}`}
                        className={`px-2 py-2 font-normal  text-sm font-top-digital-content  ${
                          station._id === editStation ? "w-auto" : ""
                        } `}
                      >
                        {label[0] === "NumEstacao" && (
                          <Link className="underline" key={`lnk${station._id}`} to={`/stationpage/${station._id}`}>
                            {station[label[0]]}
                          </Link>
                        )}
                        {label[2] ? (
                          station._id !== editStation ? (
                            <div className={`flex items-center gap-2 ${label[2] ? "justify-center" : ""}`}>
                              {station[label[0]]}
                              <button
                                className=" hover:text-top-digital-link-hover text-center"
                                title="Coloque um apelido na Estação"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditStation(station._id);
                                  setLabelStation(station[label[0]]);
                                  setResetVisibleStations(false);
                                }}
                              >
                                <Edit />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <input
                                className="w-full appearance-none rounded-md border border-top-digital-op-25 bg-white py-1 px-1 text-base font-medium text-top-digital-content-color outline-none focus:border-top-digital focus:shadow-md focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                                type="text"
                                name="labelStation"
                                value={labelStation}
                                onChange={(e) => setLabelStation(e.target.value)}
                              />
                              <button
                                className=" hover:text-top-digital-link-hover text-center"
                                title="Coloque um apelido na Estação"
                                onClick={(e) => {
                                  handleUpdateStation(e);
                                }}
                              >
                                <Save />
                              </button>

                              <button
                                className=" hover:text-top-digital-link-hover text-center"
                                title="Coloque um apelido na Estação"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditStation("");
                                }}
                              >
                                <X />
                              </button>
                            </div>
                          )
                        ) : (
                          label[0] !== "NumEstacao" && station[label[0]]
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default StationTable;
