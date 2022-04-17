import axios from 'axios';

const URL = 'http://localhost:3000/api/';

const getToken = () => 'some-token';

const formatToken = (token: string) => {
  return `Token ${token}`;
};

// Public

export const setToken = (token: string) => {
  agentInstance.defaults.headers.common.Authorization = formatToken(token);
};

const agentInstance = axios.create({
  baseURL: URL,
  timeout: 4000,
  headers: {
    Authorization: formatToken(getToken()),
  },
});
export default agentInstance;
