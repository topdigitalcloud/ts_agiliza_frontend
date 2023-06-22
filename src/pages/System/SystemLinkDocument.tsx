import React from "react";
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { systemSelector, getSystemsByStation } from "../../slices/SystemSlice";

type Props = {
  setOpenSystemLinkForm: Dispatch<SetStateAction<boolean>>;
  stationId: string | undefined;
  documentId: string;
};

const SystemLinkDocument = ({ setOpenSystemLinkForm, stationId, documentId }: Props) => {
  setOpenSystemLinkForm(true);
  const dispatch = useAppDispatch();
  const { systems, labels, loading, page: apiPage, pageCount: apiPageCount } = useAppSelector(systemSelector);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    setPage(() => apiPage);
  }, [apiPage]);

  useEffect(() => {
    setPageCount(() => apiPageCount);
    setPage(() => 1);
  }, [apiPageCount]);

  useEffect(() => {
    if (typeof stationId === "string") {
      const objData = {
        stationId,
        page,
      };
      dispatch(getSystemsByStation(objData));
    }
  }, [stationId, page, dispatch]);

  const handlePrevious = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  };

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
                        {label[0] === "Label" && (
                          <div className="w-full text-center">
                            <button
                              className="underline hover:text-top-digital-link-hover"
                              title="Coloque um apelido na Estação"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {system[label[0]] === "" ? <p>Edit</p> : system[label[0]]}
                            </button>
                          </div>
                        )}
                        Label
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

export default SystemLinkDocument;
