import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'

import * as loginAction from '../../../action/auth/LoginAction'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import Mail from '../../../common/components/icon/Mail'

import styles from './LoginPage.module.css'

class LoginResendEmailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    const { loginAction, loginState } = this.props
    const { email } = loginState.user
    if (loginState.user)
      loginAction.resendConfirmationEmail({ email })
  }

  componentWillUnmount() {
    this.props.loginAction.flushState()
  }

  render() {
    const { intl } = this.context
    const { loginState: { user }, loginAction: { resendConfirmationEmail }, screen } = this.props

    const { email } = user

    return (
      <div className={classNames.bind(styles)(styles.loginPage, styles.resend, {
        loginPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.login.title' })}/>
        <div className={styles.loginPageContent}>
          <p className={styles.title}>{intl.formatMessage({ id: 'page.resend.form.title' })}</p>
          <div className={classNames.bind(styles)(styles.verificationContainer, {
            verificationContainerMobile: isMobile(screen),
          })}>
            <h1>{intl.formatMessage({ id: 'page.verified.mail.title' })}</h1>
            <h3>{intl.formatMessage({ id: 'page.verified.mail.subTitle' })}</h3>
            <Mail/>
            <p className={styles.verificationDescription}>{intl.formatMessage({ id: 'page.verified.mail.description' })}</p>
            <p>{intl.formatMessage({ id: 'page.join.mail.footer1' })}</p>
            <p>
              <a onClick={()=>resendConfirmationEmail({ email })}>{intl.formatMessage({ id: 'page.join.mail.footer2' })}</a>
              &nbsp;
              {intl.formatMessage({ id: 'page.join.mail.footer3' })}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

LoginResendEmailPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  loginState: state.auth.login,
})

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(LoginResendEmailPage)))