import axios, { AxiosRequestConfig } from 'axios';
import {removeUserFromLocalStorage} from "./utils";

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/';
axios.defaults.withCredentials = true;
axios.defaults.adapter = require('axios/lib/adapters/http');

axios.interceptors.response.use( response => response,
    async error => {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                    if (data.message === "UNAUTHORIZED") {
                        try {
                            const config = error.config;
                            await axios.get('/refresh-token');
                            return await axios({method: config.method, url: config.url, data: config.data, withCredentials: true});
                        } catch (e) {
                           return _redirect();
                        }
                    } else {
                        return _redirect();
                    }
                default:
                    return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }

        function _redirect() {
            try {
                removeUserFromLocalStorage();
                return window.location.href = "/login";
            }
            catch {
                return;
            }
        }


    }
);

export default class BaseService {
    post = (path: string, data: any, config?: AxiosRequestConfig) => {
        return axios.post(path, data, config)
    }
    get = (path: string, config?: AxiosRequestConfig) => {
        return axios.get(path, config)
    }
    delete = (path: string, config?: AxiosRequestConfig) => {
        return axios.delete(path, config)
    }
    patch = (path: string, data: any, config?: AxiosRequestConfig) => {
        return axios.patch(path, data, config)
    }
    put = (path: string, data: any) => {
        const putConfig = {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
          }
        return axios.put(path, data, {...putConfig })
  }
}
