import React from "react";
import { TLocation } from "../../Interfaces/ILocation";
import { Link } from "react-router-dom";

type Props = {
  location: TLocation;
};

const InfoWindowStations = ({ location }: Props) => {
  return (
    <div className="max-w-[110px] overflow-hidden">
      {/* {location.stations.map((station) => ( */}
      {location.stations && location.stations.length !== 0 && (
        <table className="text-left text-sm font-light min-w-full">
          <thead className="border-b bg-top-digital-op-40 font-medium dark:border-neutral-500">
            <tr key="loc0">
              <th key="endorlabel" scope="col" className="font-top-digital-title font-semibold text-sm">
                {location.stations.length > 1 ? "Estações" : "Estação"}
              </th>
            </tr>
          </thead>
          <tbody>
            {location.stations &&
              location.stations.map((station, index) => (
                <tr
                  key={station._id}
                  className={`border-b dark:border-neutral-500 ${index % 2 ? " bg-top-digital-op-25" : "bg-white"}`}
                >
                  <td key={`td${station._id}`} className="text-sm font-top-digital-content">
                    <Link to={`/stationpage/${station._id}`}>
                      {station.Label && station.Label !== "" ? station.Label : station.EnderecoEstacao}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InfoWindowStations;
