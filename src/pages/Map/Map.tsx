//Google maps react
import { GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from "@react-google-maps/api";

//hooks
import { useState, useCallback, useMemo, useEffect } from "react";

//preciso analisar essa importação para entender o que ela faz
//lembrei - tem a ver com event listener do DOM
//Depois vou verificar mais a fundo
import addPassiveSupport from "../../utils/passiveSupport";

//types
import { TLocation } from "../../Interfaces/ILocation";

//components
//import Equipment from "../Equipment/Equipment";
import Equipment from "../Equipment/Equipment";

//context of locations
//import { VisibleLocationContext } from "../../context/VisibleLocationContext";

//parameters: touchstart, wheel, mousewheel, touchmove
addPassiveSupport(true, false, false, true);

//a chave da API do maps tipada para o TypeScript não estressar
const googleMapsApiKey: string = String(process.env.REACT_APP_GOOGLE_API_KEY) || "";

type Props = {
  locations: TLocation[];
};

const Map = ({ locations }: Props) => {
  //Montagem do Mapa
  //Usando Hooks para evitar reenderização desnecessária do Mapa
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  const [map, setMap] = useState<any>(null);
  const [visibleLocations, setVisibleLocations] = useState<TLocation[]>(locations);

  const center = useMemo(() => ({ lat: -20.094740870640535, lng: -43.79375384711474 }), []);
  const zoom = useMemo(() => 10, []);

  const onLoad = useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const getEquipmentsVisible = () => {
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();
    const visible: TLocation[] = [];
    for (const location of locations) {
      const latitude = parseFloat(location._id.latitude);
      const longitude = parseFloat(location._id.longitude);
      if (latitude > sw.lat() && latitude < ne.lat() && longitude > sw.lng() && longitude < ne.lng()) {
        visible.push(location);
      }
    }
    setVisibleLocations([...visible]);
  };

  //fim do processo de montagem do mapa

  //Manipulações após carregamento do mapa
  const [infoWindow, setInfoWindow] = useState("");

  const handleInfoWindow = (marker: TLocation) => {
    //addPassiveSupport(false, true, true, false);
    if (marker._id.latitude === infoWindow) {
      return;
    }
    setInfoWindow(marker._id.latitude);
    setVisibleLocations([marker]);
  };

  return (
    <>
      <div className="h-[45vh] w-full" id="map_principal">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="w-full h-full"
            onLoad={onLoad}
            onUnmount={onUnmount}
            onDragEnd={map !== null ? getEquipmentsVisible : () => {}}
            onZoomChanged={map !== null ? getEquipmentsVisible : () => {}}
            zoom={zoom}
            center={center}
          >
            {locations &&
              locations.map((eq) => (
                <MarkerF
                  key={eq._id.latitude}
                  position={{
                    lat: parseFloat(eq._id.latitude),
                    lng: parseFloat(eq._id.longitude),
                  }}
                  title={eq._id.enderecoEstacao}
                  icon="img/radio-tower.svg"
                  onClick={(e) => handleInfoWindow(eq)}
                >
                  {infoWindow && infoWindow === eq._id.latitude ? (
                    <InfoWindow onCloseClick={() => setInfoWindow("")}>
                      <div className="border p-2  bg-top-digital bg-opacity-25" key={`${eq._id.latitude}`}>
                        <h1 className="font-semibold uppercase">{eq._id.enderecoEstacao}</h1>
                      </div>
                    </InfoWindow>
                  ) : null}
                </MarkerF>
              ))}
          </GoogleMap>
        )}
      </div>
      <div className="mt-2 h-full w-full overflow-y-auto">
        <Equipment visibleLocations={visibleLocations} />
      </div>
    </>
  );
};

export default Map;
