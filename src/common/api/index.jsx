import axios from 'axios'

import { AUTH_SERVICE, ACCOUNT_SERVICE, CHAT_SERVICE } from '../constant/ServiceNameConst'
import { AUTH_TOKEN } from '../constant/LocalStorageConst'
import { readCookie } from '../constant/Cookie'

const AUTH_HOST = process.env.REACT_APP_AUTH_API_HOST
const ACCOUNT_HOST = process.env.REACT_APP_ACCOUNT_API_HOST
const DEFAULT_HOST = process.env.REACT_APP_DEFAULT_API_HOST
const CHAT_HOST = process.env.REACT_APP_CHAT_API_HOST 

export function get(path, serviceName = ACCOUNT_SERVICE, secure = true) {
  const HOST = defineHost(serviceName) + path
  const defaultHeaders = getDefaultHeaders(secure)

  return axios.get(HOST, { headers: defaultHeaders })
}

export function post(path, object, serviceName, secure = true) {
  const HOST = defineHost(serviceName) + path
  const defaultHeaders = getDefaultHeaders(secure)

  return axios.post(HOST, object, { headers: defaultHeaders })
}

export function put(path, object, serviceName, secure = true) {
  const HOST = defineHost(serviceName) + path
  const defaultHeaders = getDefaultHeaders(secure)

  return axios.put(HOST, object, { headers: defaultHeaders })
}

export function auth(path, serviceName, secure) {
  const HOST = defineHost(serviceName) + path
  const defaultHeaders = getDefaultHeaders(secure)

  return axios.get(HOST, { headers: defaultHeaders })
}

function getDefaultHeaders(secure = false) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (secure) {
    const USER_DETAILS = JSON.parse(localStorage.getItem(AUTH_TOKEN) || readCookie(AUTH_TOKEN))
    const token = USER_DETAILS ? USER_DETAILS.access_token : null
    if (token)
      Object.assign(headers, { Authorization: `Bearer ${token}` })
  }

  return headers
}

function defineHost(serviceName) {
  switch (serviceName) {
    case ACCOUNT_SERVICE:
      return ACCOUNT_HOST
    case AUTH_SERVICE:
      return AUTH_HOST
    case CHAT_SERVICE:
      return CHAT_HOST

    default:
      return DEFAULT_HOST
  }
}