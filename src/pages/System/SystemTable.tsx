import { useContext } from "react";

//icons
import { Edit, BookOpen } from "lucide-react";

//types
import { GlobalStateSystem } from "../../Interfaces/ISystemState";

//context
import { ContextSystem } from "../../contexts/ContextSystem";
import DataUnixTimeStamp from "../../components/DataUnixTimeStamp";

type Props = {
  systems: any[];
  labels: any[];
};

const SystemTable = ({ systems, labels }: Props) => {
  const { systemGlobalState, setSystemGlobalState } = useContext<GlobalStateSystem>(ContextSystem);

  const handleOpenLabelSystemForm = (e: React.MouseEvent<HTMLElement>, idSystem: string, label: string) => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setSystemGlobalState({
      ...systemGlobalState,
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
    setSystemGlobalState({
      ...systemGlobalState,
      openedLabelSystemForm: false,
      openedSystemDetails: true,
      idSystem: idSystem,
    });
  };

  console.log(systemGlobalState.idSystem, systems);

  return (
    <>
      {systems && systems.length !== 0 && (
        <table className="text-left font-light ">
          <thead className="border-b bg-top-digital-op-40 font-medium">
            <tr key="loc0" className="font-top-digital-title font-semibold text-base">
              <th key="open" scope="col" className="px-6 py-4 whitespace-nowrap">
                Abrir
              </th>
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
            {systems &&
              systems.map((system, index) => (
                <tr
                  key={system._id}
                  className={`text-sm font-top-digital-content ${index % 2 ? " bg-top-digital-op-25" : "bg-white"} ${
                    system._id === systemGlobalState.idSystem
                      ? "border-2 border-top-digital-hover text-top-digital-hover font-semibold"
                      : "font-normal"
                  }`}
                >
                  <td key="open" className={`whitespace-nowrap px-4 py-2`}>
                    <button
                      className={`${
                        system._id === systemGlobalState.idSystem
                          ? "text-top-digital-link-hover"
                          : "hover:text-top-digital-link-hover"
                      }`}
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
                      <td key={`${label[0]}${system._id}`} className="whitespace-nowrap px-4 py-2">
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
                              className={`${
                                system._id === systemGlobalState.idSystem
                                  ? "text-top-digital-link-hover"
                                  : "hover:text-top-digital-link-hover"
                              }`}
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
