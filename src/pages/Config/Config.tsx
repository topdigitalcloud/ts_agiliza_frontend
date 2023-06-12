//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useState, useEffect } from "react";

//redux
import { reset, getConfig, setConfig, configSelector } from "../../slices/ConfigSlice";

//components
import TableConfig from "./TableConfig";

type Props = {};

const Config = (props: Props) => {
  const dispatch = useAppDispatch();
  const { config, loading, success, error } = useAppSelector(configSelector);

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
