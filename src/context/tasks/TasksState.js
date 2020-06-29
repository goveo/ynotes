import React, { useReducer } from 'react';

import TasksContext from './tasksContext';
import TasksReducer from './tasksReducer';

import { GET_TASKS, ADD_TASK, REMOVE_TASK, DONE_TASK } from '../types';

const TasksState = props => {
  const initialState = {
    tasks: [],
  };

  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const getTasks = () => {
    let tasks = [];
    try {
      tasks = JSON.parse(localStorage.getItem('tasks'));
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
    localStorage.setItem('tasks', JSON.stringify(tasks));
    dispatch({
      type: ADD_TASK,
      payload: newTask,
    });
  };

  const removeTask = (id) => {
    if (!id) return;
    const tasks = (state.tasks || []).filter(({ id }) => id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        getTasks,
        addTask,
        removeTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
