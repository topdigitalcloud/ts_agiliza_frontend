import { Link } from "react-router-dom";
//Hooks
import { useEffect } from "react";

//Hooks Redux
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

//Redux
import { getLocations, locationSelector } from "../../slices/LocationSlice";

//Components
import Map from "../Map/Map";

const Home = () => {
  const dispatch = useAppDispatch();
  const { locations, loading } = useAppSelector(locationSelector);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="flex justify-center items-center mx-auto">
      {locations && locations.length !== 0 && (
        <div className="text-center flex-1 w-full ">
          <h2 className="font-semibold font-top-digital-title text-2xl md:text-3xl text-top-digital my-4">
            Mapa de Estações
          </h2>
          <Map locations={locations} />
        </div>
      )}
      {locations && locations.length === 0 && (
        <div className="w-auto text-center py-3">
          <h2 className="font-semibold text-top-digital">Você ainda não tem estações cadastrados</h2>
          <p className="text-top-digital">
            Para cadastrar uas estações{" "}
            <Link className="font-bold hover:text-top-digital-hover" to="/upload">
              clique aqui
            </Link>{" "}
            para acessar nossa página de upload do CSV Anatel.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
