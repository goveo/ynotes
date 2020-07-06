import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, SubmitButton } from '../Form';

export const RegisterForm = () => {
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

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Register');
  }, []);

  const isFilled = useMemo(() => {
    const { username, password, password2 } = user;
    return username && password && password === password2;
  }, [user]);

  return (
    <Form title="Sign up">
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <Input name="password2" type="password" label="Confirm password" value={user.password2} onChange={onChange}/>
      <SubmitButton variant="outlined" onClick={onSubmit} color="primary" disabled={!isFilled}>
          Sign up
      </SubmitButton>
    </Form>
  );
};

export default RegisterForm;
