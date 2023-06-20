import { Link } from "react-router-dom";

type Props = {
  systems: any[];
  labels: any[];
};

const SystemTable = ({ systems, labels }: Props) => {
  return (
    <>
      {systems && systems.length !== 0 && (
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
            {systems &&
              systems.map((system, index) => (
                <tr
                  key={system._id}
                  className={`border-b dark:border-neutral-500 ${index % 2 ? " bg-top-digital-op-25" : "bg-white"}`}
                >
                  {labels &&
                    labels.map((label) => (
                      <td
                        key={`${label[0]}${system._id}`}
                        className="whitespace-nowrap px-6 py-4 font-normal text-sm font-top-digital-content"
                      >
                        {label[0] === "_id" && (
                          <Link className="underline" key={`lnk${system._id}`} to={`/site/${system[label[0]]}`}>
                            {system[label[0]]}
                          </Link>
                        )}
                        {label[0] !== "_id" && system[label[0]]}
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

export default SystemTable;
