export type TConfigSystem = {
  _id: string;
  campo: string;
  label: string;
  order: number;
  visible: boolean;
};

export interface IConfigSystemStates {
  config: TConfigSystem[];
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
}
