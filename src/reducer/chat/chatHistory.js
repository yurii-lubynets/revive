import {
  LOAD_CHAT_HISTORY,
  RECEIVE_MESSAGE,
  LOAD_PAGE,
  FLUSH_CHAT,
  SHOW_MESSAGE,
} from '../../action/names/ChatActionNames'
import { LOGOUT } from '../../action/names/AuthActionNames'

import { request, success, make } from '../../action/names/ActionKind'

const initialState = {
  conversationId: '',
  userId: '',
  messages: [],
  isLoading: false,
  scroll: false,
  page: 0,
}

export const chatHistory = (state = initialState, action) => {
  switch (action.type) {
    case request(LOAD_CHAT_HISTORY):
      return {
        ...state,
        userId: action.userId,
        isLoading: true,
        scroll: false,
      }
    case success(LOAD_CHAT_HISTORY):
      return {
        ...state,
        messages: action.conversations.reverse(),
        conversationId: action.conversationId,
        userId: action.userId,
        isLoading: false,
      }

    case make(RECEIVE_MESSAGE):
      return {
        ...state,
        messages: action.data.from,
        scroll: true,
      }

    case make(SHOW_MESSAGE):
      return {
        ...state,
        messages: [...action.data],
        scroll: true,
      }
    case make(LOAD_PAGE):
      return {
        ...state,
        messages: [...action.conversations.reverse()],
        page: action.page + 1,
      }

    case make(FLUSH_CHAT):
      return {
        messages: [],
        conversationId: '',
        userId: '',
        page: 0,
        scroll: false,
        isLoading: false,
      }

    case make(LOGOUT):
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
