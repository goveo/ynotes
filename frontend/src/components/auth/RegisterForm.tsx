import React, { useState, useCallback, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CommonProps } from '../../types/CommonProps';
import { Form, Input, SubmitButton } from '../Form';
import { AuthState } from '../../store/actions/types';

const mapStateToProps = (state: { auth: AuthState }) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

const connector = connect(mapStateToProps);

interface Props extends CommonProps {
  onSubmit: (user: { username: string, password: string }) => void,
  postContent?: React.ReactNode,
}

export const RegisterForm: React.FC<Props & ConnectedProps<typeof connector>> = ({
  onSubmit,
  postContent,
  error,
  loading,
}) => {

  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const onChange = useCallback((e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }, [user]);

  const isFilled = useMemo(() => {
    const { username, password, password2 } = user;
    return username && password && password === password2;
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
      title="Sign up"
      postContent={postContent}
      error={error}
      onKeyPress={(charCode) => charCode === 13 && canSubmit ? onSubmit(user) : null }
      loading={loading}
    >
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <Input
        name="password2"
        type="password"
        label="Confirm password"
        value={user.password2}
        onChange={onChange}
        helperText={!!user.password2 && user.password !== user.password2 && 'Password mismatch'}
        error={!!user.password2 && user.password !== user.password2}
      />
      <SubmitButton variant="outlined" onClick={onSubmitClick} color="primary" disabled={!isFilled}>
        Sign up
      </SubmitButton>
    </Form>
  );
};

export default connector(RegisterForm);
