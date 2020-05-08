export const HOUSE_CHANGE_ALL_HOUSE_DATA = 'HOUSE_CHANGE_ALL_HOUSE_DATA';
export const HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA = 'HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA';

export const setAllHouseData = allHouseData => ({
  type: HOUSE_CHANGE_ALL_HOUSE_DATA,
  payload: allHouseData
});

export const setAllHouseCostsData = allHouseCostsData => ({
  type: HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA,
  payload: allHouseCostsData
});