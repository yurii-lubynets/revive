import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'

import * as headerAction from '../../action/HeaderAction'
import * as loginAction from '../../action/auth/LoginAction'
import * as chatAction from '../../action/user/ChatAction'

import Header from '../../common/components/header/Header'
import HeaderDesktop from './utils/HeaderDesktop'
import HeaderMobile from './utils/HeaderMobile'
import Footer from '../../common/components/footer/Footer'

import UserContainer from '../../page/user/UserContainer'
import ChatsListPage from '../../page/user/pages/ChatsListPage'
import ChatPage from '../../page/user/pages/ChatPage'

import HomePage from '../../page/search/home/HomePage'
import CountryPage from '../../page/search/country/CountryPage'
import VisaTypePage from '../../page/search/VisaType/VisaTypePage'
import SearchProvidersPage from '../../page/search/SearchProviders/SearchProvidersPage'
import ProviderPage from '../../page/search/provider/ProviderPage'

import AboutUsPage from '../../page/static/AboutUsPage'
import HowItWorksPage from '../../page/static/HowItWorksPage'
import DonationPage from '../../page/static/DonationPage'
import ToSPage from '../../page/static/ToSPage'
import PrivacyPage from '../../page/static/PrivacyPage'
import ContactUsPage from '../../page/static/ContactUsPage'

import { AUTH_DETAILS_NAME, AUTH_TOKEN } from '../../common/constant/LocalStorageConst'

import styles from './BaseContainer.module.css'


class BaseContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { loginState: { isAuthenticated, remembered }, chatAction: { loadNotificationId } } = this.props

    if (!remembered) {
      window.addEventListener('beforeunload',
        function() {
          localStorage.removeItem(AUTH_DETAILS_NAME)
          localStorage.removeItem(AUTH_TOKEN)
          return undefined
        }
      )
    }

    if (isAuthenticated) {
      loadNotificationId()
    }
  }

  componentWillUnmount() {
    this.props.chatAction.closeNotification()
  }

  render() { 
    const { intl } = this.context
    const { headerAction, headerState, loginAction, loginState, routerState } = this.props

    return (
      <div className={styles.baseContainer}>
        <Helmet title={intl.formatMessage({ id: 'page.home.title' })}/>
        <Header
          isOpen={headerState.visibleMenu || headerState.visibleInfo}
          desktopRight={<HeaderDesktop 
            loginAction={loginAction}
            loginState={loginState}
            location={routerState}
          />}
          mobileRight={<HeaderMobile
            loginAction={loginAction}
            loginState={loginState}
            headerAction={headerAction}
            headerState={headerState}
          />}
        />
        <Switch>
          <Route path={'/provider/:providerId'} component={ProviderPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/visa/:countryId'} component={VisaTypePage}/>
          <Route path={'/search'} component={SearchProvidersPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/countries'} component={CountryPage}/>

          <Route path="/user/chats" component={ChatsListPage}/>
          <Route path={'/user/chat/:chatId'} component={ChatPage}/>
          
          <Route path={'/user'} component={UserContainer}/>

          <Route onEnter={window.scrollTo({ top: 0 })} path={'/about'} component={AboutUsPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/how-it-works'} component={HowItWorksPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/donation'} component={DonationPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/contact-us'} component={ContactUsPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/tos'} component={ToSPage}/>
          <Route onEnter={window.scrollTo({ top: 0 })} path={'/privacy'} component={PrivacyPage}/>

          <Route onEnter={window.scrollTo({ top: 0 })} exact path={'/'} component={HomePage}/>
          
          <Redirect from={'/visa/'} to="/"/>
          <Redirect from={'/provider/'} to="/"/>
        </Switch>
        <Footer/>
      </div>
    )
  }
}

BaseContainer.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  headerState: state.header,
  loginState: state.auth.login,
  routerState: state.router.location,
  chatHistory: state.user.chatHistory,
  chatsList: state.user.chatsList,
})

const mapDispatchToProps = dispatch => ({
  headerAction: bindActionCreators(headerAction, dispatch),
  loginAction: bindActionCreators(loginAction, dispatch),
  chatAction: bindActionCreators(chatAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer))
