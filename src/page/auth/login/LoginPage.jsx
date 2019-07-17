import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import queryString from 'query-string'

import * as loginAction from '../../../action/auth/LoginAction'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'
import WithDelay from '../../../util/WithDelay'

import Loading from '../../../common/components/loading/Loading'
import Logo from '../../../common/components/logo/Logo'
import Icon from '../../../common/components/icon/Icon'
import Modal from '../../../common/components/modal/Modal'
import Button, { ButtonType } from '../../../common/components/button/Button'

import styles from './LoginPage.module.css'

const FB_LOGIN = process.env.REACT_APP_FB_LOGIN
const GOOGLE_LOGIN = process.env.REACT_APP_GOOGLE_LOGIN

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { location, loginAction } = this.props
    const values = queryString.parse(location.search)
    
    if (values.code)
      loginAction.loginUserSN(values.code)
    if (location.prevPathname)
      loginAction.previousPage(location.prevPathname)
  }

  componentWillUnmount() {
    this.props.loginAction.flushState()
  }

  defineLabel = () => {
    const { intl } = this.context
    const { error406, error409, description } = this.props.loginSNState
    if (error406) {
      return intl.formatMessage({ id: 'page.login.fb406' })
    }
    if (error409) {
      switch (description) {
        case 'auth0':
          return intl.formatMessage({ id: 'page.login.fb409' }) + 'revive Account.'
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
    const { loginSNState: { error406, error409, isLoading }, loginAction: { flushSNState }, screen } = this.props

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
          <Fragment>
            <div className={styles.loginPageContent}>
              <p className={styles.title}>{intl.formatMessage({ id: 'page.login.title' })}</p>
              <div className={styles.LoginScreenContainer}>
                <Logo/>
                <h1 className={classNames.bind(styles)(styles.LoginScreenTitle, {
                  LoginScreenTitleMobile: isMobile(screen),
                })}>{intl.formatMessage({ id: 'page.login.form.title' })}</h1>
                <Button 
                  href={`${FB_LOGIN}`}
                  icon={<Icon name="FacebookLogo"/>}
                  type={ButtonType.SECONDARY}
                  value={intl.formatMessage({ id: 'page.login.fb' })}
                />
                <Button
                  href={`${GOOGLE_LOGIN}`}
                  icon={<Icon name="GoogleLogo"/>}
                  className={styles.button}
                  type={ButtonType.SECONDARY}
                  value={intl.formatMessage({ id: 'page.login.google' })}
                />
                <p>{intl.formatMessage({ id: 'page.login.or' })}</p>
                <Button 
                  path="/account/login-email"
                  value={intl.formatMessage({ id: 'page.login.email' })}
                />
              </div>
              <p className={styles.footer}>
                {intl.formatMessage({ id: 'page.login.footer1' })}&nbsp;<Link to="/account/join">{intl.formatMessage({ id: 'page.login.footer2' })}</Link>
              </p>
            </div>
            <Modal
              show={error406 || error409}
              handleClose={flushSNState}
              label={this.defineLabel()}
            >
              <p className={styles.modalFooter}>
                {error406 && intl.formatMessage({ id: 'page.login.fb.revive1' })}
                {error409 && intl.formatMessage({ id: 'page.login.fb.revive2' })}
              </p>
              <Button
                type={ButtonType.PRIMARY}
                value={intl.formatMessage({ id: 'page.login.fb.ok' })}
                handleClick={flushSNState}
                className={styles.modalButton}
              />
            </Modal>
          </Fragment>
        )}
      </div>
    )
  }
}

LoginPage.contextTypes = {
  intl: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  loginSNState: state.auth.loginSN,
})

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(LoginPage)))