import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, SubmitButton } from '../Form';

export const RegisterForm = ({ onSubmit, postContent }) => {
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

  const onSubmitClick = useCallback((e) => {
    e.preventDefault();
    onSubmit(user);
  }, [onSubmit, user]);

  const isFilled = useMemo(() => {
    const { username, password, password2 } = user;
    return username && password && password === password2;
  }, [user]);

  return (
    <Form title="Sign up" postContent={postContent}>
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <Input name="password2" type="password" label="Confirm password" value={user.password2} onChange={onChange}/>
      <SubmitButton variant="outlined" onClick={onSubmitClick} color="primary" disabled={!isFilled}>
        Sign up
      </SubmitButton>
    </Form>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  postContent: PropTypes.element,
};

export default RegisterForm;
