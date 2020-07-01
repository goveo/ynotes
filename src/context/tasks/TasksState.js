import React, { useReducer } from 'react';

import TasksContext from './tasksContext';
import TasksReducer from './tasksReducer';

import {
  GET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  DONE_TASK,
  SET_SEARCH,
  REORDER_TASKS,
} from '../types';

const LOCAL_STORAGE_ITEM_NAME = 'tasks';

const TasksState = props => {
  const initialState = {
    tasks: [],
    search: {
      tasks: [],
      text: '',
    },
  };

  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const getTasks = () => {
    let tasks = [];
    try {
      tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_NAME));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if (!tasks) tasks = [];
      dispatch({
        type: GET_TASKS,
        payload: tasks,
      });
    }
  };

  const addTask = (task) => {
    const id = `${(+new Date()).toString(16)}`;
    const newTask = { ...task, id };
    const tasks = [...state.tasks, newTask];
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(tasks));
    dispatch({
      type: ADD_TASK,
      payload: newTask,
    });
  };

  const removeTask = (id) => {
    if (!id) return;
    const tasks = (state.tasks || []).filter(({ id }) => id !== id);
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(tasks));
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    });
  };

  const searchTasks = (text) => {
    const tasks = (state.tasks || []).filter(({ title, description }) => (
      title.toLowerCase().search(text.toLowerCase()) !== -1
      || description.toLowerCase().search(text.toLowerCase()) !== -1
    ));
    dispatch({
      type: SET_SEARCH,
      payload: {
        tasks,
        text,
      },
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderTasks = (sourceIndex, destinationIndex) => {
    const tasks = reorder(
      state.tasks,
      sourceIndex,
      destinationIndex,
    );
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(tasks));
    dispatch({
      type: REORDER_TASKS,
      payload: tasks,
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        search: state.search,
        getTasks,
        addTask,
        removeTask,
        searchTasks,
        reorderTasks,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
