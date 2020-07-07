import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const Form = ({ title, children, postContent, error }) => {
  return (
    <div>
      {title && <FormTitle align="center" variant="h3" component="h1" className="text-center">{title}</FormTitle>}
      {error && <FormAlert severity="error">{error}</FormAlert>}
      <form>
        {children}
      </form>
      {postContent && (
        <PostFormContent>
          {postContent}
        </PostFormContent>
      )}
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  postContent: PropTypes.element,
  error: PropTypes.string,
};

export const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

export const FormTitle = styled(Typography)`
  margin: 20px;
`;

export const PostFormContent = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const FormAlert = styled(Alert)`
  margin: 20px 0;
`;

export default Form;
