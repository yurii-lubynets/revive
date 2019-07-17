import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'react-router-redux'

import * as serviceWorker from './serviceWorker'

import ReduxIntlProvider from './reduxIntlProvider'
import { initLocale } from './common/messages/util/LocaleUtil'

import configureStore from './store/configureStore'
import Routes from './routes'

import './index.css'

export const history = createBrowserHistory()

const store = configureStore()

initLocale()

render(
  <Provider store={store}>
    <ReduxIntlProvider>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ReduxIntlProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
