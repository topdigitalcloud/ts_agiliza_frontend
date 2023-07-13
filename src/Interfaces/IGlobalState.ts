export type GlobalState = {
  //station states
  openedLabelStationForm: boolean;
  labelStation: string;
  //system states
  openedLabelSystemForm: boolean;
  labelSystem: string;
  openedSystemDetails: boolean;
  idSystem: string;
  //map states
  latInfoWindow: string;
  lngInfoWindow: string;
  //document states
  openSystemLinkForm: boolean;
  openedUploadForm: boolean;
  documentId: string;
  //mode app
  newTailwindDesign: boolean;
};

export type ActionGlobalState =
  | { type: "OPEN_LABEL_STATION_FORM" }
  | { type: "CLOSE_LABEL_STATION_FORM" }
  | { type: "SET_LABEL_STATION"; labelStation: string }
  | { type: "OPEN_LABEL_SYSTEM_FORM"; labelSystem: string; idSystem: string }
  | { type: "CLOSE_LABEL_SYSTEM_FORM" }
  | { type: "OPEN_SYSTEM_DETAILS"; idSystem: string }
  | { type: "CLOSE_SYSTEM_DETAILS" }
  | { type: "CLOSE_SYSTEM_DETAILS_AND_LABEL_SYSTEM_FORM" }
  | { type: "SET_LABEL_SYSTEM"; labelSystem: string }
  | { type: "SET_INFOWINDOW_COORD"; lat: string; lng: string }
  | { type: "CLEAN_INFOWINDOW_COORD" }
  | { type: "OPEN_SYSTEM_LINK_FORM"; idDocument: string }
  | { type: "CLOSE_SYSTEM_LINK_FORM"; idDocument: string }
  | { type: "OPEN_UPLOAD_DOC_FORM" }
  | { type: "CLOSE_UPLOAD_DOC_FORM" };

export type GlobalContextType = {
  globalState: GlobalState;
  dispatchGlobalState: React.Dispatch<ActionGlobalState>;
};
