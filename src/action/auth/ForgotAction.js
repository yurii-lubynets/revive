import { make, request } from '../names/ActionKind'
import { FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD, FLUSH_FORGOT_STATE } from '../names/AuthActionNames'

export const forgotPassword = email => ({
  type: request(FORGOT_PASSWORD),
  email,
})

export const resendForgotPassword = email => ({
  type: request(RESEND_FORGOT_PASSWORD),
  email,
})

export const flushState = () => ({
  type: make(FLUSH_FORGOT_STATE),
})
