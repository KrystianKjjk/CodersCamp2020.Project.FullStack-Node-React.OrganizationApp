import axios from 'axios';

export default class BaseService {
    post = (path: string, ...rest: any[]) => {
        return axios.post(process.env.REACT_APP_API_URL + '/api/' + path, ...rest)
    }
}