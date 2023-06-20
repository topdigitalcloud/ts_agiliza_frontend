import { Link } from "react-router-dom";

type Props = {
  stations: any[];
  labels: any[];
};

const StationTable = ({ stations, labels }: Props) => {
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
                      className="px-6 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base"
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
                        className="whitespace-nowrap px-6 py-4 font-normal text-sm font-top-digital-content"
                      >
                        {label[0] === "NumEstacao" && (
                          <Link className="underline" key={`lnk${station._id}`} to={`/stationpage/${station._id}`}>
                            {station[label[0]]}
                          </Link>
                        )}
                        {label[0] !== "NumEstacao" && station[label[0]]}
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
