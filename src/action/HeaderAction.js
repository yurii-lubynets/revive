import { make } from '../action/names/ActionKind'
import { HEADER_MENU_SHOW, HEADER_MENU_HIDE } from '../action/names/HeaderActionNames'

export const showMenu = () => ({
  type: make(HEADER_MENU_SHOW),
})

export const hideMenu = () => ({
  type: make(HEADER_MENU_HIDE),
})
