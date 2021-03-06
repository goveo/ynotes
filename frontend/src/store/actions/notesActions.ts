import axios from 'axios';
import { findIndex, sortBy } from 'lodash';
import { RootState } from '../index';
import {
  GET_NOTES,
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  SET_SEARCH,
  REORDER_NOTES,
  CLEAR_NOTES,
  SET_NOTES_LOADING,
  NotePayload,
  Note,
  NotesState,
  ClearNotesAction,
  NotesActionTypes,
} from './types';
import { ThunkAction } from 'redux-thunk';

export type ThunkNoteAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  NotesActionTypes
>

export const getNotes = (): ThunkNoteAction => async (dispatch) => {
  try {
    dispatch({ type: SET_NOTES_LOADING });
    const { data: notes }: { data: Note[] } = await axios.get('/api/notes');
    dispatch({
      type: GET_NOTES,
      payload: notes,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const addNote = (note: NotePayload): ThunkNoteAction => async (dispatch) => {
  try {
    dispatch({ type: SET_NOTES_LOADING });
    const { data: newNote }: { data: Note } = await axios.post('/api/notes', note);
    dispatch({
      type: ADD_NOTE,
      payload: newNote,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const editNote = (id: number, note: NotePayload): ThunkNoteAction => async (dispatch) => {
  try {
    const { data: newNote }: { data: Note } = await axios.put(`/api/notes/${id}`, note);
    dispatch({
      type: UPDATE_NOTE,
      payload: newNote,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const removeNote = (id: number): ThunkNoteAction => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_NOTES_LOADING });
    await axios.delete(`/api/notes/${id}`);
    const { notes: notesState }: { notes: NotesState } = getState();
    const notes = notesState.notes
      .filter(note => note.id !== id) // delete note by id
      .sort((a, b) => (a.index - b.index)) // desc sort by index
      .map((note, index) => ({...note, index})); // updated index

    const searchNotes = notesState.search.notes
      .filter((note: Note) => note.id !== id); // indexes is not important while search

    dispatch({
      type: REMOVE_NOTE,
      payload: {
        deletedId: id,
        notes,
        searchNotes,
      },
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const searchNotes = (text: string): ThunkNoteAction => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_NOTES_LOADING });
    const { notes: notesState }: { notes: NotesState } = getState();
    const notes = notesState.notes;
    const filteredNotes = notes.filter(({ title, description }) => (
      title.toLowerCase().search(text.toLowerCase()) !== -1
    || description.toLowerCase().search(text.toLowerCase()) !== -1
    ));
    dispatch({
      type: SET_SEARCH,
      payload: {
        notes: filteredNotes,
        text,
      },
    });
  }
  catch (error) {
    console.error(error.message);
  }
};


const reorder = (notes: Note[], currentIndex: number, newIndex: number) => {
  if (currentIndex === newIndex) return notes;
  let list = notes;

  const index = findIndex(notes, (note) => note.index === currentIndex);
  const [note] = list.splice(index, 1);

  list = notes.map((note) => {
    if (currentIndex > newIndex) {
      if (note.index >= newIndex && note.index < currentIndex) {
        return { ...note, index: note.index + 1 };
      }
      return note;
    }
    else {
      if (note.index > currentIndex && note.index <= newIndex) {
        return { ...note, index: note.index - 1 };
      }
      return note;
    }
  });

  list = [...list, { ...note, index: newIndex }];
  return sortBy(list, 'index');
};

export const reorderNotes = (note: Note, newIndex: number): ThunkNoteAction => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_NOTES_LOADING });
    const { notes: notesState }: { notes: NotesState } = getState();
    const notes = notesState.notes;
    const newNotes = reorder(
      notes,
      note.index,
      newIndex,
    );
    dispatch({
      type: REORDER_NOTES,
      payload: newNotes,
    });
    await axios.post(`/api/notes/${note.id}/changeIndex`, {
      index: newIndex,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const clearNotes = (): ClearNotesAction => ({ type: CLEAR_NOTES });
