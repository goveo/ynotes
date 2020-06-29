import React, { Fragment, useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Task from './Task';
import CreateTaskModal from './CreateTaskModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TasksContext from '../context/tasks/tasksContext';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TasksList = () => {
  const classes = useStyles();
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext.getTasks();
    // eslint-disable-next-line
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <CreateTaskModal isOpen={showModal} closeModal={() => setShowModal(false)} />
      <div>
        <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setShowModal(true)}>
          <AddIcon />
        </Fab>
        {tasksContext.tasks.map(({ id, title, description, priority, isDone }) => {
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
