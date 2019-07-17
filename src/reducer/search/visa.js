import { LOAD_VISA_TYPE_LIST } from '../../action/names/ContentSearchNames'
import { request, success, error } from '../../action/names/ActionKind'

const initialState = {
  visas: [],
  error: false,
  countryId: '',
  mobile: false,
  isLoading: false,
}

export const visas = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_VISA_TYPE_LIST):
      return {
        ...state,
        visas: [],
        error: false,
        countryId: action.countryId,
        mobile: action.mobile,
        isLoading: true,
      }

    case success(LOAD_VISA_TYPE_LIST):
      return {
        ...state,
        visas: action.data.visaTypes,
        error: false,
        isLoading: false,
      }

    case error(LOAD_VISA_TYPE_LIST):
      return {
        ...state,
        visas: [],
        error: true,
        isLoading: false,
      }

    default:
      return state
  }
}
