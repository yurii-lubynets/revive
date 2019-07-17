import { LOAD_USER_DETAILS } from '../../action/names/ChatActionNames'
import { LOGOUT } from '../../action/names/AuthActionNames'
import { request, success, error, make } from '../../action/names/ActionKind'

const initialState = {
  details: {},
  userId: '',
}

export const userDetails = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_USER_DETAILS):
      return {
        ...state,
        details: {},
        userId: action.userId,
      }

    case success(LOAD_USER_DETAILS):
      return {
        ...state,
        details: action.data,
      }

    case error(LOAD_USER_DETAILS):
      return {
        ...state,
        details: {},
        userId: '',
      }

    case make(LOGOUT):
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
