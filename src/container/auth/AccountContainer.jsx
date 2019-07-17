import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import * as loginAction from '../../action/auth/LoginAction'

import Header from '../../common/components/header/Header'

import JoinPage from '../../page/auth/join/JoinPage'
import JoinEmailPage from '../../page/auth/join/JoinEmailPage'
import JoinRegistrationPage from '../../page/auth/join/JoinRegistrationPage'
import JoinVerifyPage from '../../page/auth/join/JoinVerifyPage'

import LoginPage from '../../page/auth/login/LoginPage'
import LoginEmailPage from '../../page/auth/login/LoginEmailPage'
import LoginResendEmailPage from '../../page/auth/login/LoginResendEmailPage'

import ForgotPage from '../../page/auth/forgot/ForgotPage'
import ForgotResendPage from '../../page/auth/forgot/ForgotResendPage'


import styles from './AccountContainer.module.css'

const AccountContainer = ({ loginState, match }) => loginState.isAuthenticated
  ? <Redirect exact to={`${loginState.prevPath}`}/>
  : <div className={styles.accountContainer}>
    <Header/>
    <Switch>
      <Route exact path={`${match.url}/join`} component={JoinPage}/>
      <Route exact path={`${match.url}/join-email-1`} component={JoinEmailPage}/>
      <Route exact path={`${match.url}/join-email-2`} component={JoinRegistrationPage}/>
      <Route exact path={`${match.url}/join-verify-email`} component={JoinVerifyPage}/>

      <Route exact path={`${match.url}/login`} component={LoginPage}/>
      <Route exact path={`${match.url}/login-email`} component={LoginEmailPage}/>
      <Route exact path={`${match.url}/login-resend-email`} component={LoginResendEmailPage}/>

      <Route exact path={`${match.url}/forgot`} component={ForgotPage}/>
      <Route exact path={`${match.url}/forgot-resend-email`} component={ForgotResendPage}/>
    </Switch>
  </div>


const mapStateToProps = state => ({
  loginState: state.auth.login,
})

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
})

AccountContainer.propTypes = {
  match: PropTypes.object.isRequired,
  loginState: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountContainer))
