import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

import useSelector from '../hooks/useSelector';
import { CommonProps } from '../types/CommonProps';
import DeleteModal from './modal/DeleteModal';
import NoteModal from './modal/NoteModal';

export type NoteType = {
  id: number;
  title: string;
  description: string;
  color: string;
};

export interface Props extends CommonProps, NoteType {
  accordionRef?: () => HTMLElement;
}

export const Note: React.FC<Props> = ({
  id,
  title,
  description,
  color,
  accordionRef,
  ...restProps
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onEditClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  }, []);

  const onDeleteClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  }, []);

  const searchQuery = useSelector((state) => state.notes.search.query);
  const searchQueryTerms = useMemo(() => searchQuery.split(' '), [searchQuery]);

  return (
    <Fragment>
      <NoteAccordion color={color} ref={accordionRef} {...restProps}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-content`}
          id={`note-${id}`}
        >
          <Grid justify="space-between" container>
            <Grid item>
              <Title>
                <Highlighter
                  searchWords={searchQueryTerms}
                  autoEscape={true}
                  textToHighlight={title}
                />
              </Title>
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
            <Highlighter
              searchWords={searchQueryTerms}
              autoEscape={true}
              textToHighlight={description}
            />
          </Description>
        </AccordionDetails>
      </NoteAccordion>
      <NoteModal
        note={{ id, title, description, color }}
        isOpen={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
      <DeleteModal
        note={{ id, title, description, color }}
        isOpen={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
      />
    </Fragment>
  );
};

const NoteAccordion = styled(Accordion)`
  background: ${(props) => props.color};
`;

const NoteButton = styled(IconButton)`
  padding: 4px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  word-break: break-word;
`;

const Description = styled(Typography)`
  word-break: break-word;
  width: 100%;
`;

export default Note;
