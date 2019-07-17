import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { reduxForm, Field } from 'redux-form'

import * as loginAction from '../../../action/auth/LoginAction'

import { isMobile } from '../../../util/responsive'
import { testEmail } from '../../../common/constant/RegxPatternConst'
import ScreenClassRender from '../../../util/ScreenClassRender'
import WithDelay from '../../../util/WithDelay'

import Modal from '../../../common/components/modal/Modal'
import Loading from '../../../common/components/loading/Loading'
import Button, { ButtonType } from '../../../common/components/button/Button'
import TextBox, { TextBoxType } from '../../../common/components/textbox/TextBox'
import CheckBox from '../../../common/components/checkbox/Checkbox'

import styles from './LoginPage.module.css'

class LoginPageSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  componentWillUnmount() {
    this.props.loginAction.flushState()
  }

  validateEmail = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.login.form.email.error' })
    } else if (testEmail(value)) {
      return intl.formatMessage({ id: 'page.join.form.email.error.message1' })
    } else {
      return undefined
    }
  }

  validatePassword = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.login.form.password.error' })
    } else {
      return undefined
    }
  }
  
  handleLogin = ({ values }) => this.props.loginAction.loginUser({ ...values })

  defineLabel = () => {
    const { intl } = this.context
    const { error409, description } = this.props.loginState
    if (error409) {
      switch (description) {
        case 'google-oauth2':
          return intl.formatMessage({ id: 'page.login.fb409' }) + 'Google Account.'
        case 'facebook':
          return intl.formatMessage({ id: 'page.login.fb409' }) + 'Facebook Account.'
        default:
          return ''
      }
    }
  }

  render() {
    const { intl } = this.context
    const { loginState: { error409, error403, isLoading, failed }, loginForm, handleSubmit, loginAction, screen } = this.props

    return (
      <div className={classNames.bind(styles)(styles.loginPage, {
        loginPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.login.title' })}/>
        {isLoading ? (
          <WithDelay waitBeforeShow={2000}>
            <Loading/>
          </WithDelay>
        ) : (
          <div className={styles.loginPageContent}>
            <p className={styles.title}>{intl.formatMessage({ id: 'page.login.title' })}</p>
            <form onSubmit={handleSubmit(()=>this.handleLogin(loginForm))} autoComplete="off" className={classNames.bind(styles)(styles.loginForm, {
              loginFormMobile: isMobile(screen),
            })}>
              <div className={styles.formItems}>
                <TextBox
                  type={TextBoxType.TEXT}
                  name="email"
                  validate={(this.validateEmail)}
                  label={intl.formatMessage({ id: 'page.login.form.email.placeholder' })}
                />
                <TextBox
                  type={TextBoxType.PASSWORD}
                  name="password"
                  validate={this.validatePassword}
                  label={intl.formatMessage({ id: 'page.login.form.password.placeholder' })}
                />
              </div>
              <div className={styles.checkBoxContainer}>
                <Field 
                  name="rememberUser"
                  component={CheckBox}
                  label={<div className={styles.checkBoxLabel}>{intl.formatMessage({ id: 'page.login.form.remember' })}</div>}
                />
              </div>
              <div className={styles.errorContainer}>
                {failed && <div className={styles.loginError}>{intl.formatMessage({ id: 'page.login.form.failed' })}</div>}
              </div>
              <div className={styles.errorContainer}>
                {error403 && <div className={styles.loginError}>{intl.formatMessage({ id: 'page.login.form.error403' })}</div>}
              </div>
              <Button
                className={styles.submitButton}
                type={ButtonType.PRIMARY}
                submit
                value={intl.formatMessage({ id: 'page.login.form.button.submit' })}
              />
              <p className={styles.loginFooter}>
                <Link to="/account/forgot">{intl.formatMessage({ id: 'page.login.form.footer.link1' })}</Link>
              </p>
            </form>
            <p className={styles.footer}>
              {intl.formatMessage({ id: 'page.login.footer1' })}
              &nbsp;
              <Link to="/account/join">{intl.formatMessage({ id: 'page.login.footer2' })}</Link>
            </p>
            <Modal
              show={error409}
              handleClose={loginAction.flushState}
              label={this.defineLabel()}
            >
              <p className={styles.modalFooter}>{intl.formatMessage({ id: 'page.login.fb.revive2' })}</p>
              <Button
                type={ButtonType.PRIMARY}
                value={intl.formatMessage({ id: 'page.login.fb.ok' })}
                handleClick={loginAction.flushState}
                className={styles.modalButton}
              />
            </Modal>
          </div>
        )}
      </div>
    )
  }
}

LoginPageSection.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  loginForm: state.form.loginForm,
  loginState: state.auth.login,
})

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
})

const LoginEmailPage = reduxForm({ form: 'loginForm', initialValues: { rememberUser: true } })(LoginPageSection)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(LoginEmailPage)))