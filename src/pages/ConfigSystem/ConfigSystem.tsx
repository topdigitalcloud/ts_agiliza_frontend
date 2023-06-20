//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useEffect } from "react";

//redux
import { reset, getConfig, configSelector } from "../../slices/ConfigSystemSlice";

//components
import TableSystemConfig from "./TableSystemConfig";

type Props = {};

const ConfigSystem = (props: Props) => {
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

  return <TableSystemConfig />;
};

export default ConfigSystem;
