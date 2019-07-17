import { LOAD_PROVIDER, CONTACT_PROVIDER, FLUSH_CONTACT_PROVIDER } from '../../action/names/ContentSearchNames'
import { request, success, error, make } from '../../action/names/ActionKind'

const initialState = {
  provider: {},
  providerId: '',
  error: false,
  isLoading: false,
  clickContact: false,
}

export const provider = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_PROVIDER):
      return {
        ...state,
        provider: {},
        providerId: action.providerId,
        error: false,
        isLoading: true,
      }

    case success(LOAD_PROVIDER):
      return {
        ...state,
        provider: action.data.provider,
        error: false,
        isLoading: false,
      }

    case error(LOAD_PROVIDER):
      return {
        ...state,
        provider: {},
        providerId: '',
        error: true,
        isLoading: false,
      }
    case make(CONTACT_PROVIDER):
      return {
        ...state,
        clickContact: action.providerId,
      }
    case make(FLUSH_CONTACT_PROVIDER):
      return {
        ...state,
        clickContact: false,
      }
    default:
      return state
  }
}
