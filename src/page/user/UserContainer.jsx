import React from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { Container } from 'react-grid-system'
import { FormattedMessage } from 'react-intl'

import { isMobile } from '../../util/responsive'
import ScreenClassRender from '../../util/ScreenClassRender'
import Icon from '../../common/components/icon/Icon'

import InfoPage from './pages/InfoPage'
import SettingsPage from './pages/SettingsPage'
import RegistrationPage from './pages/RegistrationPage'

import styles from './UserContainer.module.css'

const navigationLinks = [
  {
    path: '/user/registration',
    name:  'account',
    title: 'page.registration.link',
  },
  {
    path: '/user/info',
    name:  'account',
    title: 'page.account.link',
  },
  {
    path: '/user/security',
    name:  'security',
    title: 'page.security.link',
  },
]

const UserContainer = ({ screen, routerState, loginState: { user, isAuthenticated }, match }) => !isAuthenticated 
  ? <Redirect exact to="/"/>
  : <div className={classNames.bind(styles)(styles.userContainer, {
    userContainerMobile: isMobile(screen),
  })}>
    <div className={styles.navigation}>
      {navigationLinks.map((item, index) =>
        <Link
          key={index}
          to={item.path}
          className={classNames.bind(styles)(styles.link, { 
            selected: routerState && routerState.pathname && routerState.pathname.includes(item.path),
          })}>
          <Icon name={item.name}/><FormattedMessage id={item.title}/>
        </Link>
      )}
    </div>
    <div className={styles.content}>
      <Container className={styles.pageContainer}>
        <Switch>
          <Route exact path={`${match.url}/info`} component={InfoPage}/>
          <Route exact path={`${match.url}/security`} component={SettingsPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} exact path={`${match.url}/registration`} component={RegistrationPage}/>
        </Switch>
      </Container>
    </div>
  </div>

const mapStateToProps = state => ({
  routerState: state.router.location,
  loginState: state.auth.login,
})

export default withRouter(connect(mapStateToProps)(ScreenClassRender(UserContainer)))