import React, { useCallback, Fragment, useContext, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotesContext from '../context/notes/notesContext';
import NoteModal from './modal/NoteModal';

const Note = ({ id, title, description, color, innerRef, ...restProps }) => {
  const notesContext = useContext(NotesContext);

  const editNote = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  }, []);

  const removeNote = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    notesContext.removeNote(id);
  }, [notesContext, id]);

  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <Fragment>
      <NoteAccordion
        color={color}
        ref={innerRef}
        {...restProps}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-content`}
          id={`note-${id}`}
        >
          <Title>{title}</Title>
          <Fragment>
            <NoteButton aria-label="edit" onClick={editNote}>
              <EditIcon fontSize="small" />
            </NoteButton>
            <NoteButton aria-label="delete" onClick={removeNote}>
              <DeleteIcon fontSize="small" />
            </NoteButton>
          </Fragment>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {description}
          </Typography>
        </AccordionDetails>
      </NoteAccordion>
      <NoteModal
        note={{
          id, title, description, color,
        }}
        isOpen={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
    </Fragment>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  innerRef: PropTypes.func,
};

const NoteAccordion = styled(Accordion)`
  background: ${(props) => props.color};
`;

const NoteButton = styled(IconButton)`
  padding: 0 4px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  flex-basis: 80%;
  flex-shrink: 0;
`;

export default Note;
