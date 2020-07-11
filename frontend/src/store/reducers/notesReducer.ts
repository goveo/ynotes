import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  SET_SEARCH,
  REORDER_NOTES,
  CLEAR_NOTES,
  NotesActionTypes,
  NotesState,
  Note,
} from '../actions/types';

const initialState = {
  notes: [],
  search: {
    notes: [],
    text: '',
  },
};

export default (state=initialState, action: NotesActionTypes): NotesState => {
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
        notes: (state.notes || []).map((item: Note) => item.id === action.payload.id ? action.payload : item),
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
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        search: {
          notes: [],
          text: '',
        },
      };
    default:
      return state;
  }
};
