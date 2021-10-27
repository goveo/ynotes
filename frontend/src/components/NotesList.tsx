import React, { Fragment, useEffect, useMemo, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateNoteButton from './button/CreateNoteButton';
import Note, { NoteType } from './Note';

import { removeNote, reorderNotes, getNotes, clearNotes } from '../store/actions/notesActions';
import { NotesState } from '../store/actions/types';

const mapStateToProps = (state: { notes: NotesState }) => ({
  search: state.notes.search,
  notes: state.notes.notes,
});
const connector = connect(mapStateToProps, { removeNote, reorderNotes, getNotes, clearNotes });

const NotesList: React.FC<ConnectedProps<typeof connector>> = ({
  search,
  reorderNotes,
  getNotes,
  clearNotes,
  notes,
}) => {
  useEffect(() => {
    getNotes();
    console.log('getNotes:', localStorage.getItem('token'));
    return () => {
      clearNotes();
    };
    // eslint-disable-next-line
  }, []);

  const isSearch = useMemo(() => !!search.text, [search.text]);

  const shownNotes = useMemo(() => {
    return isSearch ? search.notes : notes;
  }, [isSearch, search, notes]);

  const onDragEnd = useCallback((result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    reorderNotes(shownNotes[result.source.index], result.destination.index);
  }, [reorderNotes, shownNotes]);

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {shownNotes.map((note: NoteType, index: number) => (
                <Draggable key={note.id} draggableId={String(note.id)} index={index} isDragDisabled={isSearch}>
                  {(provided) => (
                    <Note
                      id={note.id}
                      title={note.title}
                      description={note.description}
                      color={note.color}
                      accordionRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        { !isSearch && <CreateNoteButton />}
      </DragDropContext>
    </Fragment>
  );
};

export default connector(NotesList);
