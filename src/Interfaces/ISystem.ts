export type TSystem = {
  _id: string;
  Label: string;
  NumAto: string;
  DesignacaoEmissao: string;
  FreqTxMHz: string;
  FreqRxMHz: string;
  Azimute: string;
  CodTipoAntena: string;
  CodEquipamentoAntena: string;
  GanhoAntena: string;
  FrenteCostaAntena: string;
  AnguloMeiaPotenciaAntena: string;
  AnguloElevacao: string;
  Polarizacao: string;
  AlturaAntena: string;
};

export interface ISystemStates {
  labels: string[];
  systems: TSystem[];
  system: TSystem | null;
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
  page: number;
  pageCount: number;
}
