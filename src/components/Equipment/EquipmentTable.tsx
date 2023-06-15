//import { TEquipment } from "../../Interfaces/IEquipment";
import { Link } from "react-router-dom";

type Props = {
  equipamentos: any[];
  labels: any[];
};

const EquipamentoTable = ({ equipamentos, labels }: Props) => {
  console.log("EquipamentoTable");
  return (
    <>
      {equipamentos && equipamentos.length !== 0 && (
        <table className="text-left text-sm font-light">
          <thead className="border-b bg-top-digital bg-opacity-25 font-medium dark:border-neutral-500">
            <tr key="loc0">
              {labels && labels.length !== 0 && (
                <>
                  {labels.map((label, index) => (
                    <th key={index} scope="col" className="px-6 py-4 whitespace-nowrap">
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
                      <td key={`${label[0]}${equipamento._id}`} className="whitespace-nowrap px-6 py-4 font-medium">
                        {label[0] === "_id" && (
                          <Link key={`lnk${equipamento._id}`} to={`/site/${equipamento[label[0]]}`}>
                            {equipamento[label[0]]}
                          </Link>
                        )}
                        {label[0] !== "_id" && equipamento[label[0]]}
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

export default EquipamentoTable;
