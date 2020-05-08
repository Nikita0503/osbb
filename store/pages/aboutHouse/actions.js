export const ABOUT_HOUSE_DATA = 'ABOUT_HOUSE_DATA';
export const ABOUT_HOUSE_DOCUMENTS = 'ABOUT_HOUSE_DOCUMENTS';
export const ABOUT_HOUSE_DATA_SELECTED_FILE = 'ABOUT_HOUSE_DATA_SELECTED_FILE';
export const ABOUT_HOUSE_CHANGE_SELECTED_FILE = 'ABOUT_HOUSE_CHANGE_SELECTED_FILE';

export const setAboutHouseData = aboutHouseData => ({
  type: ABOUT_HOUSE_DATA,
  payload: aboutHouseData
});

export const setAboutHouseDocuments = aboutHouseDocuments => ({
  type: ABOUT_HOUSE_DOCUMENTS,
  payload: aboutHouseDocuments
});

export const setAboutHouseSelectedFile = selectedFile => ({
  type: ABOUT_HOUSE_DATA_SELECTED_FILE,
  payload: selectedFile
});

export const setSelectedFile = selectedFile => ({
  type: ABOUT_HOUSE_CHANGE_SELECTED_FILE,
  payload: selectedFile
});