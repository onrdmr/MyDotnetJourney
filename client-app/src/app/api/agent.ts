import { history } from './../../index'
import { Activity } from './../models/activity'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { rejects } from 'assert'
import { toast } from 'react-toastify'
import { store } from '../stores/store'
import { HighlightSpanKind } from 'typescript'

axios.defaults.baseURL = 'http://localhost:5000/api'

const sleep = (delay: number) =>
  new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve('resolving')
    }, delay)
  })

axios.interceptors.response.use(
  async (response) => {
    return await sleep(700)
      .then(() => {
        console.log('getting data completed.')
        return response
      })
      .catch(() => {
        return Promise.reject('rejected')
      })
  },
  (error: AxiosError) => {
    const { data: d, status, config } = error.response!
    let data: any = d!
    switch (status) {
      case 400:
        if (config.method == 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found')
        }
        if (data.errors) {
          const modalStateErrors = []
          for (const key in data.errors) {
            modalStateErrors.push(data.errors[key])
          }
          throw modalStateErrors.flat()
        } else {
          toast.error(data)
        }
        console.log(data)
        toast.error('bad request')
        break

      case 401:
        toast.error('not authorized')
        break
      case 404:
        history.push('/not-found')
        break
      case 500:
        store.commonStore.setServerError(data)
        history.push('/server-error')
        break
    }
  }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>(`/activities/`, activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (activity: Activity) =>
    requests.del<void>(`/activities/${activity.id}`),
}

const agent = {
  Activities,
  requests,
}

export default agent
