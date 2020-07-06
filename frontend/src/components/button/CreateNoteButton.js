import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NoteModal from '../modal/NoteModal';
import styled from 'styled-components';

const CreateNoteButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <NoteModal isOpen={showModal} closeModal={() => setShowModal(false)} />
      <AddButton color="primary" variant='outlined' aria-label="add" onClick={() => setShowModal(true)} startIcon={<AddIcon />}>
        Create note
      </AddButton>
    </>
  );
};

const AddButton = styled(Button)`
  margin: 20px 0;
  width: 100%;
`;

export default CreateNoteButton;
