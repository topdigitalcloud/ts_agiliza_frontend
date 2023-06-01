export type TRegister = {
  _id: string;
};

export type TRegisterFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface IRegisterStates {
  user: TRegister | null;
  error: any;
  success: boolean;
  loading: boolean;
}
