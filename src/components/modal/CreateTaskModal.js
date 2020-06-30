import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Priorities } from '../Task';
import Modal from './Modal';
import TasksContext from '../../context/tasks/tasksContext';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CreateTaskModal = ({ isOpen, closeModal }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const tasksContext = React.useContext(TasksContext);

  const onClose = React.useCallback(() => {
    setTitle('');
    setDescription('');
    setPriority('');
    closeModal();
  }, [closeModal]);

  const createTask = React.useCallback(() => {
    onClose();
    tasksContext.addTask({
      title, description, priority,
    });
  }, [onClose, title, description, priority, tasksContext]);

  return (
    <Modal
      title="Create new task"
      isOpen={isOpen}
      onClose={onClose}
      content={
        <form className={classes.formControl}>
          <Input label="Title" onChange={(e) => setTitle(e.target.value)}/>
          <Input label="Description" multiline onChange={(e) => setDescription(e.target.value)}/>
          <Input
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {Object.keys(Priorities).map(priority => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Input>
        </form>
      }
      actions={
        <>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTask} color="primary" disabled={!title || !priority}>
            Create
          </Button>
        </>
      }/>
  );
};

CreateTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

export default CreateTaskModal;
