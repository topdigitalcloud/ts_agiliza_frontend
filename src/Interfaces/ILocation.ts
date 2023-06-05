type Location = {
  latitude: string;
  longitude: string;
  enderecoEstacao: string;
};

export type TLocation = {
  _id: Location;
};

export interface ILocationStates {
  locations: TLocation[];
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
}
