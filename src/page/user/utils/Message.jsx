import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Logo from '../../../common/components/logo/Logo'

import { formatDate } from '../../../util/formatDate'

import styles from '../UserContainer.module.css'

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { message, user, chatId, details, innerRef } = this.props
    const { userPick: photo, userName, name } = details
    const userCredentials = { 
      firstName: userName && userName.substr(0, userName.indexOf(' ')).trim() || name && name.substr(0, name.indexOf(' ')).trim(),
      lastName: userName && userName.substr(userName.indexOf(' ')+1).trim() || name && name.substr(name.indexOf(' ')+1).trim(),
    }
    return(
      <div className={styles.message} ref={innerRef}>
        {chatId === message.to 
          ? user.logoImg 
            ? <div className={styles.circle} style={ { backgroundImage: `url(${user.logoImg})` } }></div>
            : <Logo className={styles.userLogo} user={user}/>
          : photo 
            ? <div className={styles.circle} style={ { backgroundImage: `url(${photo})` } }></div>
            : <Logo className={styles.userLogo} user={userCredentials}/>
        }
        <div className={classNames.bind(styles)(styles.container, {
          from: chatId !== message.to,
        })}>
          <p>{message.text}</p>
        </div>
        <div className={styles.date}>{formatDate(message.dataCreated)}</div>
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => <Message innerRef={ref} {...props} />)