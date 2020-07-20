import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CommonProps } from '../../types/CommonProps';
import { Button, DialogContentText } from '@material-ui/core';
import Modal from './Modal';
import { NoteType } from '../Note';
import { removeNote } from '../../store/actions/notesActions';

const connector = connect(null, { removeNote });

interface Props extends CommonProps, ConnectedProps<typeof connector> {
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
  removeNote,
}) => {
  const deleteNote = useCallback(() => {
    removeNote(note.id);
    closeModal();
  }, [removeNote, note.id, closeModal]);

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

export default connector(DeleteModal);
