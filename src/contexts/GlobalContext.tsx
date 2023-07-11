import { createContext, ReactNode, useReducer } from "react";
import { ActionGlobalState, GlobalContextType, GlobalState } from "../Interfaces/IGlobalState";

const globalStateReducer = (state: GlobalState, action: ActionGlobalState): GlobalState => {
  switch (action.type) {
    case "CLOSE_LABEL_SYSTEM_FORM": {
      return { ...state, openedLabelSystemForm: false };
    }
    case "SET_LABEL_SYSTEM": {
      return { ...state, labelSystem: action.labelSystem };
    }
    case "CLOSE_SYSTEM_DETAILS_AND_LABEL_SYSTEM_FORM": {
      return { ...state, openedSystemDetails: false, openedLabelSystemForm: false };
    }
    case "OPEN_LABEL_SYSTEM_FORM": {
      return {
        ...state,
        openedLabelSystemForm: true,
        openedSystemDetails: false,
        idSystem: action.idSystem,
        labelSystem: action.labelSystem,
      };
    }
    case "OPEN_SYSTEM_DETAILS": {
      return {
        ...state,
        idSystem: action.idSystem,
        openedSystemDetails: true,
      };
    }
  }
  return state;
};

//   openedLabelSystemForm: true,
//   openedSystemDetails: false,
//   idSystem: idSystem,
//   labelSystem: label,

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const initialState: GlobalState = {
    openedLabelSystemForm: false,
    openedSystemDetails: false,
    labelSystem: "",
    idSystem: "",
  };

  const [globalState, dispatchGlobalState] = useReducer(globalStateReducer, initialState);

  // const [globalState, setGlobalState] = useState({
  //   openedLabelSystemForm: false,
  //   openedSystemDetails: false,
  //   labelSystem: "",
  //   idSystem: "",
  // });
  return <GlobalContext.Provider value={{ globalState, dispatchGlobalState }}>{children}</GlobalContext.Provider>;
};
