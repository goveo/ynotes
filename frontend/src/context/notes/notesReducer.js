import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  SET_SEARCH,
  REORDER_NOTES,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: action.payload,
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: (state.notes || []).filter(({ id }) => id !== action.payload),
      };
    case SET_SEARCH:
      return {
        ...state,
        search: {
          notes: action.payload.notes,
          text: action.payload.text,
        },
      };
    case REORDER_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      break;
  }
};
