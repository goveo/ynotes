import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import TasksContext from '../context/tasks/tasksContext';

const DEBOUNCE_TIMEOUT_MS = 500;

const Search = () => {
  const tasksContext = React.useContext(TasksContext);
  const searchTasks = _.debounce((text) => {
    tasksContext.searchTasks(text);
  }, DEBOUNCE_TIMEOUT_MS);

  return (
    <SearchInput
      id="search"
      label="Search"
      onChange={(e) => searchTasks(e.target.value)}
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
