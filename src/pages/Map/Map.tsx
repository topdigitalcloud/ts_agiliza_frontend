//Google maps react
import { GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from "@react-google-maps/api";

//hooks
import { useState, useCallback, useRef } from "react";

//url for logo
import { urlapp } from "../../utils/config";

//preciso analisar essa importação para entender o que ela faz
//lembrei - tem a ver com event listener do DOM
//Depois vou verificar mais a fundo
import addPassiveSupport from "../../utils/passiveSupport";

//types
import { TBounds, TCoordInfo, TLocation } from "../../Interfaces/ILocation";

//components
//import Equipment from "../Equipment/Equipment";
import Station from "../Station/Station";
import InfoWindowStations from "../../components/Map/InfoWindowStations";

//context
import { useGlobalContext } from "../../hooks/useGlobalContext";

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
  const map = useRef<any>(null);
  const [iniDrag, setIniDrag] = useState<TBounds | null>(null);
  const [visibleLocations, setVisibleLocations] = useState<TLocation[]>(locations);
  const [zoom, setZoom] = useState(0);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  //context
  const { globalState, dispatchGlobalState } = useGlobalContext();

  const onLoad = useCallback(
    (mapInstance: any) => {
      const storedCoords = localStorage.getItem("coords");
      //console.log(storedCoords);
      const coords: TBounds | null = storedCoords ? JSON.parse(storedCoords) : null;
      const bounds = new google.maps.LatLngBounds();
      if (coords !== null) {
        bounds.extend(new google.maps.LatLng(coords.Latitude.North, coords.Longitude.East));
        bounds.extend(new google.maps.LatLng(coords.Latitude.South, coords.Longitude.Weast));
      } else {
        locations.forEach((loc) => {
          bounds.extend(new google.maps.LatLng(parseFloat(loc.Latitude), parseFloat(loc.Longitude)));
        });
      }
      mapInstance.fitBounds(bounds, 0);
      map.current = mapInstance;
    },
    [locations]
  );

  const getStationsVisible = (): void => {
    const { current } = coordInfo();

    localStorage.setItem("coords", JSON.stringify(current));
    const visible: TLocation[] = [];
    for (const station of locations) {
      const latitude = parseFloat(station.Latitude);
      const longitude = parseFloat(station.Longitude);
      if (
        latitude > current.Latitude.South &&
        latitude < current.Latitude.North &&
        longitude > current.Longitude.Weast &&
        longitude < current.Longitude.East
      ) {
        visible.push(station);
      }
    }
    setVisibleLocations([...visible]);
    const newZoom = map.current.getZoom(); // Use a referência do mapa para obter o novo valor de zoom
    setZoom(newZoom);
  };

  const setMapCoordenates = () => {
    const { current } = coordInfo();
    localStorage.setItem("coords", JSON.stringify(current));
  };

  const setDragStart = (): void => {
    const ne = map.current.getBounds().getNorthEast();
    const sw = map.current.getBounds().getSouthWest();
    const ini: TBounds = {
      Latitude: {
        North: ne.lat(),
        South: sw.lat(),
      },
      Longitude: {
        Weast: sw.lng(),
        East: ne.lng(),
      },
    };
    setIniDrag(ini);
  };

  const coordInfo = (): TCoordInfo => {
    const ne = map.current.getBounds().getNorthEast();
    const sw = map.current.getBounds().getSouthWest();

    const storedCoords = localStorage.getItem("coords") || "";
    const last: TBounds | null = storedCoords ? JSON.parse(storedCoords) : null;

    const current: TBounds = {
      Latitude: {
        North: ne.lat(),
        South: sw.lat(),
      },
      Longitude: {
        Weast: sw.lng(),
        East: ne.lng(),
      },
    };

    const CheckDragged: boolean = JSON.stringify(current) !== JSON.stringify(iniDrag) && iniDrag !== null;

    const change: boolean = storedCoords !== JSON.stringify(current) || CheckDragged;

    if (change) {
      localStorage.setItem("page", "1");
    }
    return {
      last,
      current,
      isChanged: change,
    };
  };

  //fim do processo de montagem do mapa

  //Manipulações após carregamento do mapa
  const handleInfoWindow = (lat: string, lng: string) => {
    //addPassiveSupport(false, true, true, false);
    if (lat === globalState.latInfoWindow && lng === globalState.lngInfoWindow) {
      return;
    }
    dispatchGlobalState({ type: "SET_INFOWINDOW_COORD", lat: lat, lng: lng });
    //setVisibleStations([marker]);
  };

  function isVisible(lat: string, lng: string) {
    for (let i = 0; i < visibleLocations.length; i++) {
      if (visibleLocations[i].Latitude === lat && visibleLocations[i].Longitude === lng) {
        return true;
      }
    }
    return false; // Retorna null se a latitude não for encontrada
  }

  return (
    <>
      <div className="h-[45vh] w-full" id="map_principal">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            ref={map}
            mapContainerClassName="h-[45vh] w-full"
            onLoad={onLoad}
            onDragEnd={getStationsVisible}
            onDragStart={setDragStart}
            onBoundsChanged={setMapCoordenates}
            onZoomChanged={getStationsVisible}
          >
            {locations &&
              locations.map((eq) => (
                <MarkerF
                  key={`${eq.Latitude}${eq.Longitude}`}
                  position={{
                    lat: parseFloat(eq.Latitude),
                    lng: parseFloat(eq.Longitude),
                  }}
                  icon={`${urlapp}/img/radio-tower.svg`}
                  onClick={(e) => handleInfoWindow(eq.Latitude, eq.Longitude)}
                  //onPositionChanged={() => handleInfoWindow(eq)}
                >
                  {(globalState.latInfoWindow === eq.Latitude && globalState.lngInfoWindow === eq.Longitude) ||
                  (zoom > 16 && isVisible(eq.Latitude, eq.Longitude)) ? (
                    <InfoWindow
                      options={{ disableAutoPan: true }}
                      position={{ lat: parseFloat(eq.Latitude), lng: parseFloat(eq.Longitude) }}
                      onCloseClick={() => {
                        dispatchGlobalState({ type: "CLEAN_INFOWINDOW_COORD" });
                      }}
                    >
                      <InfoWindowStations location={eq} />
                    </InfoWindow>
                  ) : null}
                </MarkerF>
              ))}
          </GoogleMap>
        )}
      </div>
      <div className="mt-2 h-full w-full overflow-y-auto">
        <Station visibleLocations={visibleLocations} />
      </div>
    </>
  );
};

export default Map;
