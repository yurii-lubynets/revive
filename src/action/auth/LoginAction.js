import {
  LOGIN,
  LOGIN_SN,
  LOGOUT,
  RESEND_EMAIL,
  FLUSH_LOGIN_STATE,
  FLUSH_LOGIN_SN_STATE,
  PREVIOUS_PAGE,
  FLUSH_PREVIOUS_PAGE,
  REFRESH_TOKEN,
} from '../names/AuthActionNames'
import { request, make } from '../names/ActionKind'

export const loginUser = credentials => ({
  type: request(LOGIN),
  credentials,
})

export const loginUserSN = code => ({
  type: request(LOGIN_SN),
  code,
})

export const resendConfirmationEmail = email => ({
  type: request(RESEND_EMAIL),
  email,
})

export const logoutUser = () => ({
  type: make(LOGOUT),
})

export const flushState = () => ({
  type: make(FLUSH_LOGIN_STATE),
})

export const flushSNState = () => ({
  type: make(FLUSH_LOGIN_SN_STATE),
})

export const previousPage = pathname => ({
  type: make(PREVIOUS_PAGE),
  pathname,
})

export const flushPreviousPage = () => ({
  type: make(FLUSH_PREVIOUS_PAGE),
})

export const refreshToken = () => ({
  type: request(REFRESH_TOKEN),
})
