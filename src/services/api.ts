import axios from 'axios'

import { setupInterceptors } from './interceptors'

export const api = setupInterceptors(axios.create({
  baseURL: process.env.REACT_APP_API_URL
}))
