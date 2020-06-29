import React, { useCallback, Fragment, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TasksContext from '../context/tasks/tasksContext';

export const Priorities = Object.freeze({
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
});

const colors = {
  LOW: '#bfffbf',
  MEDIUM: '#ffffbf',
  HIGH: '#ffbfbf',
};

const Task = ({id, title, description, priority}) => {
  const tasksContext = useContext(TasksContext);

  const doneTask = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('done task');
  }, []);

  const removeTask = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    tasksContext.removeTask(id);
  }, []);


  return (
    <TaskExpansionPanel priority={priority}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`task-${id}`}
      >
        <Title>{title}</Title>
        <Fragment>
          <TaskButton aria-label="done" onClick={doneTask}>
            <DoneIcon fontSize="small" />
          </TaskButton>
          <TaskButton aria-label="delete" onClick={removeTask}>
            <DeleteIcon fontSize="small" />
          </TaskButton>
        </Fragment>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {description}
        </Typography>
      </ExpansionPanelDetails>
    </TaskExpansionPanel>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
};

const TaskExpansionPanel = styled(ExpansionPanel)`
  background: ${(props) => colors[props.priority]};
`;

const TaskButton = styled(IconButton)`
  padding: 0 4px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  flex-basis: 80%;
  flex-shrink: 0;
`;

export default Task;
