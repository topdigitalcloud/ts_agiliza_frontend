import { createContext, useState, ReactNode } from "react";
import { TLocation } from "../Interfaces/ILocation";

export type GlobalLocationsContent = {
  visibleLocations: TLocation[];
  setVisibleLocations: (c: TLocation[]) => void;
};

export const VisibleLocationContext = createContext<GlobalLocationsContent>({
  visibleLocations: [],
  setVisibleLocations: () => {},
});

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const VisibleLocationProvider = ({ children }: Props) => {
  const [visibleLocations, setVisibleLocations] = useState<TLocation[]>([]);

  return (
    <VisibleLocationContext.Provider value={{ visibleLocations, setVisibleLocations }}>
      {children}
    </VisibleLocationContext.Provider>
  );
};

export default VisibleLocationProvider;
