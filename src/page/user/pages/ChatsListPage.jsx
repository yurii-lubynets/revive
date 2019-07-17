import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'

import * as chatAction from '../../../action/user/ChatAction'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import NoMessages from '../utils/NoMessages'
import ChatItem from '../utils/ChatItem'

import styles from '../UserContainer.module.css'

class ChatListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { loginState: { isAuthenticated }, chatAction: { loadUserChats } } = this.props
    if (isAuthenticated) {
      loadUserChats()
    }
  }
  
  componentDidUpdate(prevProps) {
    const { loginState: { user, isAuthenticated }, chatAction: { loadUserChats }, chatsListState: { chats } } = this.props

    if (isAuthenticated && user && prevProps.chatsListState && prevProps.chatsListState.chats && prevProps.chatsListState.chats.length && prevProps.chatsListState.chats.length !== chats.length) {
      loadUserChats()
    }
  }

  componentWillUnmount() {
    const { chatAction: { flushChatsList } } = this.props
    flushChatsList()
  }

  render() {
    const { chatsListState: { chats, isLoading }, chatAction, screen, loginState: { user, isAuthenticated }, chatHistoryState: { conversationId }, routerState, match } = this.props
    
    if (!isAuthenticated) {
      return <Redirect to="/"/>
    }
    
    return (
      <Container className={classNames.bind(styles)(styles.containerX, {
        noMargin: routerState && routerState.pathname && routerState.pathname.includes('/chat/'),
      })}>
        {!chats.length && !isLoading && !routerState.pathname.includes('/chat/')
          ? <NoMessages/>
          : <div className={classNames.bind(styles)(styles.chatListContainer, {
            chatListContainerMobile: isMobile(screen),
          })}>
            {chats.map((item, index) => 
              <ChatItem
                chats={chats}
                selectedChat={conversationId === item.conversationId}
                key={index}
                user={item}
                screen={screen}
                chatAction={chatAction}
                match={match}
              />)}
          </div>}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  chatsListState: state.user.chatsList,
  loginState: state.auth.login,
  chatHistoryState: state.user.chatHistory,
  routerState: state.router.location,
})

const mapDispatchToProps = dispatch => ({
  chatAction: bindActionCreators(chatAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(ChatListPage)))