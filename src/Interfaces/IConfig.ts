export type TConfig = {
  _id: string;
  campo: string;
  label: string;
  order: number;
  visible: boolean;
};

export interface IConfigStates {
  config: TConfig[];
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
}
