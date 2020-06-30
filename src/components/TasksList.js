import React, { Fragment, useContext, useEffect } from 'react';
import Task from './Task';
import CreateTaskButton from './button/CreateTaskButton';

import TasksContext from '../context/tasks/tasksContext';

const TasksList = () => {
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext.getTasks();
    // eslint-disable-next-line
  }, []);

  const ShownTasks = () => {
    let tasks = [];
    if (tasksContext.search.text) {
      tasks = tasksContext.search.tasks;
    }
    else {
      tasks = tasksContext.tasks;
    }
    return tasks.map(({ id, title, description, priority, isDone }) => (
      !isDone ? <Task key={id} id={id} title={title} description={description} priority={priority} isDone={isDone} /> : null
    ));
  };

  return (
    <Fragment>
      <CreateTaskButton />
      <ShownTasks />
    </Fragment>
  );
};

export default TasksList;
