export type GlobalState = {
  openedLabelSystemForm: boolean;
  labelSystem: string;
  openedSystemDetails: boolean;
  idSystem: string;
};

export type ActionGlobalState =
  | { type: "OPEN_LABEL_SYSTEM_FORM"; labelSystem: string; idSystem: string }
  | { type: "CLOSE_LABEL_SYSTEM_FORM" }
  | { type: "OPEN_SYSTEM_DETAILS"; idSystem: string }
  | { type: "CLOSE_SYSTEM_DETAILS" }
  | { type: "CLOSE_SYSTEM_DETAILS_AND_LABEL_SYSTEM_FORM" }
  | { type: "SET_LABEL_SYSTEM"; labelSystem: string }
  | { type: "SET_ID_SYSTEM"; payload: string };

// openedSystemDetails: false,
// openedLabelSystemForm: false,

export type GlobalContextType = {
  globalState: GlobalState;
  dispatchGlobalState: React.Dispatch<ActionGlobalState>;
};
