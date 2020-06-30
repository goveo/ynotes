import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CreateTaskModal from '../modal/CreateTaskModal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const CreateTaskButton = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <CreateTaskModal isOpen={showModal} closeModal={() => setShowModal(false)} />
      <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setShowModal(true)}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default CreateTaskButton;
