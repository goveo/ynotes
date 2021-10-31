import React, { useCallback, useMemo, useState } from 'react';

import useSelector from '../../hooks/useSelector';
import { CommonProps } from '../../types/CommonProps';
import { Form, Input, SubmitButton } from '../Form';

interface Props extends CommonProps {
  onSubmit: (user: { username: string, password: string }) => void,
  postContent?: React.ReactNode,
}

export const RegisterForm: React.FC<Props> = ({
  onSubmit,
  postContent,
}) => {

  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
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

export default RegisterForm;
