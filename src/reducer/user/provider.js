import { UPDATE_SP, FLUSH_STATE, LOAD_SP_INFO } from '../../action/names/UserActionNames'
import { request, success, error, make } from '../../action/names/ActionKind'

const initialState = {
  info: {},
  savedInfo: {},
  updated: false,
  error: false,
}

export const providerInfo = (state = initialState, action) => {
  switch (action.type) {
    case request(UPDATE_SP):
      return {
        ...state,
        info: action.info,
        updated: false,
        error: false,
      }
    case success(UPDATE_SP):
      return {
        ...state,
        updated: true,
        error: false,
      }
    case error(UPDATE_SP):
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

    case success(LOAD_SP_INFO):
      return {
        ...state,
        savedInfo: action.data.result,
        error: false,
      }
    case error(LOAD_SP_INFO):
      return {
        ...state,
        savedInfo: {},
        error: true,
      }
    default:
      return state
  }
}
