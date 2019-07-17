import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'
import Icon from '../../../common/components/icon/Icon'

import * as forgotAction from '../../../action/auth/ForgotAction'

import styles from '../UserContainer.module.css'

class SecurityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  changePassword = () => this.props.forgotAction.forgotPassword({
    email: this.props.loginState.user.email,
  })

  render() {
    const { intl } = this.context
    const { screen, forgotState: { forgot }, loginState: { user } } = this.props
    const { isSocialNetwork } = user

    return (
      <div className={classNames.bind(styles)(styles.ChangePasswordContainer, {
        ChangePasswordContainerMobile: isMobile(screen),
      })}>
        <h1>{intl.formatMessage({ id: 'page.security.title' })}</h1>
        <p className={styles.subTitle}>{intl.formatMessage({ id: 'page.join.form.email.placeholder' })}</p>
        <div className={styles.info}>{user.email}</div>
        <p className={styles.subTitle}>{intl.formatMessage({ id: 'page.security.password' })}</p>
        <div className={classNames.bind(styles)(styles.blockContainer, {
          blockContainerMobile: isMobile(screen),
          forgot,
        })}>
          {forgot ? (
            <Fragment>  
              <h3>{intl.formatMessage({ id: 'page.reset.mail.title' })}</h3>
              <p>{intl.formatMessage({ id: 'page.reset.mail.subTitle' })}</p>
            </Fragment>
          ) : (
            <a disabled={isSocialNetwork} onClick={this.changePassword}>{intl.formatMessage({ id: 'page.security.button' })}<Icon name="arrow-right"/></a>
          )}
        </div>
      </div>
    )
  }
}

SecurityPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  loginState: state.auth.login,
  forgotState: state.auth.forgot,
})

const mapDispatchToProps = dispatch => ({
  forgotAction: bindActionCreators(forgotAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(SecurityPage)))