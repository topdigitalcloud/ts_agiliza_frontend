import { useEffect } from "react";
import { TLocation } from "../../Interfaces/ILocation";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { equipmentSelector, getVisibleEquipments } from "../../slices/EquipmentSlice";

//component
import EquipamentoItem from "../../components/Equipment/EquipamentoItem";

type Props = {
  visibleLocations: TLocation[];
};

// equipamentos: [],
// equipamento: null,
// error: false,
// success: false,
// loading: false,
// message: null,

const Equipment = ({ visibleLocations }: Props) => {
  const dispatch = useAppDispatch();
  const { equipamentos, loading } = useAppSelector(equipmentSelector);

  let latLocations: string = "";
  for (const loc of visibleLocations) {
    latLocations += `${loc._id.latitude},`;
  }

  useEffect(() => {
    if (latLocations !== "") {
      const objLocations = {
        latLocations,
      };
      dispatch(getVisibleEquipments(objLocations));
    }
  }, [latLocations, dispatch]);

  if (loading) {
    return <div>Aguarde.....</div>;
  }

  return (
    <>
      {equipamentos && equipamentos.length !== 0 && (
        <div>
          <table className="shadow-lg bg-white md:w-full text-left">
            <tbody>
              <tr key="loc0">
                <th className="bg-blue-100 border text-left px-8 py-4">NomeEntidade</th>
                <th className="bg-blue-100 border text-left px-8 py-4">AlturaAntena</th>
                <th className="bg-blue-100 border text-left px-8 py-4">DataPrimeiroLicenciamento</th>
              </tr>
            </tbody>
            {equipamentos.map((equipamento) => (
              <EquipamentoItem equipamento={equipamento} />
            ))}
          </table>
        </div>
      )}
    </>
  );
};

export default Equipment;
