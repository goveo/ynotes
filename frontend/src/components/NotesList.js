import React, { Fragment, useContext, useEffect, useMemo, useCallback } from 'react';
import Note from './Note';
import CreateNoteButton from './button/CreateNoteButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NotesContext from '../context/notes/notesContext';

const NotesList = () => {
  const notesContext = useContext(NotesContext);

  const { reorderNotes } = notesContext;

  useEffect(() => {
    notesContext.getNotes();
    // eslint-disable-next-line
  }, []);

  const isSearch = useMemo(() => !!notesContext.search.text, [notesContext.search.text]);

  const shownNotes = useMemo(() => {
    return isSearch ? notesContext.search.notes : notesContext.notes;
  }, [isSearch, notesContext.search, notesContext.notes]);

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
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {shownNotes.map((note, index) => (
                <Draggable key={note.id} draggableId={String(note.id)} index={index} isDragDisabled={isSearch}>
                  {(provided, snapshot) => (
                    <Note
                      id={note.id}
                      title={note.title}
                      description={note.description}
                      color={note.color}
                      innerRef={provided.innerRef}
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

export default NotesList;
