import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import Mail from '../../../common/components/icon/Mail'

import * as loginAction from '../../../action/auth/LoginAction'

import styles from './JoinPage.module.css'

class JoinVerifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { intl } = this.context
    const { joinState: { credentials }, loginAction, screen } = this.props

    const { email } = credentials

    return (
      <div className={classNames.bind(styles)(styles.joinPage, styles.verify, {
        joinPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.join.form.title' })}/>
        <div className={styles.JoinScreenContainer}>
          <p className={styles.title}>{intl.formatMessage({ id: 'page.join.form.title' })}</p>
          <div className={styles.joinFormContainer}>
            <div className={classNames.bind(styles)(styles.verificationContainer, {
              verificationContainerMobile: isMobile(screen),
            })}>
              <h1>{intl.formatMessage({ id: 'page.join.mail.title' })}</h1>
              <h3>{intl.formatMessage({ id: 'page.join.mail.subTitle' })}</h3>
              <Mail/>
              <p className={styles.verificationDescription}>{intl.formatMessage({ id: 'page.join.mail.description' })}</p>
              <p>
                {intl.formatMessage({ id: 'page.join.mail.footer1' })}
              </p>
              <p>
                <a onClick={()=>loginAction.resendConfirmationEmail({ email })}>{intl.formatMessage({ id: 'page.join.mail.footer2' })}</a>
                &nbsp;
                {intl.formatMessage({ id: 'page.join.mail.footer3' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

JoinVerifyPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  joinState: state.auth.join,
  loginState: state.auth.login,
})

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(JoinVerifyPage)))