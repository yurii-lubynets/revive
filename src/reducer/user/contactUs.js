import { CONTACT_US, FLUSH_STATE } from '../../action/names/UserActionNames'
import { request, success, error, make } from '../../action/names/ActionKind'

const initialState = {
  mail: {},
  resetForm: () => {},
  sent: false,
  error: false,
}

export const contactUs = (state = initialState, action) => {
  switch (action.type) {
    case request(CONTACT_US):
      return {
        ...state,
        mail: action.mail,
        resetForm: action.resetForm,
        sent: false,
        error: false,
      }

    case success(CONTACT_US):
      return {
        ...state,
        sent: true,
        error: false,
      }

    case error(CONTACT_US):
      return {
        ...state,
        sent: false,
        error: true,
      }
    case make(FLUSH_STATE):
      return {
        ...state,
        sent: false,
        error: false,
        mail: {},
        resetForm: () => {},
      }
    default:
      return state
  }
}
