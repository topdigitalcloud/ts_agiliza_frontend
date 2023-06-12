import { useEffect } from "react";
import { TLocation } from "../../Interfaces/ILocation";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { equipmentSelector, getVisibleEquipments } from "../../slices/EquipmentSlice";

//component
import EquipamentoTable from "../../components/Equipment/EquipmentTable";

type Props = {
  visibleLocations: TLocation[];
};

const Equipment = ({ visibleLocations }: Props) => {
  const dispatch = useAppDispatch();
  const { equipamentos, labels, loading } = useAppSelector(equipmentSelector);

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

  return <EquipamentoTable equipamentos={equipamentos} labels={labels} />;
};

export default Equipment;
