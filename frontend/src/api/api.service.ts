import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/'
axios.defaults.headers.common = {
  'x-auth-token': localStorage.getItem('token'),
}

const api = {
  post: <T = any, R = T>(
    path: string,
    data: T,
    config?: AxiosRequestConfig,
  ) => {
    return axios.post<R>(path, data, config)
  },
  get: <R = any>(path: string, config?: AxiosRequestConfig) => {
    return axios.get<R>(path, config)
  },
  getMany: <R>(path: string, config?: AxiosRequestConfig) => {
    const course = localStorage.getItem('activeCourse')
    const courseId = course ? JSON.parse(course)._id : null
    return axios.get<R>(path, {
      params: { courseId },
      ...config,
    })
  },
  delete: <R = any>(path: string, config?: AxiosRequestConfig) => {
    return axios.delete<R>(path, config)
  },
  patch: <T = any, R = T>(
    path: string,
    data: T,
    config?: AxiosRequestConfig,
  ) => {
    return axios.patch<R>(path, data, config)
  },
  put: <T = any, R = T>(path: string, data: T) => {
    const putConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    return axios.put<R>(path, data, putConfig)
  },
}

export default api
