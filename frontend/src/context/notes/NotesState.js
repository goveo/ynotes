import React, { useReducer } from 'react';

import NotesContext from './notesContext';
import NotesReducer from './notesReducer';

import {
  GET_NOTES,
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  SET_SEARCH,
  REORDER_NOTES,
} from '../types';

const LOCAL_STORAGE_ITEM_NAME = 'notes';

const NotesState = props => {
  const initialState = {
    notes: [],
    search: {
      notes: [],
      text: '',
    },
  };

  const [state, dispatch] = useReducer(NotesReducer, initialState);

  const getNotes = () => {
    let notes = [];
    try {
      notes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_NAME));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if (!notes) notes = [];
      dispatch({
        type: GET_NOTES,
        payload: notes,
      });
    }
  };

  const addNote = (note) => {
    const id = `${(+new Date()).toString(16)}`;
    const newNote = { ...note, id };
    const notes = [...state.notes, newNote];
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(notes));
    dispatch({
      type: ADD_NOTE,
      payload: newNote,
    });
  };

  const editNote = (note) => {
    const notes = [...state.notes];
    const foundIndex = state.notes.findIndex(item => item.id === note.id);
    if (foundIndex === -1) {
      return;
    }
    notes.splice(foundIndex, 1, note);
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(notes));
    dispatch({
      type: UPDATE_NOTE,
      payload: notes,
    });
  };

  const removeNote = (id) => {
    if (!id) return;
    const notes = (state.notes || []).filter(note => note.id !== id);
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(notes));
    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };

  const searchNotes = (text) => {
    const notes = (state.notes || []).filter(({ title, description }) => (
      title.toLowerCase().search(text.toLowerCase()) !== -1
      || description.toLowerCase().search(text.toLowerCase()) !== -1
    ));
    dispatch({
      type: SET_SEARCH,
      payload: {
        notes,
        text,
      },
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderNotes = (sourceIndex, destinationIndex) => {
    const notes = reorder(
      state.notes,
      sourceIndex,
      destinationIndex,
    );
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(notes));
    dispatch({
      type: REORDER_NOTES,
      payload: notes,
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        search: state.search,
        getNotes,
        addNote,
        editNote,
        removeNote,
        searchNotes,
        reorderNotes,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
