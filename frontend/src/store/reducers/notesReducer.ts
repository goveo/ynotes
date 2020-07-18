import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  SET_SEARCH,
  REORDER_NOTES,
  CLEAR_NOTES,
  SET_LOADING,
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
  loading: true,
};

export default (state=initialState, action: NotesActionTypes): NotesState => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        loading: false,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: (state.notes || []).map((item: Note) => item.id === action.payload.id ? action.payload : item),
        loading: false,
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: action.payload.notes,
        search: {
          notes: action.payload.searchNotes,
          text: state.search.text,
        },
        loading: false,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: {
          notes: action.payload.notes,
          text: action.payload.text,
        },
        loading: false,
      };
    case REORDER_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        search: {
          notes: [],
          text: '',
        },
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
