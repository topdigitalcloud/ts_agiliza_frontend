//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useEffect } from "react";

//redux
import { reset, getConfig, configSelector } from "../../slices/ConfigSlice";

//components
import TableConfig from "./TableConfig";

type Props = {};

const Config = (props: Props) => {
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

  return <TableConfig />;
};

export default Config;
