import { Dispatch, SetStateAction } from "react";

export type TSystemGlobalState = {
  openedLabelSystemForm: boolean;
  labelSystem: string;
  openedSystemDetails: boolean;
  idSystem: string;
};

export interface GlobalStateSystem {
  systemGlobalState: TSystemGlobalState;
  setSystemGlobalState: Dispatch<SetStateAction<TSystemGlobalState>>;
}
