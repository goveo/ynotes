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
  auth: {
    error,
    loading,
  },
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

  const isFilled = useMemo(() => {
    const { username, password } = user;
    return username && password;
  }, [user]);

  const canSubmit = useMemo(() => {
    return isFilled && !loading;
  }, [isFilled, loading]);

  const onSubmitClick = useCallback((e) => {
    e.preventDefault();
    if (canSubmit) {
      onSubmit(user);
    }
  }, [onSubmit, user, canSubmit]);

  return (
    <Form
      title="Login"
      postContent={postContent}
      error={error}
      onKeyPress={(charCode) => charCode === 13 && canSubmit ? onSubmit(user) : null }
      loading={loading}
    >
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <SubmitButton
        variant="outlined"
        onClick={onSubmitClick}
        color="primary"
        disabled={!canSubmit}
      >
        Login
      </SubmitButton>
    </Form>
  );
};

export default connector(LoginForm);
