import axios, { AxiosRequestConfig } from 'axios';
import {removeUserFromLocalStorage} from "./utils";

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/';

axios.interceptors.response.use( response => response,
    async function (error) {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                    if (data.message === "UNAUTHORIZED") {
                        try {
                            const config = error.config;
                            await new BaseService().get('/refresh-token');
                            return await axios({method: config.method, url: config.url, data: config.data, withCredentials: true});
                        } catch (e) {
                            removeUserFromLocalStorage();
                            return window.location.href = "/login";
                        }
                    } else {
                        removeUserFromLocalStorage();
                        return window.location.href = "/login";
                    }
                default:
                    return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

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
