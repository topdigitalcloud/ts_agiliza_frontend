export type TLogin = {
  _id: string;
  token: string;
};

export interface ILoginStates {
  user: TLogin | null;
  error: any;
  success: boolean;
  loading: boolean;
}
