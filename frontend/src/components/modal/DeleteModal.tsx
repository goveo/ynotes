import { Button, DialogContentText } from '@material-ui/core';
import React, { useCallback } from 'react';

import { store } from '../../store/store';
import { CommonProps } from '../../types/CommonProps';
import { NoteType } from '../Note';
import Modal from './Modal';

interface Props extends CommonProps {
  isOpen: boolean,
  closeModal: () => void,
  modalTitle?: string,
  modalText?: string,
  note: NoteType,
}

const DeleteModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  modalTitle = 'Delete note',
  note,
  modalText = `Are you sure you want to delete note with title "${note.title}"?`,
}) => {
  const deleteNote = useCallback(() => {
    store.dispatch.notes.removeNote(note.id);
    closeModal();
  }, [note.id, closeModal]);

  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen}
      onClose={closeModal}
      content={
        <DialogContentText>
          {modalText}
        </DialogContentText>
      }
      actions={
        <>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteNote} color="primary">
            Delete
          </Button>
        </>
      }/>
  );
};

export default DeleteModal;
