import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/';
//axios.defaults.headers.common = {'x-auth-token': localStorage.getItem('token')};

export default class BaseService {
    post = (path: string, data: any, config?: AxiosRequestConfig) => {
        return axios.post(path, data, {...config, withCredentials: true })
    }
    get = (path: string, config?: AxiosRequestConfig) => {
        return axios.get(path, {...config, withCredentials: true })
    }
    delete = (path: string, config?: AxiosRequestConfig) => {
        return axios.delete(path, {...config, withCredentials: true })
    }
    patch = (path: string, data: any, config?: AxiosRequestConfig) => {
        return axios.patch(path, data, {...config, withCredentials: true })
    }
    put = (path: string, data: any) => {
        const putConfig = {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
          }
        return axios.put(path, data, {...putConfig, withCredentials: true })
    }
}
