import axios from 'axios';

export default (baseUrl) => axios.defaults.baseURL = baseUrl;
