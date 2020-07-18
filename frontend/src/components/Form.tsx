import * as React from 'react';
import styled, { css } from 'styled-components';
import { TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CommonProps } from '../types/CommonProps';

interface Props extends CommonProps {
  title?: string;
  postContent?: React.ReactNode | string;
  error: string | null;
  onKeyPress?: (charCode: number) => void;
  loading?: boolean;
}

export const Form: React.FC<Props> = ({ title, children, postContent, error, onKeyPress, loading }) => {
  return (
    <div>
      {title && <FormTitle align="center" variant="h3" className="text-center">{title}</FormTitle>}
      {error && <FormAlert severity="error">{error}</FormAlert>}
      <form onKeyPress={(e) => onKeyPress && onKeyPress(e.charCode)}>
        {children}
        {loading && <Loading />}
      </form>
      {postContent && (
        <PostFormContent>
          {postContent}
        </PostFormContent>
      )}
    </div>
  );
};

const formElement = css`
  width: 100%;
  margin-top: 20px;
`;

export const Input = styled(TextField)`
  ${formElement}
`;

export const SubmitButton = styled(Button)`
  ${formElement}
`;

export const FormTitle = styled(Typography)`
  ${formElement}
`;

export const PostFormContent = styled.div`
  ${formElement}
`;

export const FormAlert = styled(Alert)`
  ${formElement}
`;

export const Loading = styled(LinearProgress)`
  ${formElement}
`;

export default Form;
