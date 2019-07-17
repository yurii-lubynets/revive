import { request, make } from '../names/ActionKind'
import {
  JOIN_NEW_USER,
  JOIN_NEW_SP,
  REGISTER_NEW_USER,
  REGISTER_NEW_SP,
  FLUSH_REGISTER_STATE,
} from '../names/AuthActionNames'

export const createUser = user => ({
  type: make(JOIN_NEW_USER),
  user,
})
export const registerUser = (user, history) => ({
  type: request(REGISTER_NEW_USER),
  user,
  history,
})
export const createSP = user => ({
  type: make(JOIN_NEW_SP),
  user,
})
export const registerSP = (user, history) => ({
  type: request(REGISTER_NEW_SP),
  user,
  history,
})

export const flushRegisterState = () => ({
  type: make(FLUSH_REGISTER_STATE),
})
