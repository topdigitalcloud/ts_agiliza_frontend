import { useContext } from "react";

//icons
import { Edit, BookOpen } from "lucide-react";

//types
import { LabelSystem } from "../../contexts/ContextSystem";

//context
import { ContextSystem } from "../../contexts/ContextSystem";
import DataUnixTimeStamp from "../../components/DataUnixTimeStamp";

type Props = {
  systems: any[];
  labels: any[];
};

const SystemTable = ({ systems, labels }: Props) => {
  const { labelSystem, setLabelSystem } = useContext<LabelSystem>(ContextSystem);

  const handleOpenLabelSystemForm = (e: React.MouseEvent<HTMLElement>, idSystem: string, label: string) => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setLabelSystem({
      ...labelSystem,
      openedLabelSystemForm: true,
      openedSystemDetails: false,
      idSystem: idSystem,
      labelSystem: label,
    });
  };

  const handleOpenSystemDetails = (e: React.MouseEvent<HTMLElement>, idSystem: string) => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setLabelSystem({
      ...labelSystem,
      openedLabelSystemForm: false,
      openedSystemDetails: true,
      idSystem: idSystem,
    });
  };

  return (
    <>
      {systems && systems.length !== 0 && (
        <table className="text-left text-sm font-light ">
          <thead className="border-b bg-top-digital-op-40 font-medium dark:border-neutral-500">
            <tr key="loc0">
              <th
                key="open"
                scope="col"
                className="px-6 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base"
              >
                Abrir
              </th>
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
                  <td key="open" className="px-6 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base">
                    <button
                      className="underline hover:text-top-digital-link-hover"
                      title="Ver detalhes"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenSystemDetails(e, system._id);
                      }}
                    >
                      <BookOpen className="cursor-pointer" />
                    </button>
                  </td>

                  {labels &&
                    labels.map((label) => (
                      <td
                        key={`${label[0]}${system._id}`}
                        className="whitespace-nowrap px-6 py-4 font-normal text-sm font-top-digital-content"
                      >
                        {label[0] === "Label" && (
                          <div
                            className="w-full text-center flex items-center gap-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenLabelSystemForm(e, system._id, system[label[0]]);
                            }}
                          >
                            {system[label[0]]}
                            <button
                              className="underline hover:text-top-digital-link-hover"
                              title="Coloque um apelido na Estação"
                            >
                              <Edit />
                            </button>
                          </div>
                        )}
                        {label[0] === "DataValidade" ? (
                          <DataUnixTimeStamp timestamp={system[label[0]]} />
                        ) : (
                          label[0] !== "Label" && system[label[0]]
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

export default SystemTable;
