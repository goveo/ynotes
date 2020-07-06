import React, { useReducer } from 'react';
import axios from 'axios';
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

  const getNotes = async () => {
    try {
      const { data: notes } = await axios.get('/api/notes');
      dispatch({
        type: GET_NOTES,
        payload: notes,
      });
    }
    catch (error) {
      console.error(error.message);
    }
  };

  const addNote = async (note) => {
    try {
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

  const editNote = async (note) => {
    const id = note.id;
    const { data: newNote } = await axios.put(`/api/notes/${id}`, note);
    dispatch({
      type: UPDATE_NOTE,
      payload: newNote,
    });
  };

  const removeNote = async (id) => {
    await axios.delete(`/api/notes/${id}`);
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
