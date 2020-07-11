import * as React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { CirclePicker } from 'react-color';
import { Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from './Modal';
import CounterInput from '../input/CounterInput';
import { CommonProps } from '../../types/CommonProps';

import { addNote, editNote } from '../../store/actions/notesActions';

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

const connector = connect(null, { addNote, editNote });

interface Props extends CommonProps, ConnectedProps<typeof connector> {
  isOpen: boolean,
  closeModal: () => void,
  note?: {
    id: number,
    title: string,
    description: string,
    color: string
  },
}

const NoteModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  note,
  addNote,
  editNote,
}) => {
  const classes = useStyles();
  const isEditMode = !!note;

  const [title, setTitle] = React.useState(note ? note.title : '');
  const [description, setDescription] = React.useState(note ? note?.description : '');
  const [color, setColor] = React.useState(note ? note?.color : DEFAULT_COLOR);

  const modalTitle = isEditMode ? 'Edit note' : 'Create new note';

  const onClose = React.useCallback(() => {
    closeModal();
    if (!isEditMode) {
      setTitle('');
      setDescription('');
      setColor(DEFAULT_COLOR);
    }
  }, [closeModal, isEditMode]);

  const createNote = React.useCallback(() => {
    onClose();
    addNote({
      title, description, color,
    });
  }, [onClose, title, description, color, addNote]);

  const updateNote = React.useCallback(() => {
    onClose();
    editNote(note?.id as number, {
      title, description, color,
    });
  }, [onClose, note, title, description, color, editNote]);

  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <form className={classes.form}>
          <Input max={40} label="Title" value={title} onChange={(value) => setTitle(value)}/>
          <Input
            max={500}
            label="Description"
            value={description}
            onChange={(value) => setDescription(value)}
            multiline/>
          <div>
            <ColorLabel>Color</ColorLabel>
            <ColorPicker
              width={'100%'}
              circleSpacing={6}
              circleSize={28}
              color={color}
              colors={PICKER_COLORS}
              onChangeComplete={(e: any) => setColor(e?.hex)}
            />
          </div>
        </form>
      }
      actions={
        <>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={isEditMode ? updateNote : createNote} color="primary" disabled={!title}>
            { isEditMode ? 'Edit' : 'Create' }
          </Button>
        </>
      }/>
  );
};

const Input = styled(CounterInput)`
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

export default connector(NoteModal);
