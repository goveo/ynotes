import React from 'react';
import Task, { Priorities } from './Task';

const TasksList = () => {
  const tasks = [
    {
      id: 1,
      title: 'ToDo list',
      description: 'Develop todo list in React',
      priority: Priorities.HIGH,
      isDone: false,
    },
    {
      id: 2,
      title: 'Test task',
      description: 'Description of task (to debug)',
      priority: Priorities.MEDIUM,
      isDone: false,
    },
    {
      id: 3,
      title: 'Develop YComments',
      description: 'ycoms.herokuapp.com',
      priority: Priorities.LOW,
      isDone: true,
    },
  ];
  return (
    <div>
      {tasks.map(({ id, title, description, priority, isDone }) => {
        if (!isDone) {
          return <Task key={id} id={id} title={title} description={description} priority={priority} isDone={isDone} />;
        }
        return null;
      })}
    </div>
  );
};

export default TasksList;
