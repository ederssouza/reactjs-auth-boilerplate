import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { COOKIE_EXPIRATION_TIME } from '../utils/constants'

interface IFailedRequestQueue {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

let isRefreshing = false
let failedRequestQueue: IFailedRequestQueue[] = []

api.interceptors.request.use(request => {
  const { 'reactauth.token': token } = parseCookies()
  if (token) request.headers.Authorization = `Bearer ${token}`
  return request
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error?.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      const originalConfig = error.config
      const cookies = parseCookies()
      const { 'reactauth.refreshToken': refreshToken } = cookies

      // prevent a new request with old token
      if (!isRefreshing) {
        isRefreshing = true

        api.post('/refresh', { refreshToken })
          .then(response => {
            const { token } = response.data

            setCookie(null, 'reactauth.token', token, {
              maxAge: COOKIE_EXPIRATION_TIME,
              path: '/'
            })

            setCookie(null, 'reactauth.refreshToken', response.data.refreshToken, {
              maxAge: COOKIE_EXPIRATION_TIME,
              path: '/'
            })

            // force set token
            api.defaults.headers.Authorization = `Bearer ${token}`

            // calls the `onSuccess` method on the failed with list
            failedRequestQueue.forEach(request => request.onSuccess(token))
            failedRequestQueue = []
          })
          .catch(err => {
            // calls the `onFailure` method on the failed with list
            failedRequestQueue.forEach(request => request.onFailure(err))
            failedRequestQueue = []

            // TODO:
            console.log('call signOut() method')
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      // create a request list to reprocess
      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers.Authorization = `Bearer ${token}`
            resolve(api(originalConfig))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          }
        })
      })
    } else {
      // TODO:
      console.log('call signOut() method')
    }
  }

  return Promise.reject(error)
})
