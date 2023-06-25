import { TSystem } from "./ISystem";

export interface ILinkStationDocStates {
  labels: string[];
  systemsToLink: TSystem[];
  systemToLink: TSystem | null;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
  page: number;
  pageCount: number;
}
