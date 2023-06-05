import { Link } from "react-router-dom";

//Hooks
import { useEffect } from "react";

//Hooks Redux
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

//Redux
import { getLocations, locationSelector, resetMessage } from "../../slices/LocationSlice";

//Components
import Map from "../../components/Map/Map";
import LocalItem from "../../components/Equipment/LocalItem";

const Home = () => {
  const dispatch = useAppDispatch();
  const { locations, loading, error, success } = useAppSelector(locationSelector);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div>
      <div className="w-auto text-center py-3">
        <h2 className="font-semibold">Meu Mapa</h2>
        {locations && locations.length !== 0 && <Map locations={locations} />}
      </div>
    </div>
  );
};

export default Home;
