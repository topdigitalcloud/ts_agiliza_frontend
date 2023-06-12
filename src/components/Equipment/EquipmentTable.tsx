//import { TEquipment } from "../../Interfaces/IEquipment";
import { Link } from "react-router-dom";

type Props = {
  equipamentos: any[];
  labels: any[];
};

const EquipamentoTable = ({ equipamentos, labels }: Props) => {
  return (
    <>
      {equipamentos && equipamentos.length !== 0 && (
        <div className="flex flex-col">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div>
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-top-digital font-medium dark:border-neutral-500">
                    <tr key="loc0">
                      {labels && labels.length !== 0 && (
                        <>
                          {labels.map((label) => (
                            <th scope="col" className="px-6 py-4">
                              {label[1]}
                            </th>
                          ))}
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {equipamentos &&
                      equipamentos.map((equipamento) => (
                        <tr key={equipamento._id} className="border-b dark:border-neutral-500">
                          {labels &&
                            labels.map((label) => (
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {label[0] === "_id" && (
                                  <Link to={`/site/${equipamento[label[0]]}`}>{equipamento[label[0]]}</Link>
                                )}
                                {label[0] !== "_id" && equipamento[label[0]]}
                              </td>
                            ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EquipamentoTable;
