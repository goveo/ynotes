import {
  GET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
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
    default:
      break;
  }
};
