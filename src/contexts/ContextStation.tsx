import { createContext, ReactNode, useState } from "react";
import { GlobalStateSystem } from "../Interfaces/ISystemState";

export const ContextSystem = createContext<GlobalStateSystem>({} as GlobalStateSystem);

export const ContextSystemProvider = ({ children }: { children: ReactNode }) => {
  const [systemGlobalState, setSystemGlobalState] = useState({
    openedLabelSystemForm: false,
    openedSystemDetails: false,
    labelSystem: "",
    idSystem: "",
  });
  return (
    <ContextSystem.Provider value={{ systemGlobalState, setSystemGlobalState }}>{children}</ContextSystem.Provider>
  );
};
