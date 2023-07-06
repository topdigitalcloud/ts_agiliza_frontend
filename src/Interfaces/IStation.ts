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
  CompartilhamentoInfraFisica: string;
  EndComplemento: string;
  NomeEntidadeAssociado: string;
  NumFistelAssociado: string;
};

export type TUpload = {
  firstStep: {
    status: boolean;
    error: boolean;
    message: string;
  };
  secondStep: {
    status: boolean;
    totalLines: number;
    currentLine: number;
    currentEnableLines: number;
    currentProblemLines: number;
    error: boolean;
    message: "";
  };
  thirdStep: {
    status: boolean;
    insertEquipments: boolean;
  };
  fourthStep: {
    status: boolean;
    totalStations: number;
    totalNewStations: number;
    totalUpdatedStations: number;
    totalNoChangedStations: number;
    totalSystems: number;
    totalNewSystems: number;
    totalUpdatedSystems: number;
    totalNoChangedSystems: number;
    error: boolean;
    message: string;
  };
};

// thirdStep: {
//   insertEquipments: false,
// },
// fourthStep: {
//   status: false,
//   totalStations: 0,
//   totalNewStations: 0,
//   totalUpdatedStations: 0,
//   totalNoChangedStations: 0,
//   totalSystems: 0,
//   totalNewSystems: 0,
//   totalUpdatedSystems: 0,
//   totalNoChangedSystems: 0,
//   error: false,
//   message: "",
// },

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
  uploadProgress: number;
}
