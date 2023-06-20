import { useEffect, useState, MouseEvent } from "react";
import { TStation } from "../../Interfaces/IStation";
import { TLocation } from "../../Interfaces/ILocation";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { stationSelector, getVisibleStations } from "../../slices/StationSlice";

//icons
import { SkipBack, SkipForward } from "lucide-react";

//component
import StationTable from "./StationTable";

type Props = {
  visibleLocations: TLocation[];
};

const Station = ({ visibleLocations }: Props) => {
  const dispatch = useAppDispatch();
  const { stations, labels, loading, page: apiPage, pageCount: apiPageCount } = useAppSelector(stationSelector);
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
    let latLocations: string = "";
    for (const loc of visibleLocations) {
      latLocations += `${loc.Latitude},`;
    }

    if (latLocations !== "") {
      const objData = {
        latLocations,
        page,
      };

      dispatch(getVisibleStations(objData));
    }
  }, [visibleLocations, page, dispatch]);

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
      {!loading && <StationTable stations={stations} labels={labels} />}
      {loading && <div>Aguarde.....</div>}
      <div className="mb-14"></div>
    </>
  );
};

export default Station;
