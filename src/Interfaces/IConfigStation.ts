export type TConfigStation = {
  _id: string;
  campo: string;
  label: string;
  order: number;
  visible: boolean;
};

export interface IConfigStationStates {
  config: TConfigStation[];
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
}
