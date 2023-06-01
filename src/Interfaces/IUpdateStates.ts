export type TUpdated = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  bio?: string;
};

export type TUpdateFields = {
  name: string;
  email: string;
};

export interface IUpdateStates {
  user: TUpdated | null;
  error: any;
  success: boolean;
  loading: boolean;
}
