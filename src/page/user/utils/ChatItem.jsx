import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import Logo from '../../../common/components/logo/Logo'

import { isMobile } from '../../../util/responsive'
import { formatDate } from '../../../util/formatDate'

import styles from '../UserContainer.module.css'


const formatMessage = (lastMessage, screen) => {
  if(isMobile(screen)) {
    if (lastMessage.substring(0,28).includes('\n')) {
      return lastMessage.substring(0, lastMessage.indexOf('\n'))
    } else if (lastMessage.length>28) {
      return `${lastMessage.substring(0,28)}...`
    }
    return lastMessage
  } else {
    if (lastMessage.substring(0,57).includes('\n')) {
      return lastMessage.substring(0, lastMessage.indexOf('\n'))
    } else if (lastMessage.length>57) {
      return `${lastMessage.substring(0,57)}...`
    }
    return lastMessage
  }
}

const ChatItem = props => {
  const { user: { userId, name, lastMessage, lastMessageDate, userPick, isRead = 0 }, screen, selectedChat } = props
  
  const userCredentials = { 
    firstName: name && name.substr(0, name.indexOf(' ')).trim(),
    lastName: name && name.substr(name.indexOf(' ')+1).trim(),
  }
  
  function handleClick(props) {
    const { user: { userId }, chatAction: { loadUserDetails, loadChatHistory, sendReadChats, flushChat }, match, chats, selectedChat } = props
    const prevChat = chats && chats.find(chat => chat.userId === match.params.chatId)

    if (!selectedChat){
      if (prevChat && prevChat.conversationId) {
        sendReadChats(prevChat.conversationId)
      }
      flushChat()
      loadUserDetails(userId)
      loadChatHistory(userId, 0)
    }
  }
  return <Link
    className={classNames.bind(styles)(styles.ChatItem, {
      isRead: isRead && !selectedChat,
      selectedChat,
    })}
    to ={`/user/chat/${userId}`}
    onClick={() => handleClick(props)}
  >
    {userPick
      ? <div className={styles.circle} style={ { backgroundImage: `url(${userPick})` } }></div> 
      : <Logo className={styles.circle} user={userCredentials}/>}
    <div className={styles.container}>
      <h5>{name && name.length>30 ? `${name.substring(0,30)}...`: name}</h5>
      <p>{formatMessage(lastMessage, screen)}</p>
    </div>
    <div className={styles.date}>{formatDate(lastMessageDate)}</div>
  </Link>
}

export default ChatItem