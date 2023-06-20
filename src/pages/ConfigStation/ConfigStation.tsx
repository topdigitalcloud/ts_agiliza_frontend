//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useEffect } from "react";

//redux
import { reset, getConfig, configSelector } from "../../slices/ConfigStationSlice";

//components
import TableStationConfig from "./TableStationConfig";

type Props = {};

const ConfigStation = (props: Props) => {
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(configSelector);

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(reset());
    }
  }, [success, dispatch]);

  return <TableStationConfig />;
};

export default ConfigStation;
