import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import rootSaga from './saga'

function configureStore (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  let composeEnhancers = compose
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  const middlewares = [sagaMiddleware]
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
