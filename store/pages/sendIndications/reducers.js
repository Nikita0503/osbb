import {
  SEND_INDICATIONS_TEXT,
  SEND_INDICATIONS_COUNTERS,
  SEND_INDICATIONS_COUNTERS_CHANGE,
  SEND_INDICATIONS_SELECTED_COUNTER
} from './actions';

const defaultState = {
  indicationText: null,
  sendIndicationsCounters: [],
  selectedCounter: null
};

export const sendIndicationsReducer = (state = defaultState, action) => {
  
  switch (action.type) {
    case SEND_INDICATIONS_TEXT:
      return {
        ...state,
        indicationText: action.payload,
      };
    case SEND_INDICATIONS_COUNTERS:
      return {
        ...state,
        sendIndicationsCounters: [
          ...state.sendIndicationsCounters,
          action.payload,
        ],
      };
    case SEND_INDICATIONS_COUNTERS_CHANGE:
      return {
        ...state,
        sendIndicationsCounters: [],
      };
    case SEND_INDICATIONS_SELECTED_COUNTER:
      return {
        ...state,
        selectedCounter: action.payload
      }
  }
  return state;
};
