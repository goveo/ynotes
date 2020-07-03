import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from './Modal';
import TasksContext from '../../context/tasks/tasksContext';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const DEFAULT_COLOR = '#eeeeee';
const PICKER_COLORS = [
  DEFAULT_COLOR,
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#F78DA7',
];

const TaskModal = ({ isOpen, closeModal, task=null }) => {
  const classes = useStyles();
  const isEditMode = !!task;

  const [title, setTitle] = React.useState(isEditMode ? task.title : '');
  const [description, setDescription] = React.useState(isEditMode ? task.description : '');
  const [color, setColor] = React.useState(isEditMode ? task.color : DEFAULT_COLOR);
  const tasksContext = React.useContext(TasksContext);

  const modalTitle = isEditMode ? 'Edit task' : 'Create new task';

  const onClose = React.useCallback(() => {
    closeModal();
    if (!isEditMode) {
      setTitle('');
      setDescription('');
      setColor(DEFAULT_COLOR);
    }
  }, [closeModal]);

  const createTask = React.useCallback(() => {
    onClose();
    tasksContext.addTask({
      title, description, color,
    });
  }, [onClose, title, description, color, tasksContext]);

  const editTask = React.useCallback(() => {
    onClose();
    tasksContext.editTask({
      id: task.id, title, description, color,
    });
  }, [onClose, task, title, description, color, tasksContext]);

  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <form className={classes.formControl}>
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <Input label="Description" value={description} multiline onChange={(e) => setDescription(e.target.value)}/>
          <div>
            <ColorLabel>Color</ColorLabel>
            <ColorPicker
              width={'100%'}
              circleSpacing={6}
              circleSize={28}
              color={color}
              colors={PICKER_COLORS}
              triangle='hide'
              onChangeComplete={(e) => setColor(e.hex)}
            />
          </div>
        </form>
      }
      actions={
        <>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={isEditMode ? editTask : createTask} color="primary" disabled={!title}>
            { isEditMode ? 'Edit' : 'Create' }
          </Button>
        </>
      }/>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  task: PropTypes.object,
};

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const ColorPicker = styled(CirclePicker)`
  margin: 10px 0;
  padding: 5px 0;
`;

const ColorLabel = styled(InputLabel)`
  margin-top: 10px;
`;

export default TaskModal;
