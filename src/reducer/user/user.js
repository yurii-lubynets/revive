import { UPDATE_USER, FLUSH_STATE } from '../../action/names/UserActionNames'
import { request, success, error, make } from '../../action/names/ActionKind'

const initialState = {
  info: {},
  updated: false,
  error: false,
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case request(UPDATE_USER):
      return {
        ...state,
        info: action.info,
        updated: false,
        error: false,
      }
    case success(UPDATE_USER):
      return {
        ...state,
        content: action.data,
        updated: true,
        error: false,
      }
    case error(UPDATE_USER):
      return {
        ...state,
        info: {},
        error: true,
        updated: false,
      }
    case make(FLUSH_STATE):
      return {
        ...state,
        info: {},
        updated: false,
        error: false,
      }
    default:
      return state
  }
}
