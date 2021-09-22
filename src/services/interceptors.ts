import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { parseCookies } from 'nookies'

import { REFRESH_TOKEN_COOKIE, TOKEN_COOKIE } from '../utils/constants'
import { createTokenCookies, removeTokenCookies } from '../utils/tokenCookies'
import { api } from './api'

interface IFailedRequestQueue {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: IFailedRequestQueue[] = []

export function setAuthorizationHeader (request: AxiosRequestConfig, token: string) {
  request.headers.Authorization = `Bearer ${token}`
}

function handleRefreshToken (refreshToken: string) {
  isRefreshing = true

  api.post('/refresh', { refreshToken })
    .then(response => {
      const { token } = response.data

      createTokenCookies(token, response.data.refreshToken)
      setAuthorizationHeader(api.defaults, token)

      // calls the `onSuccess` method on the failed with list
      failedRequestQueue.forEach(request => request.onSuccess(token))
      failedRequestQueue = []
    })
    .catch(error => {
      // calls the `onFailure` method on the failed with list
      failedRequestQueue.forEach(request => request.onFailure(error))
      failedRequestQueue = []

      removeTokenCookies()
    })
    .finally(() => {
      isRefreshing = false
    })
}

function onRequest (config: AxiosRequestConfig): AxiosRequestConfig {
  const cookies = parseCookies()
  const token = cookies[TOKEN_COOKIE]

  if (token) setAuthorizationHeader(config, token)
  return config
}

function onRequestError (error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error)
}

function onResponse (response: AxiosResponse): AxiosResponse {
  return response
}

function onResponseError (error: AxiosError): Promise<AxiosError | AxiosResponse> {
  if (error?.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      const originalConfig = error.config
      const cookies = parseCookies()
      const refreshToken = cookies[REFRESH_TOKEN_COOKIE]

      // prevent a new request with old token
      !isRefreshing && handleRefreshToken(refreshToken)

      // create a request list to reprocess
      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            setAuthorizationHeader(originalConfig, token)
            resolve(api(originalConfig))
          },
          onFailure: (error: AxiosError) => reject(error)
        })
      })
    } else {
      removeTokenCookies()
    }
  }

  return Promise.reject(error)
}

export function setupInterceptors (axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
