export type TLocation = {
  _id: string;
  Latitude: string;
  Longitude: string;
  Info: {
    _id: string;
    EnderecoEstacao: string;
    Label?: StringConstructor;
  };
};

export type TBounds = {
  Latitude: {
    North: number;
    South: number;
  };
  Longitude: {
    Weast: number;
    East: number;
  };
};

export interface TCoordInfo {
  last: TBounds | null;
  current: TBounds;
  isChanged: boolean;
}

export interface ILocationStates {
  locations: TLocation[];
  page: number;
  setstate: boolean;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
}
