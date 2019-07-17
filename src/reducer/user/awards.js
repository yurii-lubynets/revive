import { LOAD_SP_AWARDS } from '../../action/names/UserActionNames'
import { request, success, error } from '../../action/names/ActionKind'

const initialState = {
  data: [],
  error: false,
  isLoading: false,
}

export const awards = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_SP_AWARDS):
      return {
        ...state,
        isLoading: false,
      }
    case success(LOAD_SP_AWARDS):
      return {
        ...state,
        data: action.data,
        isLoading: false,
      }
    case error(LOAD_SP_AWARDS):
      return {
        ...state,
        data: [],
        isLoading: false,
      }
    default:
      return state
  }
}
