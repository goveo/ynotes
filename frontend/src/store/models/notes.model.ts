import { createModel } from '@rematch/core';
import axios from 'axios';
import { findIndex, sortBy } from 'lodash';

import { RootModel } from '../root.model';

export interface User {
  id: number;
  username: string;
  token: string;
}

export type Error = string | null;

export interface NotesState {
  notes: Note[],
  search: {
    notes: Note[],
    text: string,
  },
  loading: boolean,
}

const initialState: NotesState = {
  notes: [],
  search: {
    notes: [],
    text: '',
  },
  loading: true,
};

export interface Note {
  id: number;
  index: number,
  title: string;
  description: string;
  color: string;
}

export interface NotePayload {
  title: string;
  description: string;
  color: string;
}

const getAxiosConfig = () => {
  return {
    headers: {
      'X-Auth-Token': localStorage.getItem('token'),
    },
  };
};

export const notes = createModel<RootModel>()({
  state: initialState,
  reducers: {
    GET_NOTES(state: NotesState, payload: Note[]) {
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    },
    ADD_NOTE(state: NotesState, payload: Note) {
      return {
        ...state,
        notes: [...state.notes, payload],
        loading: false,
      };
    },
    UPDATE_NOTE(state: NotesState, payload: Note) {
      return {
        ...state,
        notes: (state.notes || []).map((item: Note) => item.id === payload.id ? payload : item),
        loading: false,
      };
    },
    REMOVE_NOTE(state: NotesState, payload: {
      deletedId: number;
      notes: Note[];
      searchNotes: Note[];
    }) {
      return {
        ...state,
        notes: payload.notes,
        search: {
          notes: payload.searchNotes,
          text: state.search.text,
        },
        loading: false,
      };
    },
    SET_SEARCH(state: NotesState, payload: {
      notes: Note[];
      text: string;
    }) {
      return {
        ...state,
        search: {
          notes: payload.notes,
          text: payload.text,
        },
        loading: false,
      };
    },
    REORDER_NOTES(state: NotesState, payload: Note[]) {
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    },
    CLEAR_NOTES(state: NotesState) {
      return {
        ...state,
        notes: [],
        search: {
          notes: [],
          text: '',
        },
        loading: false,
      };
    },
    SET_NOTES_LOADING(state: NotesState) {
      return {
        ...state,
        loading: true,
      };
    },
  },
  effects: (dispatch) => ({
    async getNotes() {
      try {
        dispatch.notes.SET_NOTES_LOADING();
        const { data: notes } = await axios.get<Note[]>('/api/notes', getAxiosConfig());
        dispatch.notes.GET_NOTES(notes);
      }
      catch (error) {
        console.error((error as any).message);
      }
    },
    async addNote(note: NotePayload) {
      try {
        dispatch.notes.SET_NOTES_LOADING();
        const { data: newNote } = await axios.post<Note>('/api/notes', note, getAxiosConfig());
        dispatch.notes.ADD_NOTE(newNote);
      }
      catch (error) {
        console.error((error as any).message);
      }
    },
    async editNote({ id, note }: { id: number, note: NotePayload }) {
      try {
        const { data: newNote } = await axios.put<Note>(`/api/notes/${id}`, note, getAxiosConfig());
        dispatch.notes.UPDATE_NOTE(newNote);
      }
      catch (error) {
        console.error((error as any).message);
      }
    },
    async removeNote(id: number, state) {
      try {
        dispatch.notes.SET_NOTES_LOADING();
        await axios.delete(`/api/notes/${id}`, getAxiosConfig());
        const { notes: notesState } = state;
        const notes = notesState.notes
          .filter(note => note.id !== id) // delete note by id
          .sort((a, b) => (a.index - b.index)) // desc sort by index
          .map((note, index) => ({ ...note, index })); // updated index

        const searchNotes = notesState.search.notes
          .filter((note: Note) => note.id !== id); // indexes is not important while search

        dispatch.notes.REMOVE_NOTE({
          deletedId: id,
          notes,
          searchNotes,
        });
      }
      catch (error) {
        console.error((error as any).message);
      }
    },
    async searchNotes(text: string, state) {
      try {
        dispatch.notes.SET_NOTES_LOADING();
        const { notes: notesState } = state;
        const notes = notesState.notes;
        const filteredNotes = notes.filter(({ title, description }) => (
          title.toLowerCase().search(text.toLowerCase()) !== -1
          || description.toLowerCase().search(text.toLowerCase()) !== -1
        ));
        dispatch.notes.SET_SEARCH({
          notes: filteredNotes,
          text,
        });
      }
      catch (error) {
        console.error((error as any).message);
      }
    },
    reorder({ notes, currentIndex, newIndex }: { notes: Note[], currentIndex: number, newIndex: number }) {
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
    },
    async reorderNotes({ note, newIndex }: { note: Note, newIndex: number }, state) {
      try {
        dispatch.notes.SET_NOTES_LOADING();
        const { notes: notesState } = state;
        const notes = notesState.notes;
        const newNotes = dispatch.notes.reorder({
          notes,
          currentIndex: note.index,
          newIndex,
        });
        dispatch.notes.REORDER_NOTES(newNotes);
        await axios.post(`/api/notes/${note.id}/changeIndex`, {
          index: newIndex,
        }, getAxiosConfig());
      }
      catch (error) {
        console.error((error as any).message);
      }
    },
    async clearNotes() {
      dispatch.notes.CLEAR_NOTES();
    },
  }),
});
