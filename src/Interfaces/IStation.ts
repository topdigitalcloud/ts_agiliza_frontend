export type TStation = {
  _id: string;
  Label: string;
  Status: string;
  NomeEntidade: string;
  NumFistel: string;
  NumEstacao: string;
  NumServico: string;
  EnderecoEstacao: string;
  EndComplemento: string;
  SiglaUf: string;
  CodMunicipio: string;
  Tecnologia: string;
  tipoTecnologia: string;
  meioAcesso: string;
  CodTipoClasseEstacao: string;
  ClassInfraFisica: string;
  CompartilhamentoInfraFisica: string;
  AlturaAntena: string;
  CodEquipamentoTransmissor: string;
  PotenciaTransmissorWatts: string;
  Latitude: string;
  Longitude: string;
  CodDebitoTFI: string;
  DataLicenciamento: string;
  DataPrimeiroLicenciamento: string;
  NumRede: string;
  DataValidade: string;
  NumFistelAssociado: string;
  NomeEntidadeAssociado: string;
};

export interface IStationStates {
  labels: string[];
  stations: TStation[];
  station: TStation | null;
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
  page: number;
  pageCount: number;
}
