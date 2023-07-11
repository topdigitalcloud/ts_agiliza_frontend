import { useParams } from "react-router-dom";

//redux
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//hooks
import { useEffect } from "react";

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

//redux
//primeira parte do componente: config e station
import { getVisibleFields } from "../../slices/ConfigStationSlice";
import { stationSelector, getStationById } from "../../slices/StationSlice";

import { systemSelector } from "../../slices/SystemSlice";
import { getDocTypes } from "../../slices/DocumentTypeSlice";

//pages
import System from "../System/System";
import SystemLinkDocument from "../System/SystemLinkDocument";
import EditStationLabel from "../../components/Station/EditStationLabel";
import SystemDetails from "../System/SystemDetails";
import StationDetails from "../../components/Station/StationDetails";
import EditSystemLabel from "../../components/System/EditSystemLabel";
import Documents from "../../components/Document/Documents";

const StationPage = () => {
  //redux system
  const { success: successSystem } = useAppSelector(systemSelector);

  //global context
  const { globalState } = useGlobalContext();

  /*INICIO PRIMEIRA PARTE DO COMPOMENTE*/
  //id da station
  const { id } = useParams();
  //distatchs da parte inicial do componente
  const dispatchConfig = useAppDispatch();
  const dispatchStation = useAppDispatch();
  //selecionando os atributos de config e station para ser usado

  const { station, success } = useAppSelector(stationSelector);

  //chamando o reducer para config
  useEffect(() => {
    dispatchConfig(getVisibleFields());
  }, [dispatchConfig]);
  //chamando o reducer para station
  useEffect(() => {
    dispatchStation(getStationById(id));
  }, [id, dispatchStation, success, globalState.openedLabelStationForm]);
  /*FIM PRIMEIRA PARTE*/

  const dispatchTypes = useAppDispatch();

  useEffect(() => {
    dispatchTypes(getDocTypes());
  }, [dispatchTypes]);

  return (
    <div className="container mx-auto">
      {/* main container */}
      <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap ">
        {/* grid 1 */}
        <div className="bg-white m-2 flex-1 border order-2 md:order-1 overflow-x-auto relative">
          <StationDetails />
          {globalState.openSystemLinkForm && <SystemLinkDocument />}
          {station && globalState.openedLabelStationForm && <EditStationLabel />}
          {station && globalState.openedLabelSystemForm && <EditSystemLabel />}
          {station && globalState.openedSystemDetails && <SystemDetails systemId={globalState.idSystem} />}
        </div>
        {/* grid2 */}
        <div
          className={`bg-white border p-2 m-2 flex-1 order-1 md:order-2 ${
            globalState.openedLabelSystemForm || globalState.openedLabelStationForm || globalState.openedSystemDetails
              ? "hidden md:block"
              : ""
          }`}
        >
          <Documents id={id || ""} />
        </div>
      </div>

      {/* grid 3 */}
      <div className="mt-2 w-full h-[50vh] overflow-y-auto border-2">
        <System stationId={id} refreshSystems={successSystem} />
      </div>
    </div>
  );
};

export default StationPage;
