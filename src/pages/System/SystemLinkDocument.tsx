import { useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { linkSystemDocSelector, getAllSystemsByStation } from "../../slices/LinkSystemDocSlice";
import { documentSelector, getDocById } from "../../slices/DocumentSlice";
import { X } from "lucide-react";
import { TSystem } from "../../Interfaces/ISystem";
import SystemActionLinkDoc from "./SystemActionLinkDoc";

type Props = {
  setOpenSystemLinkForm: Dispatch<SetStateAction<boolean>>;
  documentId: string;
};

const SystemLinkDocument = ({ setOpenSystemLinkForm, documentId }: Props) => {
  const dispatch = useAppDispatch();
  const { systemsToLink, labels } = useAppSelector(linkSystemDocSelector);
  const { id } = useParams();

  const { document } = useAppSelector(documentSelector);

  useEffect(() => {
    dispatch(getAllSystemsByStation(id));
  }, [documentId, dispatch, id]);

  useEffect(() => {
    const objData = {
      id: documentId,
    };
    dispatch(getDocById(objData));
  }, [documentId, dispatch]);
  return (
    <>
      {systemsToLink && systemsToLink.length !== 0 && (
        <>
          <div className="sticky bg-white top-0 z-50 flex justify-between mb-2">
            <div>
              <h2 className="text-xl text-top-digital">
                Vincular o documento{" "}
                <span className="text-top-digital-hover hover:text-top-digital-link-hover">{document?.title}</span> aos
                sistemas
              </h2>
            </div>
            <div>
              <X
                className="cursor-pointer"
                onClick={() => {
                  setOpenSystemLinkForm(false);
                }}
              />
            </div>
          </div>
          <div className="z-0 static">
            <table className="text-left text-sm font-light border-2">
              <thead className="border-b bg-top-digital-op-40 font-medium dark:border-neutral-500">
                <tr key="loc0">
                  <th
                    key="vincular"
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base"
                  >
                    Vincular
                  </th>
                  {labels && labels.length !== 0 && (
                    <>
                      {labels.map(
                        (label, index) =>
                          (label[0] === "idAnatel" ||
                            label[0] === "Label" ||
                            label[0] === "FreqRxMHz" ||
                            label[0] === "FreqTxMHz") && (
                            <th
                              key={index}
                              scope="col"
                              className="px-6 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base"
                            >
                              {label[1]}
                            </th>
                          )
                      )}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {systemsToLink &&
                  systemsToLink.map((system, index) => (
                    <tr
                      key={system._id}
                      className={`border-b dark:border-neutral-500 ${index % 2 ? " bg-top-digital-op-25" : "bg-white"}`}
                    >
                      <td
                        key="vincular"
                        className="px-6 py-4 whitespace-nowrap font-top-digital-title font-semibold text-base"
                      >
                        <SystemActionLinkDoc
                          key={system._id}
                          document={documentId}
                          system={system._id}
                          linked={system.documents!.includes(documentId)}
                        />
                      </td>
                      {labels &&
                        labels.map(
                          (label) =>
                            (label[0] === "idAnatel" ||
                              label[0] === "Label" ||
                              label[0] === "FreqRxMHz" ||
                              label[0] === "FreqTxMHz") && (
                              <td
                                key={`${label[0]}${system._id}`}
                                className="whitespace-nowrap px-6 py-4 font-normal text-sm font-top-digital-content"
                              >
                                <p>{system[label[0] as keyof TSystem]?.toString()}</p>
                              </td>
                            )
                        )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default SystemLinkDocument;
