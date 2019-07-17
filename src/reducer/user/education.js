import { LOAD_SP_EDUCATION } from '../../action/names/UserActionNames'
import { request, success, error } from '../../action/names/ActionKind'

const initialState = {
  loadedEducation: [],
  error: false,
  isLoading: false,
}

export const education = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_SP_EDUCATION):
      return {
        ...state,
        isLoading: false,
      }
    case success(LOAD_SP_EDUCATION):
      return {
        ...state,
        loadedEducation: action.data.results,
        isLoading: false,
      }
    case error(LOAD_SP_EDUCATION):
      return {
        ...state,
        loadedEducation: [],
        isLoading: false,
      }
    default:
      return state
  }
}
