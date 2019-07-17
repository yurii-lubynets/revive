import { LOAD_SEARCH_PROVIDERS_LIST } from '../../action/names/ContentSearchNames'
import { request, success, error } from '../../action/names/ActionKind'

const initialState = {
  searchProviders: [],
  error: false,
  searchParams: {},
  isLoading: false,
}

export const searchProvider = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_SEARCH_PROVIDERS_LIST):
      return {
        ...state,
        searchProviders: [],
        error: false,
        searchParams: action.searchParams,
        isLoading: true,
      }

    case success(LOAD_SEARCH_PROVIDERS_LIST):
      return {
        ...state,
        searchProviders: action.data.providers,
        error: false,
        isLoading: false,
      }

    case error(LOAD_SEARCH_PROVIDERS_LIST):
      return {
        ...state,
        searchProviders: [],
        error: true,
        isLoading: false,
      }

    default:
      return state
  }
}
