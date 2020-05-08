import { exp } from "react-native-reanimated";

export const APPLICATIONS_AND_OFFERS_DATA = 'APPLICATIONS_AND_OFFERS_DATA';
export const APPLICATIONS_AND_OFFERS_DATA_CLEAR = 'APPLICATIONS_AND_OFFERS_DATA_CLEAR';
export const APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA = 'APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA';
export const APPLICATIONS_AND_OFFERS_ONLY_MY = 'APPLICATIONS_AND_OFFERS_ONLY_MY';
export const APPLICATIONS_AND_OFFERS_LOADING = 'APPLICATIONS_AND_OFFERS_LOADING';

export const setApplicationsAndOffersData = applicationsAndOffersData => ({
  type: APPLICATIONS_AND_OFFERS_DATA,
  payload: applicationsAndOffersData
});

export const setApplicationsAndOffersDataClear = applicationsAndOffersData => ({
  type: APPLICATIONS_AND_OFFERS_DATA_CLEAR,
  payload: []
})

export const setSelectedOfferData = selectedOfferData => ({
  type: APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA,
  payload: selectedOfferData
});

export const setApplicationsAndOffersOnlyMy = onlyMy => ({
  type: APPLICATIONS_AND_OFFERS_ONLY_MY,
  payload: onlyMy
});

export const setApplicationsAndOffersLoading = loading => ({
  type: APPLICATIONS_AND_OFFERS_LOADING,
  payload: loading
});