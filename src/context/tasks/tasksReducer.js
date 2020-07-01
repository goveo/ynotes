import {
  GET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  SET_SEARCH,
  REORDER_TASKS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: (state.tasks || []).filter(({ id }) => id !== action.payload),
      };
    case SET_SEARCH:
      return {
        ...state,
        search: {
          tasks: action.payload.tasks,
          text: action.payload.text,
        },
      };
    case REORDER_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      break;
  }
};
