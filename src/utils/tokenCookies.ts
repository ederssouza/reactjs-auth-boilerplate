import { destroyCookie, setCookie } from 'nookies'

import { COOKIE_EXPIRATION_TIME, REFRESH_TOKEN_COOKIE, TOKEN_COOKIE } from '../utils/constants'

export function createTokenCookies (token: string, refreshToken: string) {
  setCookie(null, TOKEN_COOKIE, token, {
    maxAge: COOKIE_EXPIRATION_TIME,
    path: '/'
  })

  setCookie(null, REFRESH_TOKEN_COOKIE, refreshToken, {
    maxAge: COOKIE_EXPIRATION_TIME,
    path: '/'
  })
}

export function removeTokenCookies () {
  destroyCookie(null, TOKEN_COOKIE)
  destroyCookie(null, REFRESH_TOKEN_COOKIE)
}
