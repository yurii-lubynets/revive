import { JOIN_NEW_SP, REGISTER_NEW_SP, FLUSH_REGISTER_STATE } from '../../action/names/AuthActionNames'
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

export const joinSP = (state = initialState, action) => {
  switch (action.type) {
    case actionKind.request(REGISTER_NEW_SP):
      return {
        ...state,
        user: action.user,
        history: action.history,
        error: false,
        isLoading: true,
      }

    case actionKind.success(REGISTER_NEW_SP):
      return {
        ...state,
        user: action.response,
        isLoading: false,
      }
    case actionKind.error(`${REGISTER_NEW_SP}|409`):
      return {
        ...state,
        error409: true,
        isLoading: false,
        description: action.errorMessage,
      }
    case actionKind.error(REGISTER_NEW_SP):
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }

    case actionKind.make(JOIN_NEW_SP):
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
