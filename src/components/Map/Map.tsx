//Google maps react
import { GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from "@react-google-maps/api";

//hooks
import { useState, useCallback, useRef, useMemo } from "react";

//styles - ideal é ter tudo em tailwind
import "./Map.css";

//preciso analisar essa importação para entender o que ela faz
//lembrei - tem a ver com event listener do DOM
//Depois vou verificar mais a fundo
import addPassiveSupport from "../../utils/passiveSupport";

//types
import { TLocation } from "../../Interfaces/ILocation";

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

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  //fim do processo de montagem do mapa

  //Manipulações após carregamento do mapa
  const [infoWindow, setInfoWindow] = useState("");

  const handleInfoWindow = (marker: string) => {
    addPassiveSupport(false, true, true, false);
    if (marker === infoWindow) {
      return;
    }
    setInfoWindow(marker);
  };

  const center = {
    lat: -20.094740870640535,
    lng: -43.79375384711474,
  };
  return (
    <div className="map" id="map_principal">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map_container"
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onDragEnd={() => console.log(map.getBounds())}
        >
          {locations.map((eq) => (
            <MarkerF
              key={eq._id.latitude}
              position={{
                lat: parseFloat(eq._id.latitude),
                lng: parseFloat(eq._id.longitude),
              }}
              title={eq._id.enderecoEstacao}
              icon="img/radio-tower.svg"
              onClick={(e) => handleInfoWindow(eq._id.latitude)}
            >
              {infoWindow && infoWindow === eq._id.latitude ? (
                <InfoWindow onCloseClick={() => setInfoWindow("")}>
                  <div className="map_info_window" key={`${eq._id.latitude}`}>
                    <h1 className="font-semibold">{eq._id.enderecoEstacao}</h1>
                    <table className="shadow-lg bg-white md:w-full text-left">
                      <tbody>
                        <tr key="equi0">
                          <th className="bg-blue-100 border text-left px-8 py-4">Empresa</th>
                          <th className="bg-blue-100 border text-left px-8 py-4">Altura</th>
                          <th className="bg-blue-100 border text-left px-8 py-4">Data Licenciamento</th>
                        </tr>
                        {/* {eq.Equip.map((equi) => (
                          <>
                            <EquipamentoItem key={equi._id} equipamento={equi} />
                          </>
                        ))} */}
                      </tbody>
                    </table>
                  </div>
                </InfoWindow>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
