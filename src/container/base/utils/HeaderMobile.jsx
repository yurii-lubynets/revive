import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import MenuIcon from '../../../common/components/icon/MenuIcon'
import Close from '../../../common/components/icon/Close'
import Icon from '../../../common/components/icon/Icon'

import styles from './HeaderStyles.module.css'

class HeaderMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillUnmount() {
    this.props.headerAction.hideMenu()
  }

  render() {
    const { intl } = this.context
    const { loginAction: { logoutUser }, loginState: { isAuthenticated, user }, headerAction } = this.props
    const { showMenu, hideMenu } = headerAction

    const Links = [
      {
        name: `${intl.formatMessage({ id: 'page.home.home' })}`,
        path: '/',
      },
      {
        separator: '',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.becomeSP' })}`,
        path: '/account/join-sp',
      },
      {
        separator: '',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.contactUs' })}`,
        path: '/contact-us',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.join' })}`,
        path: '/account/join',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.login' })}`,
        path: '/account/login',
      },
    ]

    const loggedLinks = [
      {
        name: `${intl.formatMessage({ id: 'page.home.home' })}`,
        path: '/',
      },
      {
        separator: '',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.info' })}`,
        path: '/user/info',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.security' })}`,
        path: '/user/security',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.chats' })}`,
        path: '/user/chats',
      },
    ]

    return (
      <Fragment>
        {isAuthenticated && <Link className={styles.mailLink} to="/user/chats"><span><Icon name="envelope"/></span></Link>}
        <button onClick={showMenu}><MenuIcon/></button>
        <ul className={classNames.bind(styles)(styles.baseHeaderMobileMenu)}>
          <button className={styles.close} onClick={hideMenu}><Close/></button>
          {!isAuthenticated 
            ? <Fragment>
              {Links.map((item, index) => item.name
                ? <li key={index}><Link onClick={hideMenu} to={item.path}>{item.name}</Link></li>
                : <div key={index} className={styles.separator}></div>)}
            </Fragment>
            : <Fragment>
              {loggedLinks.map((item, index) => item.name
                ? <li key={index}><Link onClick={hideMenu} to={item.path}>{item.name} {item.count && <span>{item.count}</span>}</Link></li>
                : <div key={index} className={styles.separator}></div>)}
              <div className={styles.separator}></div>
              <div className={styles.separator}></div>
              <li><Link onClick={hideMenu} to="/contact-us">{intl.formatMessage({ id: 'page.home.contactUs' })}</Link></li>
              <li><div onClick={() => {logoutUser(); hideMenu()}}>{intl.formatMessage({ id: 'page.home.logout' })}</div></li>
            </Fragment>
          }
        </ul>
      </Fragment>
    )
  }
}
HeaderMobile.contextTypes = {
  intl: PropTypes.object.isRequired,
}

export default HeaderMobile