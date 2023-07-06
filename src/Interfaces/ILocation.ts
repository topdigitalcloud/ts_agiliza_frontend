export type TLocation = {
  Latitude: string;
  Longitude: string;
  stations: Array<{
    _id: string;
    NumEstacao: string;
    EnderecoEstacao: string;
    Label?: string;
  }>;
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
