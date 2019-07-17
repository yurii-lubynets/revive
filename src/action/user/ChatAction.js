import { request, make } from '../names/ActionKind'
import {
  LOAD_USER_CHATS,
  LOAD_CHAT_HISTORY,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  LOAD_USER_DETAILS,
  LOAD_UNREAD_CHATS,
  SEND_READ_CHATS,
  FLUSH_CHAT,
  FLUSH_CHATS_LIST,
  LOAD_NOTIFICATION_ID,
  CLOSE_NOTIFICATION,
  LOAD_USER_VISAS,
} from '../names/ChatActionNames'

export const loadUserChats = () => ({
  type: request(LOAD_USER_CHATS),
})
export const loadChatHistory = (userId, page) => ({
  type: request(LOAD_CHAT_HISTORY),
  userId,
  page,
})
export const loadUserDetails = userId => ({
  type: request(LOAD_USER_DETAILS),
  userId,
})
export const loadUnreadChats = list => ({
  type: request(LOAD_UNREAD_CHATS),
  list,
})
export const sendReadChats = conversationId => ({
  type: request(SEND_READ_CHATS),
  conversationId,
})
export const sendMessage = (toUserId, text, userId) => ({
  type: request(SEND_MESSAGE),
  toUserId,
  text,
  userId,
})
export const newMessage = data => ({
  type: request(RECEIVE_MESSAGE),
  data,
})
export const flushChat = () => ({
  type: make(FLUSH_CHAT),
})
export const flushChatsList = () => ({
  type: make(FLUSH_CHATS_LIST),
})
export const loadNotificationId = () => ({
  type: request(LOAD_NOTIFICATION_ID),
})
export const closeNotification = () => ({
  type: make(CLOSE_NOTIFICATION),
})
export const loadUserVisas = revivegrantId => ({
  type: request(LOAD_USER_VISAS),
  revivegrantId,
})
