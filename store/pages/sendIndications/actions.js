export const SEND_INDICATIONS_TEXT = 'SEND_INDICATIONS_TEXT';
export const SEND_INDICATIONS_COUNTERS = 'SEND_INDICATIONS_COUNTERS';
export const SEND_INDICATIONS_COUNTERS_CHANGE = 'SEND_INDICATIONS_COUNTERS_CHANGE';
export const SEND_INDICATIONS_SELECTED_COUNTER = 'SEND_INDICATIONS_SELECTED_COUNTER';

export const setIndicationText = indicationText => ({
  type: SEND_INDICATIONS_TEXT,
  payload: indicationText
});

export const setIndicationsCounters = indicationsCounters => ({
  type: SEND_INDICATIONS_COUNTERS,
  payload: indicationsCounters
});

export const updateIndicationsCounters = indicationsCounters => ({
  type: SEND_INDICATIONS_COUNTERS_CHANGE,
  payload: []
});

export const setSelectedCounter = selectedCounter => ({
  type: SEND_INDICATIONS_SELECTED_COUNTER,
  payload: selectedCounter
})