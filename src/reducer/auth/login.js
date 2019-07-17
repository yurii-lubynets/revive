import { LOGIN, LOGOUT, GET_TOKEN, RESEND_EMAIL, FLUSH_LOGIN_STATE } from '../../action/names/AuthActionNames'
import { AUTH_TOKEN, AUTH_DETAILS_NAME } from '../../common/constant/LocalStorageConst'
import { readCookie } from '../../common/constant/Cookie'
import * as ActionKind from '../../action/names/ActionKind'

const initialState = {
  isAuthenticated:
    !!loadLocalDetails(AUTH_TOKEN) &&
    !!loadLocalDetails(AUTH_TOKEN).access_token &&
    !!loadLocalDetails(AUTH_TOKEN).refresh_token,
  user: loadLocalDetails(AUTH_DETAILS_NAME),
  failed: false,
  error: false,
  remembered: true,
  isLoading: false,
  error409: false,
  error403: false,
  description: '',
}

export const login = (state = initialState, action) => {
  switch (action.type) {
    case ActionKind.request(LOGIN):
      return {
        ...state,
        user: action.credentials,
        remembered: action.credentials.rememberUser,
        failed: false,
        isLoading: true,
      }
    case ActionKind.success(LOGIN):
      return {
        ...state,
        isAuthenticated: false,
      }
    case ActionKind.error(LOGIN):
      return {
        ...state,
        isAuthenticated: false,
        failed: true,
        isLoading: false,
      }
    case ActionKind.success(GET_TOKEN):
      return {
        ...state,
        isAuthenticated: true,
        user: action.data,
        isLoading: false,
      }
    case ActionKind.error(GET_TOKEN):
      return {
        ...state,
        isAuthenticated: false,
        failed: true,
        isLoading: false,
      }
    //for not-verified users
    case ActionKind.error(`${LOGIN}|422`):
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      }
    //for not-verified users
    case ActionKind.error(`${LOGIN}|403`):
      return {
        ...state,
        error403: true,
        isAuthenticated: false,
        isLoading: false,
      }
    //for users signed in via Google/Fb account
    case ActionKind.error(`${LOGIN}|409`):
      return {
        ...state,
        error409: true,
        isLoading: false,
        description: action.errorMessage,
      }
    case ActionKind.request(RESEND_EMAIL):
      return {
        ...state,
        email: action.email,
      }
    case ActionKind.success(RESEND_EMAIL):
      return {
        ...state,
        error: false,
      }
    case ActionKind.error(RESEND_EMAIL):
      return {
        ...state,
        error: true,
      }

    case ActionKind.make(LOGOUT):
      return {
        ...state,
        isAuthenticated: false,
        remembered: false,
        user: {},
      }

    case ActionKind.make(FLUSH_LOGIN_STATE):
      return {
        ...state,
        failed: false,
        error: false,
        error409: false,
        error403: false,
      }
    default:
      return state
  }
}

function loadLocalDetails(name) {
  return JSON.parse(localStorage.getItem(name) || readCookie(name)) || ''
}
