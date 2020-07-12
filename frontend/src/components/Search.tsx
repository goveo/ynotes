import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { searchNotes } from '../store/actions/notesActions';

const DEBOUNCE_TIMEOUT_MS = 500;

const connector = connect(null, { searchNotes });

const Search: React.FC<ConnectedProps<typeof connector>> = ({ searchNotes }) => {
  const searchNotesCallback = debounce((text: string) => {
    searchNotes(text);
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


export default connector(Search);
