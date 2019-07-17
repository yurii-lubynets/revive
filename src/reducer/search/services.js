import { LOAD_POPULAR_SERVICES } from '../../action/names/ContentSearchNames'
import { request, success, error } from '../../action/names/ActionKind'

const initialState = {
  services: [],
  error: false,
  isLoading: false,
}

export const services = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_POPULAR_SERVICES):
      return {
        ...state,
        services: [],
        error: false,
        isLoading: true,
      }

    case success(LOAD_POPULAR_SERVICES):
      return {
        ...state,
        services: action.data.result,
        error: false,
        isLoading: false,
      }

    case error(LOAD_POPULAR_SERVICES):
      return {
        ...state,
        services: [],
        error: true,
        isLoading: false,
      }

    default:
      return state
  }
}
