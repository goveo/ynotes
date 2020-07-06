import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, SubmitButton } from '../Form';

export const LoginForm = () => {
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

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Login');
  }, []);

  const isFilled = useMemo(() => {
    const { username, password } = user;
    return username && password;
  }, [user]);

  return (
    <Form title="Log in">
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <SubmitButton variant="outlined" onClick={onSubmit} color="primary" disabled={!isFilled}>
        Log in
      </SubmitButton>
    </Form>
  );
};

export default LoginForm;
