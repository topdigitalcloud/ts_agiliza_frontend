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
      <div className="hidden md:block">
        <div className="flex relative">
          <h1 className="text-xl text-top-digital font-semibold mb-2 font-top-digital-title">
            Sistemas instalados na Estação
          </h1>
          <div className="flex gap-2 justify-center items-center absolute m-auto w-full h-full">
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
      </div>
      <div className="md:hidden block">
        <div className="flex justify-center items-center">
          <h1 className="text-base text-top-digital font-semibold mb-2 font-top-digital-title">
            Sistemas instalados na Estação
          </h1>
        </div>
        <div className="flex w-full">
          <div className="flex gap-2 whitespace-nowrap justify-start items-center">
            <button title="Voltar" disabled={page === 1 || loading === true} onClick={handlePrevious}>
              <SkipBack className="text-top-digital hover:text-top-digital-hover" />
            </button>
            <button title="Avançar" disabled={page === pageCount || loading === true} onClick={handleNext}>
              <SkipForward className="text-top-digital hover:text-top-digital-hover" />
            </button>
          </div>
          <div className="flex-grow text-right font-top-digital-content">
            Página {page} de {pageCount}
          </div>
        </div>
      </div>
      {!loading && <SystemTable systems={systems} labels={labels} />}
      {loading && <div>Aguarde.....</div>}
      <div className="mb-14"></div>
    </>
  );
};

export default System;
