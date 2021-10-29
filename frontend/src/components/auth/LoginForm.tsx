import React, { useState, useCallback, useMemo } from 'react';
import useSelector from '../../hooks/useSelector';
import { CommonProps } from '../../types/CommonProps';
import { Form, Input, SubmitButton } from '../Form';

interface Props extends CommonProps {
  onSubmit: (user: { username: string, password: string }) => void;
  postContent?: React.ReactNode;
}

export const LoginForm: React.FC<Props> = ({
  onSubmit,
  postContent,
}) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

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

export default LoginForm;
