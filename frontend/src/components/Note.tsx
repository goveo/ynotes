import React, { useCallback, Fragment, useState} from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import {
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NoteModal from './modal/NoteModal';
import { CommonProps } from '../types/CommonProps';
import { removeNote } from '../store/actions/notesActions';

export type NoteType = {
  id: number;
  title: string;
  description: string;
  color: string;
}

const connector = connect(null, { removeNote });

export interface Props extends CommonProps, NoteType, ConnectedProps<typeof connector> {
  innerRef?: () => any;
}

export const Note: React.FC<Props> = ({
  id,
  title,
  description,
  color,
  innerRef,
  removeNote,
  ...restProps
}) => {
  const onEditClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  }, []);

  const onDeleteClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    removeNote(id);
  }, [removeNote, id]);

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
          <Grid justify="space-between" container>
            <Grid item>
              <Title>{title}</Title>
            </Grid>
            <Grid item>
              <Fragment>
                <NoteButton aria-label="edit" onClick={onEditClick}>
                  <EditIcon fontSize="small" />
                </NoteButton>
                <NoteButton aria-label="delete" onClick={onDeleteClick}>
                  <DeleteIcon fontSize="small" />
                </NoteButton>
              </Fragment>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Description>
            {description}
          </Description>
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

const NoteAccordion = styled(Accordion)`
  background: ${(props) => props.color};
`;

const NoteButton = styled(IconButton)`
  padding: 0 4px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  word-break: break-word;
`;

const Description = styled(Typography)`
  word-break: break-word;
  width: 100%;
`;

export default connector(Note);
