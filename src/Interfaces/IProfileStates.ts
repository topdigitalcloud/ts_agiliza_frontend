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
  error: any;
  success: boolean;
  loading: boolean;
}
