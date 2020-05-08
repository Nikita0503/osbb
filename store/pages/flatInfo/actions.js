export const FLAT_INFO_GENERAL_DATA = 'FLAT_INFO_GENERAL_DATA';
export const FLAT_INFO_GENERAL_DATA_CLEAR = 'FLAT_INFO_GENERAL_DATA_CLEAR';
export const FLAT_INFO_LODGER_DATA = 'FLAT_INFO_LODGER_DATA';
export const FLAT_INFO_LODGER_DATA_CLEAR = 'FLAT_INFO_LODGER_DATA_CLEAR';
export const FLAT_INFO_PARAMETERS = 'FLAT_INFO_PARAMETERS';
export const FLAT_INFO_PARAMETERS_CLEAR = 'FLAT_INFO_PARAMETERS_CLEAR';
export const FLAT_INFO_PRIVILEGES = 'FLAT_INFO_PRIVILEGES';
export const FLAT_INFO_PRIVILEGES_CLEAR = 'FLAT_INFO_PRIVILEGES_CLEAR';
export const FLAT_INFO_CONTRIBUTIONS = 'FLAT_INFO_CONTRIBUTIONS';
export const FLAT_INFO_CONTRIBUTIONS_CLEAR = 'FLAT_INFO_CONTRIBUTIONS_CLEAR';
export const FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS = 'FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS';
export const FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR = 'FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR';
export const FLAT_INFO_COUNTERS = 'FLAT_INFO_COUNTERS';
export const FLAT_INFO_COUNTERS_CLEAR = 'FLAT_INFO_COUNTERS_CLEAR';
export const FLAT_INFO_CONTRACTS = 'FLAT_INFO_CONTRACTS';
export const FLAT_INFO_CONTRACTS_CLEAR = 'FLAT_INFO_CONTRACTS_CLEAR';

export const setFlatInfoGeneralData = flatInfoGeneralData => ({
  type: FLAT_INFO_GENERAL_DATA,
  payload: flatInfoGeneralData
});

export const setFlatInfoGeneralDataClear = flatInfoGeneralData => ({
  type: FLAT_INFO_GENERAL_DATA_CLEAR,
  payload: []
});

export const setflatInfoLodgerData = flatInfoLodgerData => ({
  type: FLAT_INFO_LODGER_DATA,
  payload: flatInfoLodgerData
});

export const setflatInfoLodgerDataClear = flatInfoLodgerData => ({
  type: FLAT_INFO_LODGER_DATA_CLEAR,
  payload: []
});

export const setFlatInfoParameters = flatInfoParameters => ({
  type: FLAT_INFO_PARAMETERS,
  payload: flatInfoParameters
});

export const setFlatInfoParametersClear = flatInfoParameters => ({
  type: FLAT_INFO_PARAMETERS_CLEAR,
  payload: []
});

export const setFlatInfoPrivileges = flatInfoPrivileges => ({
  type: FLAT_INFO_PRIVILEGES,
  payload: flatInfoPrivileges
});

export const setFlatInfoPrivilegesClear = flatInfoPrivileges => ({
  type: FLAT_INFO_PRIVILEGES_CLEAR,
  payload: []
});

export const setFlatInfoContributions = flatInfoContributions => ({
  type: FLAT_INFO_CONTRIBUTIONS,
  payload: flatInfoContributions
});

export const setFlatInfoContributionsClear = flatInfoContributions => ({
  type: FLAT_INFO_CONTRIBUTIONS_CLEAR,
  payload: []
});

export const setFlatInfoIndividualContributions = flatInfoIndividualContributions => ({
  type: FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS,
  payload: flatInfoIndividualContributions
});

export const setFlatInfoIndividualContributionsClear = flatInfoIndividualContributions => ({
  type: FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR,
  payload: []
});

export const setFlatInfoCounters = flatInfoCounters => ({
  type: FLAT_INFO_COUNTERS,
  payload: flatInfoCounters
});

export const setFlatInfoCountersClear = flatInfoCounters => ({
  type: FLAT_INFO_COUNTERS_CLEAR,
  payload: []
});

export const setFlatInfoContracts = flatInfoContracts => ({
  type: FLAT_INFO_CONTRACTS,
  payload: flatInfoContracts
});

export const setFlatInfoContractsClear = flatInfoContracts => ({
  type: FLAT_INFO_CONTRACTS_CLEAR,
  payload: []
});
