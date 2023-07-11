import { createContext, ReactNode, useReducer } from "react";
import { ActionGlobalState, GlobalContextType, GlobalState } from "../Interfaces/IGlobalState";

const globalStateReducer = (state: GlobalState, action: ActionGlobalState): GlobalState => {
  switch (action.type) {
    //Open Label Station form in Station Page
    case "OPEN_LABEL_STATION_FORM": {
      return {
        ...state,
        openedLabelStationForm: true,
      };
    }
    //close station form
    case "CLOSE_LABEL_STATION_FORM": {
      return { ...state, openedLabelStationForm: false };
    }
    //set no label name
    case "SET_LABEL_STATION": {
      return { ...state, labelStation: action.labelStation };
    }
    //Open Label System form in Station Page
    case "OPEN_LABEL_SYSTEM_FORM": {
      return {
        ...state,
        openedLabelSystemForm: true,
        openedSystemDetails: false,
        idSystem: action.idSystem,
        labelSystem: action.labelSystem,
      };
    }
    //Open system details in Station page
    case "OPEN_SYSTEM_DETAILS": {
      return {
        ...state,
        idSystem: action.idSystem,
        openedSystemDetails: true,
      };
    }
    //Close label system form in station page
    case "CLOSE_LABEL_SYSTEM_FORM": {
      return { ...state, openedLabelSystemForm: false };
    }
    //close all system screens
    case "CLOSE_SYSTEM_DETAILS_AND_LABEL_SYSTEM_FORM": {
      return { ...state, openedSystemDetails: false, openedLabelSystemForm: false };
    }
    //set no label name
    case "SET_LABEL_SYSTEM": {
      return { ...state, labelSystem: action.labelSystem };
    }
    case "SET_INFOWINDOW_COORD": {
      return { ...state, latInfoWindow: action.lat, lngInfoWindow: action.lng };
    }
    case "CLEAN_INFOWINDOW_COORD": {
      return { ...state, latInfoWindow: "", lngInfoWindow: "" };
    }
    case "OPEN_SYSTEM_LINK_FORM": {
      return { ...state, openSystemLinkForm: true, documentId: action.idDocument };
    }
    case "CLOSE_SYSTEM_LINK_FORM": {
      return { ...state, openSystemLinkForm: false, documentId: action.idDocument };
    }
    case "OPEN_UPLOAD_DOC_FORM": {
      return { ...state, openedUploadForm: true };
    }
    case "CLOSE_UPLOAD_DOC_FORM": {
      return { ...state, openedUploadForm: false };
    }
  }
  return state;
};
// | { type: "SET_INFOWINDOW_COORD"; lat: string; lng: string }
// | { type: "CLEAN_INFOWINDOW_COORD"; lat: string; lng: string };
// latInfoWindow: string;
// lngInfoWindow: string;
export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const initialState: GlobalState = {
    //Station States
    openedLabelStationForm: false,
    labelStation: "",
    //System States
    openedLabelSystemForm: false,
    openedSystemDetails: false,
    labelSystem: "",
    idSystem: "",
    //map states
    latInfoWindow: "",
    lngInfoWindow: "",
    //documents states
    openSystemLinkForm: false,
    openedUploadForm: false,
    documentId: "",
  };

  const [globalState, dispatchGlobalState] = useReducer(globalStateReducer, initialState);
  console.log(globalState);

  // const [globalState, setGlobalState] = useState({
  //   openedLabelSystemForm: false,
  //   openedSystemDetails: false,
  //   labelSystem: "",
  //   idSystem: "",
  // });
  return <GlobalContext.Provider value={{ globalState, dispatchGlobalState }}>{children}</GlobalContext.Provider>;
};
