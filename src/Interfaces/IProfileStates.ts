//
export type TUpdated = {
  _id?: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
};

export interface IUpdateStates {
  user: TUpdated | null;
  error: boolean;
  message: string;
  success: boolean;
  loading: boolean;
}
