import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'

import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducer'
import rootSaga from '../saga'

import * as loginAction from '../action/auth/LoginAction'

const history = createBrowserHistory()

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    ),
  )

  sagaMiddleware.run(rootSaga)

  const { dispatch } = store

  axios.interceptors.response.use(response => {
    return response
  },
  function (error) {
    if (error && error.toString() && error.toString().includes('401')) {
      dispatch(loginAction.logoutUser())
    }
    return Promise.reject(error)
  })

  return store
}

export default configureStore