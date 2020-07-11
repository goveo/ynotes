import React, { Fragment, useContext, useEffect, useMemo, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateNoteButton from './button/CreateNoteButton';
import NotesContext from '../context/notes/notesContext';
import Note, { NoteType } from './Note';

const NotesList: React.FC = () => {
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
