import { useEffect, useState, MouseEvent } from "react";
import { TLocation } from "../../Interfaces/ILocation";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { stationSelector, getVisibleStations } from "../../slices/StationSlice";

//icons
import { SkipBack, SkipForward } from "lucide-react";

//component
import StationTable from "../../components/Station/StationTable";

type Props = {
  visibleLocations: TLocation[] | [];
  handleInfoWindow: (lat: string, lng: string) => void;
};

const Station = ({ visibleLocations, handleInfoWindow }: Props) => {
  const dispatch = useAppDispatch();
  const { stations, labels, loading, pageCount: apiPageCount } = useAppSelector(stationSelector);
  const lastPage = localStorage.getItem("page") || "1";
  const [resetVisbleStations, setResetVisibleStations] = useState<boolean>(true);

  const [page, setPage] = useState<number>(parseInt(lastPage));
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const startPage = localStorage.getItem("page");
    if (startPage !== null) {
      setPage(() => parseInt(startPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", String(page));
  }, [page]);

  useEffect(() => {
    setPageCount(() => apiPageCount);
    const startPage = localStorage.getItem("page");
    if (startPage !== null) {
      setPage(() => parseInt(startPage));
    } else {
      //setPage(() => 1);
    }
  }, [apiPageCount]);

  useEffect(() => {
    if (!resetVisbleStations) return;
    let latLocations: string = "";
    for (const loc of visibleLocations) {
      latLocations += `${loc.Latitude},`;
    }

    const objData = {
      latLocations,
      page,
    };

    dispatch(getVisibleStations(objData));
  }, [visibleLocations, page, dispatch, resetVisbleStations]);

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
      {stations && stations.length !== 0 && (
        <>
          <div className="flex relative border-2">
            <div className="flex gap-2 md:justify-center items-center absolute left-0 right-0 m-auto w-full h-full">
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
          {!loading && (
            <StationTable
              stations={stations}
              labels={labels}
              setResetVisibleStations={setResetVisibleStations}
              handleInfoWindow={handleInfoWindow}
            />
          )}
          {loading && <div>Aguarde.....</div>}
          <div className="mb-14"></div>
        </>
      )}
      {stations && stations.length === 0 && <p className="mt-4 text-top-digital text-base">Nenhuma estação no mapa</p>}
    </>
  );
};

export default Station;
