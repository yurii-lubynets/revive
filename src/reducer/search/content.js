import { LOAD_DEFAULT_CONTENT_LIST } from '../../action/names/ContentSearchNames'
import { request, success, error } from '../../action/names/ActionKind'

const initialState = {
  countries: [],
  error: false,
  isLoading: false,
}

export const content = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_DEFAULT_CONTENT_LIST):
      return {
        ...state,
        countries: [],
        error: false,
        isLoading: true,
      }

    case success(LOAD_DEFAULT_CONTENT_LIST):
      return {
        ...state,
        countries: action.data.countries,
        error: false,
        isLoading: false,
      }

    case error(LOAD_DEFAULT_CONTENT_LIST):
      return {
        ...state,
        contents: [],
        error: true,
        isLoading: false,
      }

    default:
      return state
  }
}
