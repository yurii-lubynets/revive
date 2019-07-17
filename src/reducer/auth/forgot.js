import { FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD, FLUSH_FORGOT_STATE } from '../../action/names/AuthActionNames'
import * as actionKind from '../../action/names/ActionKind'

const initialState = {
  forgot: false,
  error: false,
}

export const forgot = (state = initialState, action) => {
  switch (action.type) {
    case actionKind.request(FORGOT_PASSWORD):
      return {
        ...state,
        email: action.email,
        error: false,
        forgot: false,
      }
    case actionKind.success(FORGOT_PASSWORD):
      return {
        ...state,
        forgot: true,
      }
    case actionKind.error(FORGOT_PASSWORD):
      return {
        ...state,
        error: true,
      }
    case actionKind.request(RESEND_FORGOT_PASSWORD):
      return {
        ...state,
        forgot: true,
        email: action.email,
      }
    case actionKind.make(FLUSH_FORGOT_STATE):
      return {
        ...state,
        error: false,
      }

    default:
      return state
  }
}
