import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

export type TLabelSystem = {
  openedLabelSystemForm: boolean;
  labelSystem: string;
  idSystem: string;
};

export interface LabelSystem {
  labelSystem: TLabelSystem;
  setLabelSystem: Dispatch<SetStateAction<TLabelSystem>>;
}

export const ContextSystem = createContext<LabelSystem>({} as LabelSystem);

export const ContextSystemProvider = ({ children }: { children: ReactNode }) => {
  const [labelSystem, setLabelSystem] = useState({
    openedLabelSystemForm: false,
    labelSystem: "",
    idSystem: "",
  });
  return <ContextSystem.Provider value={{ labelSystem, setLabelSystem }}>{children}</ContextSystem.Provider>;
};
