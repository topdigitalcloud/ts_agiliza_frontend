export type TLocation = {
  _id: string;
  Latitude: string;
  Longitude: string;
  EnderecoEstacao: string;
};

export interface ILocationStates {
  locations: TLocation[];
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
}
