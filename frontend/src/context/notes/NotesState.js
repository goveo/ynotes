import React, { useReducer } from 'react';
import axios from 'axios';
import _ from 'lodash';
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
    try {
      const id = note.id;
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

  const removeNote = async (id) => {
    try {
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


  const reorder = (notes, currentIndex, newIndex) => {
    if (currentIndex === newIndex) return notes;
    let list = notes;

    const index = _.findIndex(notes, (note) => note.index === currentIndex);
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
    return _.sortBy(list, 'index');
  };

  const reorderNotes = async (note, newIndex) => {
    try {
      const notes = reorder(
        state.notes,
        note.index,
        newIndex,
      );
      dispatch({
        type: REORDER_NOTES,
        payload: notes,
      });
      await axios.post(`/api/notes/${note.id}/changeIndex`, {
        index: newIndex,
      });
    }
    catch (error) {
      console.error(error.message);
    }
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
