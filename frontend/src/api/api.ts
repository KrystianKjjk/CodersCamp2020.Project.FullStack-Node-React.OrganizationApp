import axios from 'axios';
import { API_URL }  from '../Constants';

export default axios.create({
  baseURL: API_URL,
  timeout: 1000,
});