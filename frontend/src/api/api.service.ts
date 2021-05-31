import axios, { AxiosRequestConfig } from 'axios'
import { removeUserFromLocalStorage } from '../app/utils'

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/'
axios.defaults.headers.common = {
  'x-auth-token': localStorage.getItem('token'),
}
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          if (data.message === 'UNAUTHORIZED') {
            try {
              const config = error.config
              await axios.get('/refresh-token')
              return await axios({
                method: config.method,
                url: config.url,
                data: config.data,
                withCredentials: true,
              })
            } catch (e) {
              return _redirect()
            }
          } else {
            return _redirect()
          }
        default:
          return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }

    function _redirect() {
      try {
        removeUserFromLocalStorage()
        return (window.location.href = '/login')
      } catch {}
    }
  },
)

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
