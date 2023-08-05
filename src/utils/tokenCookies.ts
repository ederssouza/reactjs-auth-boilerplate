import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  COOKIE_EXPIRATION_TIME,
  REFRESH_TOKEN_COOKIE,
  TOKEN_COOKIE
} from '@/utils'

type CreateSessionCookiesParams = {
  token?: string
  refreshToken?: string
}

export function createSessionCookies(params: CreateSessionCookiesParams) {
  const { token, refreshToken } = params

  if (token) {
    setCookie(null, TOKEN_COOKIE, token, {
      maxAge: COOKIE_EXPIRATION_TIME,
      path: '/'
    })
  }

  if (refreshToken) {
    setCookie(null, REFRESH_TOKEN_COOKIE, refreshToken, {
      maxAge: COOKIE_EXPIRATION_TIME,
      path: '/'
    })
  }
}

export function removeSessionCookies() {
  destroyCookie(null, TOKEN_COOKIE)
  destroyCookie(null, REFRESH_TOKEN_COOKIE)
}

export function getToken() {
  const cookies = parseCookies()
  return cookies[TOKEN_COOKIE]
}

export function getRefreshToken() {
  const cookies = parseCookies()
  return cookies[REFRESH_TOKEN_COOKIE]
}
