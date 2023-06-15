import { useEffect, useState, MouseEvent } from "react";
import { TLocation } from "../../Interfaces/ILocation";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { equipmentSelector, getVisibleEquipments } from "../../slices/EquipmentSlice";

//icons
import { SkipBack, SkipForward } from "lucide-react";

//component
import EquipamentoTable from "../../components/Equipment/EquipmentTable";
import { api } from "../../utils/config";

type Props = {
  visibleLocations: TLocation[];
};

const Equipment = ({ visibleLocations }: Props) => {
  const dispatch = useAppDispatch();
  const { equipamentos, labels, loading, page: apiPage, pageCount: apiPageCount } = useAppSelector(equipmentSelector);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    setPage(() => apiPage);
  }, [apiPage]);

  useEffect(() => {
    setPageCount(() => apiPageCount);
    setPage(() => 1);
  }, [apiPageCount]);

  console.log(page, pageCount);

  useEffect(() => {
    let latLocations: string = "";
    for (const loc of visibleLocations) {
      latLocations += `${loc._id.latitude},`;
    }

    if (latLocations !== "") {
      const objData = {
        latLocations,
        page,
      };

      dispatch(getVisibleEquipments(objData));
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
    //e.currentTarget.disabled = true;
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  };
  console.log("Equipment");
  return (
    <>
      <div className="flex relative">
        <div className="flex gap-2 justify-center items-center absolute left-0 right-0 m-auto w-full h-full">
          <button title="Voltar" disabled={page === 1 || loading === true} onClick={handlePrevious}>
            <SkipBack />
          </button>
          <button title="Avançar" disabled={page === pageCount || loading === true} onClick={handleNext}>
            <SkipForward />
          </button>
        </div>
        <div className="flex-1 text-right">
          Página {page} de {pageCount}
        </div>
      </div>
      {!loading && <EquipamentoTable equipamentos={equipamentos} labels={labels} />}
      {loading && <div>Aguarde.....</div>}
    </>
  );
};

export default Equipment;
