import axios from 'axios';
import { findIndex, sortBy } from 'lodash';
import { AppThunk } from '../index';
import {
  GET_NOTES,
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  SET_SEARCH,
  REORDER_NOTES,
  CLEAR_NOTES,
  SET_LOADING,
  NotePayload,
  Note,
} from './types';

export const getNotes = (): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
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

export const addNote = (note: NotePayload): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { data: newNote } = await axios.post('/api/notes', note);
    dispatch({
      type: ADD_NOTE,
      payload: newNote,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const editNote = (id: number, note: NotePayload): AppThunk => async (dispatch) => {
  try {
    const { data: newNote } = await axios.put(`/api/notes/${id}`, note);
    dispatch({
      type: UPDATE_NOTE,
      payload: newNote,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const removeNote = (id: number): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    await axios.delete(`/api/notes/${id}`);
    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const searchNotes = (text: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    const { notes } = getState();
    const filteredNotes = (notes as Note[]).filter(({ title, description }) => (
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

export const reorderNotes = (note: Note, newIndex: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    await axios.post(`/api/notes/${note.id}/changeIndex`, {
      index: newIndex,
    });
    const { notes } = getState();
    const newNotes = reorder(
      notes,
      note.index,
      newIndex,
    );
    dispatch({
      type: REORDER_NOTES,
      payload: newNotes,
    });
  }
  catch (error) {
    console.error(error.message);
  }
};

export const clearNotes = (): AppThunk => async (dispatch) => dispatch({ type: CLEAR_NOTES });
