export const REQUEST = '_REQUEST'
export const SUCCESS = '_SUCCESS'
export const ERROR = '_ERROR'
export const DONE = '_DONE'

export function make(actionName) {
  return actionName + DONE
}

export function request(actionName) {
  return actionName + REQUEST
}

export function success(actionName) {
  return actionName + SUCCESS
}

export function error(actionName) {
  return actionName + ERROR
}
