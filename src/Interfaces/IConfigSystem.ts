export type TConfigSystem = {
  _id: string;
  campo: string;
  label: string;
  order: number;
  visible: boolean;
};

export interface IConfigSystemStates {
  config: TConfigSystem[];
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
}
