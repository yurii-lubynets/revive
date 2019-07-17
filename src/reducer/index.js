import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { localeReducer } from './locale/locale'

import { header } from './header'

import { content as contentSearch } from './search/content'
import { visas as visasSearch } from './search/visa'
import { searchProvider as searchProviders } from './search/searchProvider'
import { provider } from './search/provider'
import { services } from './search/services'

import { join } from './auth/join'
import { joinSP } from './auth/joinSP'
import { login } from './auth/login'
import { loginSN } from './auth/loginSN'
import { forgot } from './auth/forgot'

import { user } from './user/user'
import { providerInfo } from './user/provider'
import { data } from './user/data'
import { education } from './user/education'
import { awards } from './user/awards'
import { licenses } from './user/licenses'
import { links } from './user/links'
import { contactUs } from './user/contactUs'

import { chatsList } from './chat/chatsList'
import { chatHistory } from './chat/chatHistory'
import { userDetails } from './chat/userDetails'

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  locale: localeReducer,

  header,

  search: combineReducers({
    content: contentSearch,
    visas: visasSearch,
    searchProviders,
    provider,
    services,
  }),

  auth: combineReducers({
    join,
    joinSP,
    login,
    forgot,
    loginSN,
  }),

  user: combineReducers({
    user,
    links,
    data,
    education,
    awards,
    licenses,
    providerInfo,
    contactUs,
    chatsList,
    chatHistory,
    userDetails,
  }),
})

export default appReducer
