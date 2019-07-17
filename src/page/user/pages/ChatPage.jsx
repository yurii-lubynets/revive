import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'

import * as chatAction from '../../../action/user/ChatAction'
import * as loginAction from '../../../action/auth/LoginAction'

import Loading from '../../../common/components/loading/Loading'

import WithDelay from '../../../util/WithDelay'
import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import ChatsListPage from './ChatsListPage'
import Message from '../utils/Message'
import ChatForm from '../utils/ChatForm'

import styles from '../UserContainer.module.css'

class ChatPage extends Component {
  constructor(props) {
    super(props)
    this.messagesEnd = React.createRef()
    this.state = {
      showModal: false,
    }
  }
  
  componentDidMount() {
    const { match, chatAction: { loadChatHistory, loadUserDetails }, loginState: { isAuthenticated }, loginAction: { flushPreviousPage } } = this.props
    const chatId = match.params.chatId

    if (isAuthenticated) {
      flushPreviousPage()
      loadUserDetails(chatId)
      loadChatHistory(chatId, 0)
    }
  }

  componentDidUpdate() {
    const { chatHistoryState: { page, scroll } } = this.props

    if (page === 0 || scroll) {
      this.messagesEnd.current && this.messagesEnd.current.scrollIntoView()
    }

  }

  componentWillUnmount() {
    const { chatHistoryState: { conversationId }, chatAction: { sendReadChats, flushChat }, loginState: { isAuthenticated } } = this.props
    if (isAuthenticated) {
      sendReadChats(conversationId)
      flushChat()
    }
  }

  handleScroll = e => {
    const { match, chatAction: { loadChatHistory }, chatHistoryState: { page } } = this.props
    const chatId = match.params.chatId
    
    if (e.target.scrollTop === 0) {
      loadChatHistory(chatId, page)
    }
  }

  handleMouseOver = () => {
    const { chatAction: { loadUserVisas }, userDetailsState: { details } } = this.props
    this.setState({ showModal : true })
    loadUserVisas(details && details.userTypeIdValue)
  }

  render() {
    const { intl } = this.context
    const { showModal } = this.state
    const { chatHistoryState: { messages, userId }, userVisaResultsState: { visas, visasLoading, visasError }, chatAction: { sendMessage },  match: { params }, screen, userDetailsState: { details }, loginState: { user } } = this.props
    const { firstName, lastName } = user
    const chatId = params && params.chatId

    if (chatId === user.userId) {
      return <Redirect to="/"/>
    }

    return (
      <Container className={styles.containerX}>
        {!isMobile(screen) && <ChatsListPage/>}
        <div className={classNames.bind(styles)(styles.chatContainer, {
          chatContainerMobile: isMobile(screen),
        })}>
          {showModal && <div className={styles.results}>
            {visasLoading
              ? <WithDelay waitBeforeShow={0}><Loading/></WithDelay>
              : <Fragment>
                {visasError
                  ? <h5>No results</h5>
                  : <Fragment>
                    {user && user.userType === 'revivegrant'
                      ? <Fragment>
                        <h5>{intl.formatMessage({ id: 'page.chat.reminder' })}</h5>
                        <p>{intl.formatMessage({ id: 'page.chat.reminder2' })}</p>
                      </Fragment>
                      : <h4>{details && details.userName} {intl.formatMessage({ id: 'page.chat.reminder3' })}</h4>
                    }
                  </Fragment>}
              </Fragment>}
            <div className={classNames.bind(styles)(styles.resultsVisas, {
              provider: user && user.userType !== 'revivegrant',
            })}>{visas && visas.length > 0 && visas.map(visa => visa.visaName).join(', ')}</div>
          </div>}
          <div>
            <p className={styles.talk}>
              <span>
                {intl.formatMessage({ id: 'page.chat.subTitle' })}
                {details && details.userTypeIdValue &&  user.userType === 'revivegrant'
                  ? <Link to={`/provider/${details && details.userTypeIdValue}`}>{details && details.userName}</Link>
                  : <Fragment>{details && details.userName}</Fragment>
                }
              </span>
              <a
                className={styles.tooltip}
                onClick={this.handleMouseOver}
                onMouseOver={this.handleMouseOver}
                onMouseOut={()=>this.setState({ showModal : false })}>test</a>
            </p>
            <div className={styles.messagesContainer} onScroll={this.handleScroll}>
              {messages && messages.map((message, index) => 
                <Message
                  key={index}
                  user={user}
                  message={message}
                  chatId={chatId}
                  details={details}
                  ref={this.messagesEnd}
                />)}
            </div>
          </div>
          <ChatForm
            providerName={details && details.userName}
            userName={`${firstName} ${lastName}`}
            screen={screen}
            chatUser={userId}
            sendMessage={sendMessage}
            userId={user.userId}
          />
        </div>
      </Container>
    )
  }
}

ChatPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  chatHistoryState: state.user.chatHistory,
  chatsListState: state.user.chatsList,
  userDetailsState: state.user.userDetails,
  loginState: state.auth.login,
})

const mapDispatchToProps = dispatch => ({
  chatAction: bindActionCreators(chatAction, dispatch),
  loginAction: bindActionCreators(loginAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(ChatPage)))