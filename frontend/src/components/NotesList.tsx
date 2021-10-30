import React, { Fragment, useEffect, useMemo, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useSelector from '../hooks/useSelector';
import { store } from '../store/store';
import CreateNoteButton from './button/CreateNoteButton';
import Note, { NoteType } from './Note';

const NotesList: React.FC = () => {
  const search = useSelector((state) => state.notes.search);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    store.dispatch.notes.getNotes();
    return () => {
      store.dispatch.notes.clearNotes();
    };
    // eslint-disable-next-line
  }, []);

  const isSearch = useMemo(() => !!search.query, [search.query]);

  const shownNotes = useMemo(() => {
    return isSearch ? search.notes : notes;
  }, [isSearch, search, notes]);

  const onDragEnd = useCallback((result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    store.dispatch.notes.reorderNotes({
      note: shownNotes[result.source.index],
      newIndex: result.destination.index,
    });
  }, [shownNotes]);

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

export default NotesList;
