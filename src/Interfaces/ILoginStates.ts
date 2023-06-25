export type TLogin = {
  _id: string;
  token: string;
};

export interface ILoginStates {
  user: TLogin | null;
  error: boolean;
  message: string;
  success: boolean;
  loading: boolean;
}
