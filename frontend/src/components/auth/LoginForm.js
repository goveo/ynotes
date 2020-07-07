import React, { useState, useCallback, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, SubmitButton } from '../Form';
import AuthContext from '../../context/auth/authContext';

export const LoginForm = ({ onSubmit, postContent}) => {
  const authContext = useContext(AuthContext);

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
    <Form title="Login" postContent={postContent} error={authContext.error}>
      <Input name="username" label="Username" value={user.username} onChange={onChange}/>
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange}/>
      <SubmitButton variant="outlined" onClick={onSubmitClick} color="primary" disabled={!isFilled}>
        Login
      </SubmitButton>
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  postContent: PropTypes.element,
};

export default LoginForm;
