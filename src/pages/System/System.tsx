import { useEffect, useState, MouseEvent } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { systemSelector, getSystemsByStation } from "../../slices/SystemSlice";

//icons
import { SkipBack, SkipForward } from "lucide-react";

//component
import SystemTable from "./SystemTable";

type Props = {
  stationId: string | undefined;
  refreshSystems: boolean;
};

const System = ({ stationId, refreshSystems }: Props) => {
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
  }, [stationId, page, dispatch, refreshSystems]);

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
      <div className="flex relative">
        <h1 className="text-xl text-top-digital font-semibold mb-2 font-top-digital-title">
          Sistemas instalados da Estação
        </h1>
        <div className="flex gap-2 justify-center items-center absolute left-0 right-0 m-auto w-full h-full">
          <button title="Voltar" disabled={page === 1 || loading === true} onClick={handlePrevious}>
            <SkipBack className="text-top-digital hover:text-top-digital-hover" />
          </button>
          <button title="Avançar" disabled={page === pageCount || loading === true} onClick={handleNext}>
            <SkipForward className="text-top-digital hover:text-top-digital-hover" />
          </button>
        </div>
        <div className="flex-1 text-right font-top-digital-content">
          Página {page} de {pageCount}
        </div>
      </div>
      {!loading && <SystemTable systems={systems} labels={labels} />}
      {loading && <div>Aguarde.....</div>}
      <div className="mb-14"></div>
    </>
  );
};

export default System;
