import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from '@material-ui/core';

export const Form = ({ title, children }) => {
  return (
    <div>
      <FormTitle align="center" variant="h3" component="h1" className="text-center">{title}</FormTitle>
      <form>
        {children}
      </form>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
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

export default Form;
