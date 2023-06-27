export type TStation = {
  _id: string;
  Label: string;
  NumEstacao: string;
  EnderecoEstacao: string;
  SiglaUf: string;
  CodMunicipio: string;
  Latitude: string;
  Longitude: string;
  NomeEntidade: string;
  NumFistel: string;
  NumServico: string;
  CodTipoClasseEstacao: string;
  CompartilhamentoInfraFisica: string;
  EndComplemento: string;
  NomeEntidadeAssociado: string;
  NumFistelAssociado: string;
};

export interface IStationStates {
  labels: string[];
  stations: TStation[];
  station: TStation | null;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
  page: number;
  pageCount: number;
}
