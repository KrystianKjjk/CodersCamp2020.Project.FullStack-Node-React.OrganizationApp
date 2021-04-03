import axios from 'axios';


export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    'x-auth-token': localStorage.getItem('token')
  },
});