import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'
import Button, { ButtonType } from '../../../common/components/button/Button'
import Mail from '../../../common/components/icon/Mail'

import * as forgotAction from '../../../action/auth/ForgotAction'

import styles from './ForgotPage.module.css'

class ForgotResendPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  handleForgot = ({ values }) => this.props.forgotAction.forgotPassword(values)  

  render() {
    const { intl } = this.context
    const { forgotState: { email }, forgotAction: { resendForgotPassword }, screen } = this.props

    return (
      <div className={classNames.bind(styles)(styles.forgotPage, styles.forgot, {
        forgotPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.forgot.title' })}/>
        <p>{intl.formatMessage({ id: 'page.forgot.title' })}</p>
        <div className={classNames.bind(styles)(styles.forgotContainer, {
          forgotContainerMobile: isMobile(screen),
        })}>
          <h1>{intl.formatMessage({ id: 'page.reset.mail.title' })}</h1>
          <h3>{intl.formatMessage({ id: 'page.reset.mail.subTitle' })}</h3>
          <Mail/>
          <Button 
            value={intl.formatMessage({ id: 'page.reset.mail.button' })}
            path="/account/login"
            type={ButtonType.PRIMARY}
            className={styles.Button}
          />
          <p>
            {intl.formatMessage({ id: 'page.reset.mail.footer1' })}
          </p>
          <p>
            <a onClick={()=>resendForgotPassword(email)}>{intl.formatMessage({ id: 'page.join.mail.footer2' })}</a>
          &nbsp;
            {intl.formatMessage({ id: 'page.join.mail.footer3' })}
          </p>
        </div>
      </div>
    )
  }
}

ForgotResendPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  forgotState: state.auth.forgot,
})

const mapDispatchToProps = dispatch => ({
  forgotAction: bindActionCreators(forgotAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(ForgotResendPage)))