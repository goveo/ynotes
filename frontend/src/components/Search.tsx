import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';

import { store } from '../store/store';

const DEBOUNCE_TIMEOUT_MS = 500;

const Search: React.FC = () => {
  const searchNotesCallback = debounce((text: string) => {
    store.dispatch.notes.searchNotes(text);
  }, DEBOUNCE_TIMEOUT_MS);

  return (
    <SearchInput
      id="search"
      label="Search"
      onChange={(e) => searchNotesCallback(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

const SearchInput = styled(TextField)`
  margin: 16px 0;
  width: 100%;
`;


export default Search;
