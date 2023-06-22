import { TDocType } from "./IDocType";
export type TDocument = {
  _id: string;
  file: string;
  title: string;
  extension: string;
  userId: string;
  equipmentId: string;
  createdAt: Date;
  tipo?: TDocType;
};

export interface IDocumentStates {
  documents: TDocument[];
  document: TDocument | null;
  error: any;
  success: boolean;
  loading: boolean;
}
