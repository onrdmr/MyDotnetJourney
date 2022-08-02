import { Activity } from './../models/activity'
import axios, { Axios, AxiosResponse } from 'axios'
import { rejects } from 'assert'

axios.defaults.baseURL = 'http://localhost:5000/api'

const sleep = (delay: number) =>
  new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve('resolving')
    }, delay)
  })

axios.interceptors.response.use(async (response) => {
  return await sleep(700)
    .then(() => {
      console.log('getting data completed.')
      return response
    })
    .catch(() => {
      return Promise.reject('rejected')
    })
})

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
