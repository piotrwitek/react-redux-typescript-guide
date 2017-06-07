import axios from 'axios';
const getToken = () => 'some-token';

const formatToken = (token: string | null) => {
  return token && `Token ${token}`;
};

const agent = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
  timeout: 4000,
  headers: {
    common: {
      Authorization: formatToken(getToken()),
    },
  },
});

// Public

export default agent;

export const setToken = (token: string | null) => {
  agent.defaults.headers.common.Authorization = formatToken(token);
};


