export type TDocument = {
  file: string;
  title: string;
  extension: string;
  userId: string;
  equipmentId: string;
  createdAt: Date;
};

export interface IDocumentStates {
  documents: TDocument[];
  document: TDocument | null;
  error: any;
  success: boolean;
  loading: boolean;
}
