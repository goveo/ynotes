import React, { Fragment, useContext, useEffect } from 'react';
import Note from './Note';
import CreateNoteButton from './button/CreateNoteButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NotesContext from '../context/notes/notesContext';

const NotesList = () => {
  const notesContext = useContext(NotesContext);

  useEffect(() => {
    notesContext.getNotes();
    // eslint-disable-next-line
  }, []);

  const isSearch = !!notesContext.search.text;
  const shownNotes = isSearch ? notesContext.search.notes : notesContext.notes;

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    notesContext.reorderNotes(shownNotes[result.source.index], result.destination.index);
  };

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
                <Draggable key={note.id} draggableId={String(note.id)} index={index}>
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
