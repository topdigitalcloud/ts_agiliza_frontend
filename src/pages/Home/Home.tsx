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

  console.log("Home");

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="flex justify-center items-center container mx-auto">
      {locations && locations.length !== 0 && (
        <div className="text-center flex-1 w-full">
          <h2 className="font-semibold text-top-digital">Meu Mapa</h2>
          <Map locations={locations} />
        </div>
      )}
      {locations && locations.length === 0 && (
        <div className="w-auto text-center py-3">
          <h2 className="font-semibold text-top-digital">Você ainda não tem sites cadastrados</h2>
          <p className="text-top-digital">
            Para cadastrar seus sites{" "}
            <Link className="font-bold hover:text-top-digital-hover" to="/upload">
              clique aqui
            </Link>{" "}
            para acessar nossa página de upload.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
