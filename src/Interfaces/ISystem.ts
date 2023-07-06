export type TSystem = {
  _id: string;
  Label: string;
  FreqTxMHz: string;
  FreqRxMHz: string;
  DataValidade: Date;
  NumAto: string;
  PotenciaTransmissorWatts: string;
  DesignacaoEmissao: string;
  CodTipoAntena: string;
  AlturaAntena: string;
  Azimute: string;
  AnguloElevacao: string;
  Polarizacao: string;
  idAnatel: string;
  CodEquipamentoTransmissor: string;
  CodEquipamentoAntena: string;
  AnguloMeiaPotenciaAntena: string;
  FrenteCostaAntena: string;
  GanhoAntena: string;
  DataLicenciamento: Date;
  DataPrimeiroLicenciamento: Date;
  NumRede: string;
  Status: string;
  Tecnologia: string;
  meioAcesso: string;
  tipoTecnologia: string;
  ClassInfraFisica: string;
  CodDebitoTFI: string;
  CodTipoClasseEstacao: string;
  documents?: string[];
};

export interface ISystemStates {
  labels: string[];
  systems: TSystem[];
  system: TSystem | null;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
  page: number;
  pageCount: number;
}
