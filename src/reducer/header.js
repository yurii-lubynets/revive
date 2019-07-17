import { make } from '../action/names/ActionKind'
import { HEADER_MENU_SHOW, HEADER_MENU_HIDE } from '../action/names/HeaderActionNames'

const initialState = {
  visibleMenu: false,
}

export const header = (state = initialState, action) => {
  switch (action.type) {
    case make(HEADER_MENU_SHOW):
      document.body.style.position = 'fixed'
      // document.body.style.overflowX = 'initial'
      return {
        ...state,
        visibleMenu: true,
      }
    case make(HEADER_MENU_HIDE):
      document.body.style.position = 'unset'
      // document.body.style.overflowX = 'hidden'
      return {
        ...state,
        visibleMenu: false,
      }
    default:
      return state
  }
}
