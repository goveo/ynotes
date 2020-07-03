import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskModal from '../modal/TaskModal';
import styled from 'styled-components';

const CreateTaskButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TaskModal isOpen={showModal} closeModal={() => setShowModal(false)} />
      <AddButton color="primary" variant='outlined' aria-label="add" onClick={() => setShowModal(true)} startIcon={<AddIcon />}>
        Create note
      </AddButton>
    </>
  );
};

const AddButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

export default CreateTaskButton;
