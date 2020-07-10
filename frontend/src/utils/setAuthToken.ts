import axios from 'axios';

export default (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
  else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
