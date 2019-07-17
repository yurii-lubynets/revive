import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import classNames from 'classnames/bind'

import * as loginAction from '../../../action/auth/LoginAction'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import Logo from '../../../common/components/logo/Logo'
import Icon from '../../../common/components/icon/Icon'
import Button, { ButtonType } from '../../../common/components/button/Button'

import styles from './JoinPage.module.css'

const FB_LOGIN = process.env.REACT_APP_FB_LOGIN
const GOOGLE_LOGIN = process.env.REACT_APP_GOOGLE_LOGIN

class JoinPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { location, loginAction } = this.props
    if (location.prevPathname)
      loginAction.previousPage(location.prevPathname)
  }

  render() {
    const { intl } = this.context
    const { screen } = this.props

    return (
      <div className={classNames.bind(styles)(styles.joinPage, {
        joinPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.join.form.title' })}/>
        <div className={styles.JoinScreenContainer}>
          <p className={styles.title}>{intl.formatMessage({ id: 'page.join.form.title' })}</p>
          <div className={styles.joinFormContainer}>
            <Logo/>
            <h1 className={classNames.bind(styles)(styles.JoinScreenTitle, {
              JoinScreenTitleMobile: isMobile(screen),
            })}>{intl.formatMessage({ id: 'page.join.title' })}</h1>
            <Button 
              href={FB_LOGIN}
              icon={<Icon name="FacebookLogo"/>}
              type={ButtonType.SECONDARY}
              value={intl.formatMessage({ id: 'page.join.fb' })}
            />
            <Button
              href={GOOGLE_LOGIN}
              icon={<Icon name="GoogleLogo"/>}
              className={styles.button}
              type={ButtonType.SECONDARY}
              value={intl.formatMessage({ id: 'page.join.google' })}
            />
            <p className={styles.or}>{intl.formatMessage({ id: 'page.join.or' })}</p>
            <Button 
              value={intl.formatMessage({ id: 'page.join.email' })}
              path="/account/join-email-1"
            />
          </div>
          <p className={styles.joinFooter}>
            {intl.formatMessage({ id: 'page.join.form.footer' })}&nbsp;<Link to="/account/login">{intl.formatMessage({ id: 'page.join.form.footer.link1' })}</Link>
          </p>
        </div>
      </div>
    )
  }
}

JoinPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(JoinPage)))