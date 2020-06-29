import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Task, { Priorities } from './Task';
import CreateTaskModal from './CreateTaskModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TasksList = () => {
  const classes = useStyles();
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

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <CreateTaskModal isOpen={showModal} closeModal={() => setShowModal(false)} />
      <div>
        <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setShowModal(true)}>
          <AddIcon />
        </Fab>
        {tasks.map(({ id, title, description, priority, isDone }) => {
          if (!isDone) {
            return <Task key={id} id={id} title={title} description={description} priority={priority} isDone={isDone} />;
          }
          return null;
        })}
      </div>
    </Fragment>
  );
};

export default TasksList;
