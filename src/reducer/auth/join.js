import { JOIN_NEW_USER, REGISTER_NEW_USER, FLUSH_REGISTER_STATE } from '../../action/names/AuthActionNames'
import * as actionKind from '../../action/names/ActionKind'

const initialState = {
  credentials: {},
  user: {},
  history: () => {},
  error: false,
  error409: false,
  isLoading: false,
  description: '',
}

export const join = (state = initialState, action) => {
  switch (action.type) {
    case actionKind.request(REGISTER_NEW_USER):
      return {
        ...state,
        user: action.user,
        history: action.history,
        error: false,
        isLoading: true,
      }

    case actionKind.success(REGISTER_NEW_USER):
      return {
        ...state,
        user: action.response,
        isLoading: false,
      }
    case actionKind.error(`${REGISTER_NEW_USER}|409`):
      return {
        ...state,
        error409: true,
        isLoading: false,
        description: action.errorMessage,
      }
    case actionKind.error(REGISTER_NEW_USER):
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }

    case actionKind.make(JOIN_NEW_USER):
      return {
        ...state,
        credentials: { email: action.user.email, password: action.user.password },
      }

    case actionKind.make(FLUSH_REGISTER_STATE):
      return {
        ...state,
        error: false,
        error409: false,
      }
    default:
      return state
  }
}
