import { LOGIN_SN, FLUSH_LOGIN_SN_STATE } from '../../action/names/AuthActionNames'
import * as ActionKind from '../../action/names/ActionKind'

const initialState = {
  code: '',
  error406: false,
  error409: false,
  description: '',
  isLoading: false,
}

export const loginSN = (state = initialState, action) => {
  switch (action.type) {
    case ActionKind.request(LOGIN_SN):
      return {
        ...state,
        code: action.code,
        isLoading: true,
      }
    case ActionKind.success(LOGIN_SN):
      return {
        ...state,
        error: false,
        isLoading: false,
      }
    case ActionKind.error(`${LOGIN_SN}|406`):
      return {
        ...state,
        error406: true,
        isLoading: false,
      }
    case ActionKind.error(`${LOGIN_SN}|409`):
      return {
        ...state,
        error409: true,
        isLoading: false,
        description: action.errorMessage,
      }
    case ActionKind.error(LOGIN_SN):
      return {
        ...state,
        isLoading: false,
      }
    case ActionKind.make(FLUSH_LOGIN_SN_STATE):
      return {
        ...state,
        code: '',
        error406: false,
        error409: false,
      }
    default:
      return state
  }
}
