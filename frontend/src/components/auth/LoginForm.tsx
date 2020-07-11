import React, { useState, useCallback, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CommonProps } from '../../types/CommonProps';
import { Form, Input, SubmitButton } from '../Form';
import { AuthState } from '../../store/actions/types';

interface Props extends CommonProps {
  onSubmit: (user: { username: string, password: string }) => void;
  postContent?: React.ReactNode;
}

const mapStateToProps = (state: { auth: AuthState }) => ({ auth: state.auth });

const connector = connect(mapStateToProps);

export const LoginForm: React.FC<Props & ConnectedProps<typeof connector>> = ({
  auth: { error },
  onSubmit,
  postContent,
}) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onChange = useCallback((e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }, [user]);

  const onSubmitClick = useCallback((e) => {
    e.preventDefault();
    onSubmit(user);
  }, [onSubmit, user]);

  const isFilled = useMemo(() => {
    const { username, password } = user;
    return username && password;
  }, [user]);

  return (
    <Form title="Login" postContent={postContent} error={error}>
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <SubmitButton variant="outlined" onClick={onSubmitClick} color="primary" disabled={!isFilled}>
        Login
      </SubmitButton>
    </Form>
  );
};

export default connector(LoginForm);
