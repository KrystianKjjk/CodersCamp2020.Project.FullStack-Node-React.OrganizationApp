import axios from 'axios';


export default axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  timeout: 60000,
  headers: {
    'x-auth-token': localStorage.getItem('token')
  },
});