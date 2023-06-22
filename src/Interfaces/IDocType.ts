export type TDocType = {
  _id: string;
  typeName: string;
  toStation: boolean;
  toSystem: boolean;
  amount: number;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface IDocTypeStates {
  docTypes: TDocType[];
  docType: TDocType | null;
  error: any;
  success: boolean;
  loading: boolean;
}
