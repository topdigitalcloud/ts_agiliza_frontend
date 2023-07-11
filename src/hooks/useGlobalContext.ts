import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { GlobalContextType } from "../Interfaces/IGlobalState";

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  return context;
};
